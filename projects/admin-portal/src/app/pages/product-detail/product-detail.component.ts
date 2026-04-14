import { Component, inject, computed, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { toast } from 'ngx-sonner';
import { ZardSelectComponent } from '@/shared/components/select/select.component';
import { QuillModule } from 'ngx-quill';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, ZardSelectComponent, QuillModule, NgApexchartsModule],
  templateUrl: './product-detail.component.html'
})
export class ProductDetailComponent implements OnInit {
  private _fb = inject(FormBuilder);
  private _http = inject(HttpClient);
  private _router = inject(Router);
  private _route = inject(ActivatedRoute);

  public isEditMode = signal(false);
  public isLoading = signal(false);
  public isUploading = signal(false);
  public isSubmitting = signal(false);
  
  public categories = signal<any[]>([]);
  public uploadedMedia = signal<any[]>([]);
  public stats = signal<any>(null);
  public logs = signal<any[]>([]);
  public productSlug = signal<string | null>(null);

  public productForm: FormGroup = this._fb.group({
    name: ['', Validators.required],
    sku: ['', Validators.required],
    categoryId: [''],
    stockQuantity: [0, [Validators.required, Validators.min(0)]],
    status: ['draft'],
    condition: ['new'],
    description: [''],
    currency: ['USD'],
    price: [0, [Validators.required, Validators.min(0)]],
    slug: [''],
    shipping: this._fb.group({
      dimensions: [''],
      weight: [null]
    })
  });

  public productId = signal<string | null>(null);

  public selectedIndex = signal(0);

  public performanceChartOptions: any = {
    series: [{ name: 'Doanh thu', data: [12000, 15000, 14000, 18000, 22000, 26000, 30000] }],
    chart: { type: 'area', height: 60, sparkline: { enabled: true } },
    stroke: { curve: 'smooth', width: 3 },
    fill: { opacity: 0.15, type: 'solid' },
    colors: ['#0f172a'],
    tooltip: {
      fixed: { enabled: false },
      x: { show: false },
      y: { title: { formatter: function () { return ''; } } },
      marker: { show: false }
    }
  };

  // Computed properties for UI binding
  public mainMedia = computed(() => {
    const media = this.uploadedMedia();
    const index = this.selectedIndex();
    return media.length > 0 && index < media.length ? media[index] : null;
  });

  public mainMediaUrl = computed(() => this.mainMedia()?.url);

  public emptySlots = computed(() => {
    const len = this.uploadedMedia().length;
    const count = Math.max(1, 4 - len); // Always ensure at least 1 slot is available
    return Array(count).fill(0);
  });

  // Select Options
  public categoryOptions = computed(() => {
    return this.categories().map(c => ({ label: c.name, value: c.id }));
  });

  public statusOptions = [
    { label: 'Bản Nháp (Draft)', value: 'draft' },
    { label: 'Đang Đăng (Active)', value: 'active' },
    { label: 'Lưu Trữ (Archived)', value: 'archived' }
  ];

  public conditionOptions = [
    { label: 'Mới Nhất (New)', value: 'new' },
    { label: 'Qua Sử Dụng (Used)', value: 'used' },
    { label: 'Tân Trang (Refurbished)', value: 'refurbished' }
  ];

  public currencyOptions = [
    { label: 'USD', value: 'USD' },
    { label: 'VND', value: 'VND' }
  ];

