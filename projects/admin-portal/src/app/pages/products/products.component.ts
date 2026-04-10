import { Component, inject, signal, OnInit, ViewChild, TemplateRef, ElementRef } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductReadableRepository } from '@infrastructure/base';
import { CreateProductCommandHandler } from '@application/commands';
import { CreateProductRequest } from '@application/messages';
import { CurrencyPipe, SlicePipe, UpperCasePipe } from '@angular/common';

import { ZardInputDirective } from '@/shared/components/input';
import { ZardSheetService } from '@/shared/components/sheet/sheet.service';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    CurrencyPipe,
    SlicePipe,
    UpperCasePipe,
    ZardInputDirective
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  private readableRepo = inject(ProductReadableRepository);
  private createHandler = inject(CreateProductCommandHandler);
  private sheetService = inject(ZardSheetService);

  @ViewChild('drawerTemplate') drawerTemplate!: TemplateRef<any>;
  @ViewChild('fileInputForm') fileInputForm!: ElementRef<HTMLInputElement>;
  private sheetRef: any;

  products = signal<any[]>([]);
  isLoading = signal(false);
  isSubmitting = signal(false);
  isUploading = signal(false);
  uploadedMedia = signal<{type: string, url: string, public_id?: string}[]>([]);
  isSaved = false;

  productForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    short_description: new FormControl(''),
    description: new FormControl(''),
    price: new FormControl('', [Validators.required, Validators.min(0)]),
    compare_at_price: new FormControl('', [Validators.min(0)]),
    currency: new FormControl('VND', [Validators.required]),
    sku: new FormControl('', [Validators.required]),
    gtin: new FormControl(''),
    status: new FormControl('active'),
    condition: new FormControl('new'),
    categoryId: new FormControl(''),
    stock_quantity: new FormControl('10', [Validators.min(0)]),
    stock_track: new FormControl(true),
    share_facebook: new FormControl(false)
  });

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.isLoading.set(true);
    this.readableRepo.listProducts({ page: 1, limit: 50 }).subscribe({
      next: (res) => {
        this.products.set(res.items || []);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Failed to load products', err);
        toast.error('Lỗi', { description: 'Failed to load products' });
        this.isLoading.set(false);
      }
    });
  }

  openDrawer() {
    this.productForm.reset({
      currency: 'VND',
      status: 'active',
      condition: 'new',
      stock_quantity: '10',
      stock_track: true,
      share_facebook: false
    });
    this.isSaved = false;
    this.uploadedMedia.set([]);
    this.sheetRef = this.sheetService.create({
      zContent: this.drawerTemplate,
      zSide: 'right',
      zTitle: 'Thêm Sản Phẩm Mới',
      zDescription: 'Nhập thông tin sản phẩm đầy đủ',
      zHideFooter: true,
      zWidth: '550px',
      zCustomClasses: 'h-full'
    });
  }

  closeDrawer() {
    if (!this.isSaved && this.uploadedMedia().length > 0) {
      this.cleanupTempMedia();
    }
    if (this.sheetRef) {
      this.sheetRef.close();
    }
  }

  async cleanupTempMedia() {
    const media = this.uploadedMedia();
    for (const m of media) {
      if (m.public_id) {
        try {
          await fetch(`/api/upload?public_id=${encodeURIComponent(m.public_id)}`, { method: 'DELETE' });
        } catch (e) {
          console.error('Failed to cleanup temp media', e);
        }
      }
    }
    this.uploadedMedia.set([]);
  }

  // --- Drag and Drop File Handlers ---
  triggerFileInput() {
    this.fileInputForm.nativeElement.click();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.uploadFile(input.files[0]);
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
      this.uploadFile(event.dataTransfer.files[0]);
    }
  }

  async uploadFile(file: File) {
    this.isUploading.set(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', 'temp');

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      if (data.success) {
        this.uploadedMedia.update(media => [
          ...media, 
          { type: 'image', url: data.data.secure_url, public_id: data.data.public_id }
        ]);
        toast.success('Đã tải ảnh lên');
      } else {
        toast.error('Lỗi Server', { description: data.message });
      }
    } catch (e) {
      console.error(e);
      toast.error('Lỗi mạng', { description: 'Không thể kết nối đến server tải ảnh' });
    } finally {
      this.isUploading.set(false);
    }
  }

  async removeMedia(index: number) {
    const mediaList = this.uploadedMedia();
    const target = mediaList[index];
    if (target && target.public_id) {
      try {
        await fetch(`/api/upload?public_id=${encodeURIComponent(target.public_id)}`, { method: 'DELETE' });
      } catch (e) {
        console.error('Delete failed:', e);
      }
    }
    this.uploadedMedia.update(m => m.filter((_, i) => i !== index));
  }

  // --- Submission ---
  onSubmit() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      toast.error('Vui lòng kiểm tra lại', { description: 'Một số trường bắt buộc chưa hợp lệ' });
      return;
    }

    this.isSubmitting.set(true);
    const formVal = this.productForm.value;
    
    const req = new CreateProductRequest();
    req.name = formVal.name!;
    req.description = formVal.description || '';
    req.short_description = formVal.short_description || '';
    
    req.media = this.uploadedMedia();
    req.categories = formVal.categoryId ? [formVal.categoryId] : [];
    req.gtin = formVal.gtin || undefined;
    req.price = Number(formVal.price);
    req.compare_at_price = formVal.compare_at_price ? Number(formVal.compare_at_price) : undefined;
    req.currency = formVal.currency!;
    
    req.stock = {
      quantity: Number(formVal.stock_quantity),
      track_inventory: formVal.stock_track || false
    };
    
    // We omitted tracking arrays of bulk_pricing and shipping to keep the form simple for now
    
    req.condition = formVal.condition || 'new';
    
    req.social = {
      share_facebook: formVal.share_facebook || false
    };
    
    req.sku = formVal.sku!;
    req.status = formVal.status!;

    this.createHandler.handle(req).subscribe({
      next: (response) => {
        this.isSubmitting.set(false);
        if (response && response.product) {
          toast.success('Thành công', { description: 'Đã lưu sản phẩm vào hệ thống.' });
          this.isSaved = true;
          this.closeDrawer();
          this.loadProducts();
        } else {
          toast.error('Lỗi Database', { description: 'Không thể thêm sản phẩm, vui lòng thử lại.' });
        }
      },
      error: (err) => {
        this.isSubmitting.set(false);
        toast.error('Lỗi', { description: 'Có lỗi xảy ra: ' + err });
      }
    });
  }
}
