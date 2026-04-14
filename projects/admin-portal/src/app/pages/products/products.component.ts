import { Component, inject, signal, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { toast } from 'ngx-sonner';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, LucideAngularModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  private _http = inject(HttpClient);
  private _router = inject(Router);

  products = signal<any[]>([]);
  isLoading = signal(false);
  totalProducts = signal(0);
  activeCount = signal(0);
  lowStockCount = signal(0);

  // Pagination
  currentPage = signal(1);
  pageSize = 10;
  totalPages = signal(0);

  // Filters
  searchQuery = signal('');
  selectedStatus = signal('');

  // Confirm delete
  deletingId = signal<string | null>(null);

  ngOnInit() {
    this.loadProducts();
  }

  async loadProducts() {
    this.isLoading.set(true);
    try {
      const body: any = {
        page_index: this.currentPage(),
        page_size: this.pageSize,
      };
      if (this.searchQuery()) body.search = this.searchQuery();
      if (this.selectedStatus()) body.status = this.selectedStatus();

      const res: any = await firstValueFrom(this._http.post('/api/products/search', body));
      const payload = res?.data ?? res;

      const dataArray = Array.isArray(payload?.data) ? payload.data : [];
      this.products.set(dataArray);
      this.totalProducts.set(payload?.total ?? 0);
      this.activeCount.set(payload?.activeCount ?? 0);
      this.lowStockCount.set(payload?.lowStockCount ?? 0);
      this.totalPages.set(Math.ceil((payload?.total ?? 0) / this.pageSize));

      if (dataArray.length === 0) {
        toast.info('No Data', { description: 'No products found matching your criteria.' });
      }
    } catch (e) {
      console.error(e);
      toast.error('Load Failed', { description: 'Could not fetch products.' });
    } finally {
      this.isLoading.set(false);
    }
  }

  onSearch(value: string) {
    this.searchQuery.set(value);
    this.currentPage.set(1);
    this.loadProducts();
  }

  onStatusFilter(value: string) {
    this.selectedStatus.set(value);
    this.currentPage.set(1);
    this.loadProducts();
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages()) return;
    this.currentPage.set(page);
    this.loadProducts();
  }

  getPageNumbers(): number[] {
    const total = this.totalPages();
    const cur = this.currentPage();
    const pages: number[] = [];
    for (let i = Math.max(1, cur - 1); i <= Math.min(total, cur + 1); i++) {
      pages.push(i);
    }
    return pages;
  }

  async onDelete(product: any) {
    if (this.deletingId() === product.id) {
      this.deletingId.set(null);
      try {
        const res: any = await firstValueFrom(this._http.delete(`/api/products/${product.id}`));
        if (res?.success) {
          toast.success('Product Deleted', { description: `"${product.name}" has been removed.` });
          await this.loadProducts();
        } else {
          toast.error('Delete Failed');
        }
      } catch (e) {
        toast.error('Error', { description: 'Could not delete product.' });
      }
    } else {
      this.deletingId.set(product.id);
      // Auto-cancel confirm after 3s
      setTimeout(() => {
        if (this.deletingId() === product.id) this.deletingId.set(null);
      }, 3000);
    }
  }

  goToDetail(id: string) {
    this._router.navigate(['/products', id]);
  }

  minVal(a: number, b: number): number {
    return Math.min(a, b);
  }

  formatPrice(price: number, currency: string): string {
    const curr = currency || 'USD';
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: curr }).format(price);
  }
  getStockBadge(p: any): { text: string; cls: string } {
    const qty = p.stock?.quantity ?? p.stockQuantity ?? 0;
    if (qty <= 0)  return { text: 'Out of Stock', cls: 'bg-red-50 text-red-700' };
    if (qty <= 5)  return { text: 'Low Stock',    cls: 'bg-amber-50 text-amber-700' };
    return           { text: 'In Stock',       cls: 'bg-primary/10 text-primary' };
  }

  getStockDot(p: any): string {
    const qty = p.stock?.quantity ?? p.stockQuantity ?? 0;
    if (qty <= 0) return 'bg-red-500';
    if (qty <= 5) return 'bg-amber-500';
    return 'bg-primary';
  }

  getThumbnail(product: any): string | null {
    return product.thumbnail
      ?? (Array.isArray(product.media) && product.media.length > 0 ? product.media[0].url : null);
  }
}