  public quillModules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'header': [1, 2, 3, false] }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['link', 'image', 'video'],
      ['clean']
    ]
  };

  ngOnInit() {
    this.loadCategories();
    this._route.params.subscribe(async params => {
      if (params['id'] && params['id'] !== 'new') {
        this.isEditMode.set(true);
        this.productId.set(params['id']);
        this.isLoading.set(true);
        await Promise.all([
          this.loadProduct(params['id']),
          this.loadStats(params['id']),
          this.loadLogs(params['id'])
        ]);
        this.isLoading.set(false);
      }
    });

    // Auto-generate slug from name
    this.productForm.get('name')?.valueChanges.subscribe(name => {
      const slugControl = this.productForm.get('slug');
      // Only auto-fill if the slug is currently empty or matches a slugified version of a previous name
      if (!slugControl?.value || slugControl.pristine) {
        slugControl?.setValue(this.slugify(name), { emitEvent: false });
      }
    });
  }

  async loadCategories() {
    try {
      const res: any = await firstValueFrom(this._http.post('/api/categories/search', { pageIndex: -1, pageSize: 100 }));
      const payload = res?.data ?? res;
      this.categories.set(Array.isArray(payload?.data) ? payload.data : []);
    } catch (e) {
      console.error('Failed to load categories', e);
    }
  }

  async loadProduct(id: string) {
    try {
      const res: any = await firstValueFrom(this._http.get(`/api/products/${id}`));
      const p = res?.data || res;
      
      if (p) {
        let catId = '';
        if (p.categories && p.categories.length > 0) {
          catId = p.categories[0].id || '';
        } else if (p.categoryId) {
          catId = p.categoryId;
        }

        this.productForm.patchValue({
          name: p.name,
          sku: p.sku,
          categoryId: catId,
          stockQuantity: p.stock?.quantity ?? p.stockQuantity ?? 0,
          status: p.status ?? 'draft',
          condition: p.condition ?? 'new',
          description: p.description ?? '',
          currency: p.currency ?? 'USD',
          price: p.price ?? 0,
          shipping: {
            dimensions: p.shipping?.dimensions ?? '',
            weight: p.shipping?.weight ?? null
          },
          slug: p.slug ?? ''
        });

        if (p.media && Array.isArray(p.media)) {
          this.uploadedMedia.set(p.media);
        }
        if (p.slug) {
          this.productSlug.set(p.slug);
        }
      }
    } catch (e) {
      toast.error('Load Error', { description: 'Could not load product details.' });
    }
  }

  async loadStats(id: string) {
    try {
      const res: any = await firstValueFrom(this._http.get(`/api/products/${id}/stats`));
      this.stats.set(res?.data || res);
    } catch (e) {
      console.error('Failed to load stats', e);
    }
  }

  async loadLogs(id: string) {
    try {
      const res: any = await firstValueFrom(this._http.get(`/api/products/${id}/logs`));
      this.logs.set(res?.data || res);
    } catch (e) {
      console.error('Failed to load logs', e);
    }
  }

  async onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    this.isUploading.set(true);
    let successCount = 0;
    let failCount = 0;

    try {
      const files = Array.from(input.files);
      
      const uploadPromises = files.map(file => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('folder', 'temp'); // Upload to temp folder first, backend moves it
        return firstValueFrom(this._http.post('/api/upload', formData)).catch(err => null);
      });

      const results = await Promise.all(uploadPromises);
      
      const newMediaItems: any[] = [];
      results.forEach((response: any, idx) => {
        if (response && response.success && response.data?.secure_url) {
          const type = files[idx].type.startsWith('video') ? 'video' : 'image';
          newMediaItems.push({ 
            url: response.data.secure_url, 
            public_id: response.data.public_id, 
            type: type 
          });
          successCount++;
        } else {
          failCount++;
        }
      });

      if (newMediaItems.length > 0) {
        this.uploadedMedia.update(media => {
          const newMediaList = [...media, ...newMediaItems];
          // Auto select the very last uploaded image
          this.selectedIndex.set(newMediaList.length - 1);
          return newMediaList;
        });
      }

      if (successCount > 0) {
        toast.success('Upload Success', { description: `Added ${successCount} image(s).` });
      }
      if (failCount > 0) {
        toast.error('Upload Error', { description: `Failed to upload ${failCount} image(s).` });
      }

    } catch (e) {
      toast.error('Upload Failed', { description: 'Could not process uploads.' });
    } finally {
      this.isUploading.set(false);
      input.value = ''; // Reset input
    }
  }

  removeMedia(index: number) {
    this.uploadedMedia.update(media => {
      const newMedia = [...media];
      newMedia.splice(index, 1);
      
      // Adjust selected index if needed
      if (this.selectedIndex() >= newMedia.length) {
        this.selectedIndex.set(Math.max(0, newMedia.length - 1));
      }
      return newMedia;
    });
  }

  removeMainMedia() {
    this.removeMedia(this.selectedIndex());
  }

  get formattedPrice(): string {
    const val = this.productForm.get('price')?.value;
    if (val === null || val === undefined || val === '') return '';
    return Number(val).toLocaleString('vi-VN');
  }

  onPriceInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const digitsOnly = input.value.replace(/[^\d]/g, '');
    
    if (!digitsOnly) {
      this.productForm.patchValue({ price: null });
      input.value = '';
    } else {
      const num = parseInt(digitsOnly, 10);
      this.productForm.patchValue({ price: num });
      input.value = num.toLocaleString('vi-VN');
    }
  }

  adjustStock(amount: number) {
    const min = 0;
    const current = this.productForm.get('stockQuantity')?.value || 0;
    const next = Math.max(min, current + amount);
    this.productForm.get('stockQuantity')?.setValue(next);
  }

  async onSubmit() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      toast.error('Validation Error', { description: 'Please check required fields.' });
      return;
    }

    this.isSubmitting.set(true);
    const val = this.productForm.value;

    const payload = {
      name: val.name,
      sku: val.sku,
      description: val.description,
      price: val.price,
      currency: val.currency,
      status: val.status,
      condition: val.condition,
      media: this.uploadedMedia(),
      categories: val.categoryId ? [{ id: val.categoryId }] : [],
      stock: { quantity: val.stockQuantity, track_inventory: true },
      shipping: val.shipping,
      slug: val.slug
    };

    try {
      if (this.isEditMode()) {
        await firstValueFrom(this._http.put(`/api/products/${this.productId()}`, payload));
        toast.success('Product Updated', { description: 'Changes saved successfully.' });
        this._router.navigate(['/products']);
      } else {
        await firstValueFrom(this._http.post('/api/products', payload));
        toast.success('Product Created', { description: 'New product added to catalog.' });
        this._router.navigate(['/products']);
      }
    } catch (e: any) {
      toast.error('Error saving product', { description: e?.error?.message || 'Server error occurred.' });
    } finally {
      this.isSubmitting.set(false);
    }
  }

  async archiveProduct() {
    if (!confirm('Are you sure you want to archive this product? This will hide it from the storefront.')) return;
    
    this.isSubmitting.set(true);
    try {
      await firstValueFrom(this._http.put(`/api/products/${this.productId()}`, { status: 'archived' }));
      toast.success('Product Archived', { description: 'The product is now in the archive.' });
      this._router.navigate(['/products']);
    } catch (e: any) {
      toast.error('Archive Error', { description: e?.error?.message || 'Could not archive product.' });
    } finally {
      this.isSubmitting.set(false);
    }
  }

  public slugify(text: string): string {
    if (!text) return '';
    let slug = text.toLowerCase();
    
    // Remove Vietnamese accents
    const from = "àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ";
    const to   = "aaaaaaaaaaaaaaaaaeeeeeeeeeeeiiiiiooooooooooooooooouuuuuuuuuuuyyyyyd";
    for (let i = 0, l = from.length; i < l; i++) {
        slug = slug.replace(new RegExp(from[i], "g"), to[i]);
    }

    slug = slug.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
        .replace(/\s+/g, '-') // collapse whitespace and replace by -
        .replace(/-+/g, '-'); // collapse dashes

    return slug.trim().replace(/^-+|-+$/g, ''); // trim dashes from ends
  }
}
