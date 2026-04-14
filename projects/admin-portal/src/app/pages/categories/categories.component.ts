import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateCategoryCommandHandler, EditCategoryCommandHandler, DeleteCategoryCommandHandler } from '@application/commands';
import { GetAllCategoryQueryHandler as QueryHandler } from '@application/queries';
import { CategoryBO, GetAllCategoryRequest, CreateCategoryRequest, EditCategoryRequest, DeleteCategoryRequest } from '@application/messages';
import { firstValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { toast } from 'ngx-sonner';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule],
  templateUrl: './categories.component.html'
})

export class CategoriesComponent implements OnInit {
  private _fb = inject(FormBuilder);
  private _getAllCategoryQueryHandler = inject(QueryHandler);
  private _createCategoryCommandHandler = inject(CreateCategoryCommandHandler);
  private _editCategoryCommandHandler = inject(EditCategoryCommandHandler);
  private _deleteCategoryCommandHandler = inject(DeleteCategoryCommandHandler);
  private _http = inject(HttpClient);

  public categories = signal<CategoryBO[]>([]);
  public totalCategories = signal<number>(0);
  public activeCount = signal<number>(0);
  public inactiveCount = signal<number>(0);
  public isLoading = signal<boolean>(false);
  public isUploading = signal<boolean>(false);

  // Edit mode: null = creating new, string = id of category being edited
  public editingId = signal<string | null>(null);

  public categoryForm: FormGroup;

  constructor() {
    this.categoryForm = this._fb.group({
      name: ['', Validators.required],
      description: [''],
      imageUrl: [''],
      isActive: [true]
    });
  }

  ngOnInit() {
    this.loadCategories();
  }

  public get isEditing(): boolean {
    return this.editingId() !== null;
  }

  public async loadCategories() {
    this.isLoading.set(true);
    const request = new GetAllCategoryRequest();
    try {
      const response = await firstValueFrom(this._getAllCategoryQueryHandler.handle(request));
        const dataArray = response.data || [];
        this.categories.set(dataArray);
        this.totalCategories.set(response.total ?? dataArray.length);
        this.activeCount.set(response.activeCount ?? 0);
        this.inactiveCount.set(response.inactiveCount ?? 0);

        if (dataArray.length === 0) {
          toast.info('No Data', { description: 'There are no categories yet.' });
        }
    } catch (e) {
      console.error(e);
    } finally {
      this.isLoading.set(false);
    }
  }

  public onEdit(cat: CategoryBO) {
    this.editingId.set(cat.id);
    this.categoryForm.patchValue({
      name: cat.name,
      description: cat.description,
      imageUrl: cat.imageUrl,
      isActive: cat.isActive
    });
    // Scroll form into view
    document.querySelector('.category-form-panel')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  public onCancelEdit() {
    this.editingId.set(null);
    this.categoryForm.reset({ isActive: true });
  }

  public async onDelete(cat: CategoryBO) {
    if (!confirm(`Bạn có chắc muốn xoá danh mục "${cat.name}" không?`)) return;

    const request = new DeleteCategoryRequest();
    request.id = cat.id;

    try {
      const response = await firstValueFrom(this._deleteCategoryCommandHandler.handle(request));
      if (response.success) {
        await this.loadCategories();
        toast.success('Category Deleted', { description: `"${cat.name}" has been removed.` });
      } else {
        toast.error('Delete Failed', { description: 'Could not delete category. Please try again.' });
      }
    } catch (e) {
      console.error(e);
      toast.error('Error', { description: 'An unexpected error occurred while deleting.' });
    }
  }

  public async onSubmit() {
    if (this.categoryForm.invalid) {
      this.categoryForm.markAllAsTouched();
      return;
    }

    const val = this.categoryForm.value;

    if (this.isEditing) {
      // --- EDIT ---
      const request = new EditCategoryRequest();
      request.id = this.editingId()!;
      request.name = val.name;
      request.description = val.description;
      request.imageUrl = val.imageUrl;
      request.slug = val.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      request.isActive = val.isActive ?? true;

      try {
        const response = await firstValueFrom(this._editCategoryCommandHandler.handle(request));
        if (response.success) {
          this.onCancelEdit();
          await this.loadCategories();
          toast.success('Category Updated', { description: 'Changes saved successfully.' });
        } else {
          toast.error('Update Failed', { description: 'Could not update category. Please try again.' });
        }
      } catch (e) {
        console.error(e);
      }
    } else {
      // --- CREATE ---
      const request = new CreateCategoryRequest();
      request.name = val.name;
      request.description = val.description;
      request.imageUrl = val.imageUrl;
      request.slug = val.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      request.isActive = true;

      try {
        const response = await firstValueFrom(this._createCategoryCommandHandler.handle(request));
        if (response.success) {
          this.categoryForm.reset({ isActive: true });
          await this.loadCategories();
          toast.success('Category Added', { description: 'New collection was successfully created.' });
        } else {
          toast.error('Create Failed', { description: 'Could not create category. Please try again.' });
        }
      } catch (e) {
        console.error(e);
      }
    }
  }

  public onClear() {
    this.onCancelEdit();
  }

  public async onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', 'categories');

    this.isUploading.set(true);
    try {
      const response: any = await firstValueFrom(this._http.post('/api/upload', formData));
      if (response && response.success && response.data?.secure_url) {
        this.categoryForm.patchValue({ imageUrl: response.data.secure_url });
        toast.success('Image Uploaded', { description: 'Image ready to use.' });
      } else {
        toast.error('Upload Failed', { description: response?.message || 'Unknown error.' });
      }
    } catch (e) {
      console.error('Upload Error:', e);
      toast.error('Upload Error', { description: 'Error uploading image. Please try again.' });
    } finally {
      this.isUploading.set(false);
      input.value = '';
    }
  }
}
