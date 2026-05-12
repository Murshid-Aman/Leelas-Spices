'use client';

import { 
  Search, 
  Filter, 
  MoreVertical, 
  Eye, 
  Download,
  Calendar,
  CreditCard,
  Truck
} from 'lucide-react';
import { formatPrice } from '@/lib/utils';

const MOCK_ADMIN_ORDERS = [
  { id: '#1847', date: 'Apr 29, 2024', customer: 'Priya Sharma', total: 1247, status: 'Processing', payment: 'Paid' },
  { id: '#1846', date: 'Apr 28, 2024', customer: 'Rahul Varkey', total: 699, status: 'Shipped', payment: 'Paid' },
  { id: '#1845', date: 'Apr 28, 2024', customer: 'Anjali Kurian', total: 2450, status: 'Delivered', payment: 'Paid' },
  { id: '#1844', date: 'Apr 27, 2024', customer: 'Suresh G.', total: 890, status: 'Delivered', payment: 'Paid' },
];

export default function AdminOrdersPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className=" text-4xl font-bold text-[var(--color-text-heading)]">Orders & Shipments</h1>
        <p className="mt-2 text-[var(--color-text-heading)]/50">Monitor sales and manage fulfillment logistics.</p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--color-text-heading)]/20" />
          <input 
            type="text" 
            placeholder="Search by Order ID or Customer..."
            className="w-full rounded-2xl border border-[var(--color-text-heading)]/10 bg-[var(--color-bg-surface)] py-4 pl-12 pr-4 text-sm text-[var(--color-text-heading)] focus:border-[var(--color-brand-primary)] focus:outline-none"
          />
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 rounded-2xl border border-[var(--color-text-heading)]/10 bg-[var(--color-bg-surface)] px-6 py-4 text-sm font-bold text-[var(--color-text-heading)]/60 hover:bg-[var(--color-text-heading)]/5">
            <Calendar className="h-4 w-4" /> Date Range
          </button>
          <button className="flex items-center gap-2 rounded-2xl border border-[var(--color-text-heading)]/10 bg-[var(--color-bg-surface)] px-6 py-4 text-sm font-bold text-[var(--color-text-heading)]/60 hover:bg-[var(--color-text-heading)]/5">
            <Download className="h-4 w-4" /> Export
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="overflow-hidden rounded-[40px] border border-[var(--color-text-heading)]/5 bg-[var(--color-bg-surface)] shadow-sm">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-[var(--color-brand-primary)]/10 bg-[var(--color-brand-primary)]/[0.03] text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--color-brand-primary)]/60">
              <th className="px-8 py-5">Order ID</th>
              <th className="px-8 py-5">Date</th>
              <th className="px-8 py-5">Customer</th>
              <th className="px-8 py-5">Payment</th>
              <th className="px-8 py-5">Fulfillment</th>
              <th className="px-8 py-5">Total</th>
              <th className="px-8 py-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-text-heading)]/5">
            {MOCK_ADMIN_ORDERS.map((order) => (
              <tr key={order.id} className="group hover:bg-[var(--color-brand-primary)]/[0.02] transition-colors">
                <td className="px-8 py-6 font-bold text-[var(--color-text-heading)]">{order.id}</td>
                <td className="px-8 py-6 text-sm text-[var(--color-text-heading)]/60 font-medium">{order.date}</td>
                <td className="px-8 py-6 text-sm font-bold text-[var(--color-text-heading)]">{order.customer}</td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-3.5 w-3.5 text-green-500" />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-green-600">{order.payment}</span>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${
                    order.status === 'Processing' ? 'bg-amber-50 text-amber-600' : 
                    order.status === 'Shipped' ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-600'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-8 py-6 font-bold text-[var(--color-brand-primary)]">{formatPrice(order.total)}</td>
                <td className="px-8 py-6 text-right">
                  <button className="p-2 text-[var(--color-text-heading)]/20 hover:text-[var(--color-brand-primary)] transition-colors">
                    <Eye className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
