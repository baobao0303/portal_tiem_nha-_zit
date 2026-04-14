import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { LucideAngularModule } from 'lucide-angular';
import { toast } from 'ngx-sonner';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {
  private _http = inject(HttpClient);

  orders = signal<any[]>([]);
  isLoading = signal(false);

  // Stats
  totalOrders = signal(0);
  pendingCount = signal(0);
  shippingCount = signal(0);
  completedCount = signal(0);

  ngOnInit() {
    this.loadOrders();
  }

  async loadOrders() {
    this.isLoading.set(true);
    try {
      // NOTE: We need an admin endpoint to get ALL orders, not just the user's. 
      // For the sake of the prototype, we assume the API handles it if token is admin.
      const res: any = await firstValueFrom(this._http.get('/api/orders')); 
      const data = res?.data || [];
      this.orders.set(data);

      this.totalOrders.set(data.length);
      this.pendingCount.set(data.filter((o: any) => o.status === 'PENDING').length);
      this.shippingCount.set(data.filter((o: any) => o.status === 'SHIPPING').length);
      this.completedCount.set(data.filter((o: any) => o.status === 'COMPLETED').length);

    } catch (e) {
      console.error(e);
      toast.error('Lỗi', { description: 'Không thể tải danh sách đơn hàng.' });
    } finally {
      this.isLoading.set(false);
    }
  }

  async updateStatus(orderId: string, newStatus: string) {
    try {
      const res: any = await firstValueFrom(
        this._http.put(`/api/orders/${orderId}/status`, { status: newStatus })
      );
      if (res?.success || res?.data) {
        toast.success('Thành công', { description: `Đã cập nhật trạng thái đơn hàng thành ${newStatus}.` });
        this.loadOrders();
      } else {
        toast.error('Thất bại', { description: res?.message || 'Không thể cập nhật trạng thái' });
      }
    } catch (e: any) {
      toast.error('Lỗi', { description: e.error?.message || 'Có lỗi xảy ra khi cập nhật.' });
    }
  }

  getStatusBadge(status: string) {
    switch(status) {
      case 'PENDING': return { text: 'Chờ thanh toán', bg: 'bg-amber-50', textCol: 'text-amber-700', icon: 'clock' };
      case 'PAID': return { text: 'Đã thanh toán', bg: 'bg-indigo-50', textCol: 'text-indigo-700', icon: 'check-circle' };
      case 'SHIPPING': return { text: 'Đang vận chuyển', bg: 'bg-blue-50', textCol: 'text-blue-700', icon: 'truck' };
      case 'COMPLETED': return { text: 'Hoàn thành', bg: 'bg-emerald-50', textCol: 'text-emerald-700', icon: 'check-circle-2' };
      case 'CANCELLED': return { text: 'Đã huỷ', bg: 'bg-red-50', textCol: 'text-red-700', icon: 'x-circle' };
      default: return { text: status, bg: 'bg-gray-50', textCol: 'text-gray-700', icon: 'circle-dashed' };
    }
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  }

  formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('vi-VN', {
      year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  }
}
