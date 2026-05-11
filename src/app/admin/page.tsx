'use client';

import { 
  TrendingUp, 
  Package, 
  ShoppingCart, 
  Users, 
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { formatPrice } from '@/lib/utils';

export default function AdminDashboard() {
  const stats = [
    { label: 'Total Revenue', value: '₹45,280', icon: TrendingUp, trend: '+12.5%', isUp: true },
    { label: 'Active Orders', value: '24', icon: ShoppingCart, trend: '+3 today', isUp: true },
    { label: 'Products', value: '156', icon: Package, trend: '-2 out of stock', isUp: false },
    { label: 'New Customers', value: '42', icon: Users, trend: '+8% this week', isUp: true },
  ];

  return (
    <div className="space-y-10">
      <div>
        <h1 className=" text-4xl font-bold text-[#3B2208]">Dashboard Overview</h1>
        <p className="mt-2 text-[#3B2208]/50">Welcome back, here is what is happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="rounded-[32px] bg-[#F8F1E4] p-8 shadow-sm border border-[#3B2208]/5">
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#6B3D1E]/5 text-[#6B3D1E]">
                  <Icon className="h-6 w-6" />
                </div>
                <div className={`flex items-center gap-1 text-xs font-bold ${stat.isUp ? 'text-green-600' : 'text-amber-600'}`}>
                   {stat.trend} {stat.isUp ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                </div>
              </div>
              <div className="mt-6">
                <p className="text-[11px] font-bold uppercase tracking-widest text-[#3B2208]/40">{stat.label}</p>
                <p className="mt-1 text-3xl font-bold text-[#3B2208]">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Low Stock Alerts */}
        <div className="rounded-[40px] bg-[#F8F1E4] p-10 shadow-sm border border-[#3B2208]/5">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-[#3B2208]">Inventory Alerts</h2>
            <AlertTriangle className="h-5 w-5 text-amber-500" />
          </div>
          <div className="space-y-4">
            {[
              { name: 'Kashmir Saffron (2g)', stock: 2, status: 'Critical' },
              { name: 'Green Cardamom (500g)', stock: 5, status: 'Low' },
              { name: 'Organic Turmeric (1kg)', stock: 8, status: 'Low' },
            ].map((item) => (
              <div key={item.name} className="flex items-center justify-between rounded-2xl bg-[#fafafa] p-4">
                <div>
                  <p className="font-bold text-[#3B2208]">{item.name}</p>
                  <p className="text-xs text-[#3B2208]/40">{item.stock} units remaining</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${
                  item.status === 'Critical' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'
                }`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
          <button className="mt-8 w-full rounded-2xl border border-[#3B2208]/10 py-4 text-xs font-bold uppercase tracking-widest text-[#3B2208]/60 hover:bg-[#3B2208]/5">
            View Full Inventory
          </button>
        </div>

        {/* Recent Activity */}
        <div className="rounded-[40px] bg-[#F8F1E4] p-10 shadow-sm border border-[#3B2208]/5">
          <h2 className="text-xl font-bold text-[#3B2208] mb-8">Recent Orders</h2>
          <div className="space-y-6">
            {[
              { id: '#1847', user: 'Priya Sharma', amount: '₹1,247', time: '2 mins ago' },
              { id: '#1846', user: 'Rahul V.', amount: '₹699', time: '15 mins ago' },
              { id: '#1845', user: 'Anjali K.', amount: '₹2,450', time: '1 hour ago' },
            ].map((order) => (
              <div key={order.id} className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-[#F0E6D3] flex items-center justify-center font-bold text-[#3B2208]">
                  {order.user[0]}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-[#3B2208]">{order.user}</p>
                  <p className="text-xs text-[#3B2208]/40">Order {order.id} · {order.time}</p>
                </div>
                <p className="font-bold text-[#6B3D1E]">{order.amount}</p>
              </div>
            ))}
          </div>
          <button className="mt-8 w-full rounded-2xl bg-[#6B3D1E] py-4 text-xs font-bold uppercase tracking-widest text-white shadow-lg hover:shadow-xl active:scale-95">
            Manage All Orders
          </button>
        </div>
      </div>
    </div>
  );
}
