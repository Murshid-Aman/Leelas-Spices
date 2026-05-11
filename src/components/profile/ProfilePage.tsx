'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  User,
  MapPin,
  Package,
  Heart,
  Settings,
  LogOut,
  Edit3,
  Plus,
  Trash2,
  ChevronRight,
  Star,
  X,
} from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { useWishlist } from '@/hooks/useWishlist';
import { useAuthStore } from '@/store/authStore';
import { ROUTES } from '@/lib/constants';
import { ProductCard } from '@/components/product/ProductCard';

/* ── Mock Data ── */
const MOCK_USER = {
  name: 'Priya Sharma',
  email: 'priya.sharma@email.com',
  phone: '+91 98765 43210',
  avatar: '/images/products/saffron.png',
  memberSince: 'March 2024',
};

interface Address {
  id: string;
  label: string;
  name: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  isDefault: boolean;
}

const INITIAL_ADDRESSES: Address[] = [
  {
    id: '1',
    label: 'Home',
    name: 'Priya Sharma',
    line1: '42, Rose Garden Apartments',
    line2: 'MG Road, Indiranagar',
    city: 'Bangalore',
    state: 'Karnataka',
    pincode: '560038',
    phone: '+91 98765 43210',
    isDefault: true,
  },
];

const MOCK_ORDERS = [
  {
    id: 'ORD-2024-1847',
    date: 'Apr 15, 2024',
    status: 'Delivered',
    total: 1247,
    items: [
      { name: 'Kashmir Saffron', qty: 1, variant: '2g', price: 1699 },
      { name: 'Organic Turmeric Powder', qty: 2, variant: '250g', price: 549 },
    ],
  },
  {
    id: 'ORD-2024-1632',
    date: 'Mar 28, 2024',
    status: 'Delivered',
    total: 698,
    items: [
      { name: 'Green Cardamom Pods', qty: 1, variant: '100g', price: 749 },
    ],
  },
  {
    id: 'ORD-2024-1201',
    date: 'Feb 10, 2024',
    status: 'Delivered',
    total: 1299,
    items: [
      { name: "Leela's Garam Masala", qty: 1, variant: '500g', price: 1299 },
    ],
  },
];

/* Wishlist removed from mock - using real store */

type Tab = 'profile' | 'addresses' | 'orders' | 'wishlist' | 'settings';

const TABS: { key: Tab; label: string; icon: typeof User }[] = [
  { key: 'profile', label: 'Profile', icon: User },
  { key: 'addresses', label: 'Addresses', icon: MapPin },
  { key: 'orders', label: 'Orders', icon: Package },
  { key: 'wishlist', label: 'Wishlist', icon: Heart },
  { key: 'settings', label: 'Settings', icon: Settings },
];

const EMPTY_ADDRESS: Omit<Address, 'id'> = {
  label: '', name: '', line1: '', line2: '', city: '', state: '', pincode: '', phone: '', isDefault: false,
};

export function ProfilePage() {
  const router = useRouter();
  const { user, clearUser } = useAuthStore();
  const { items: wishlistItems, totalItems: wishlistCount } = useWishlist();
  
  const displayUser = user || MOCK_USER;
  const [activeTab, setActiveTab] = useState<Tab>('profile');
  const [addresses, setAddresses] = useState<Address[]>(INITIAL_ADDRESSES);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addressDraft, setAddressDraft] = useState(EMPTY_ADDRESS);

  /* ── Address helpers ── */
  const handleSaveAddress = () => {
    if (editingAddress) {
      setAddresses((prev) => prev.map((a) => (a.id === editingAddress.id ? { ...addressDraft, id: editingAddress.id } : a)));
    } else {
      if (addresses.length >= 2) return;
      setAddresses((prev) => [...prev, { ...addressDraft, id: Date.now().toString() }]);
    }
    setShowAddressForm(false);
    setEditingAddress(null);
    setAddressDraft(EMPTY_ADDRESS);
  };

  const handleEditAddress = (addr: Address) => {
    setEditingAddress(addr);
    setAddressDraft(addr);
    setShowAddressForm(true);
  };

  const handleDeleteAddress = (id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
  };

  const handleSetDefault = (id: string) => {
    setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: a.id === id })));
  };

  const handleLogout = () => {
    clearUser();
    router.push(ROUTES.HOME);
  };

  const statusColor = (s: string) => {
    if (s === 'Delivered') return 'bg-green-50 text-green-700';
    if (s === 'Processing') return 'bg-amber-50 text-amber-700';
    if (s === 'Shipped') return 'bg-blue-50 text-blue-700';
    return 'bg-gray-50 text-gray-700';
  };

  return (
    <div className="grid gap-10 lg:grid-cols-[320px_1fr]">
      {/* ═══ Sidebar ═══ */}
      <aside className="space-y-8">
        {/* User card */}
        <div className="rounded-2xl border border-[#3B2208]/8 bg-[#F8F1E4] p-8 text-center">
          <div className="relative mx-auto h-28 w-28 overflow-hidden rounded-full bg-[#F0E6D3] ring-4 ring-[#6B3D1E]/10">
            <Image src={displayUser.avatar || MOCK_USER.avatar} alt={displayUser.name} fill className="object-cover" sizes="112px" />
          </div>
          <h2 className="mt-4 text-xl font-bold text-[#3B2208] ">{displayUser.name}</h2>
          <p className="mt-1 text-sm text-[#3B2208]/45">{displayUser.email}</p>
          <p className="mt-1 text-xs uppercase tracking-wider text-[#3B2208]/30">Member since {MOCK_USER.memberSince}</p>
        </div>

        {/* Nav tabs */}
        <nav className="rounded-2xl border border-[#3B2208]/8 bg-[#F8F1E4] overflow-hidden">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex w-full items-center gap-3.5 px-6 py-4 text-[15px] font-medium transition-colors ${
                activeTab === tab.key
                  ? 'bg-[#6B3D1E]/5 text-[#6B3D1E] border-l-[3px] border-[#6B3D1E]'
                  : 'text-[#3B2208]/55 hover:bg-[#3B2208]/3 border-l-[3px] border-transparent'
              }`}
              id={`tab-${tab.key}`}
            >
              <tab.icon className="h-5 w-5" />
              {tab.label}
            </button>
          ))}
          <button 
            onClick={handleLogout}
            className="flex w-full items-center gap-3.5 px-6 py-4 text-[15px] font-medium text-red-500/70 hover:bg-red-50 transition-colors border-l-[3px] border-transparent"
          >
            <LogOut className="h-5 w-5" />
            Log Out
          </button>
        </nav>
      </aside>

      {/* ═══ Main Content ═══ */}
      <main className="min-w-0">
        {/* ──── PROFILE TAB ──── */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-[#3B2208] ">My Profile</h1>
            <div className="rounded-2xl border border-[#3B2208]/8 bg-[#F8F1E4] p-8 sm:p-10 space-y-7">
              {[
                { label: 'Full Name', value: displayUser.name },
                { label: 'Email Address', value: displayUser.email },
                { label: 'Phone Number', value: displayUser.phone || MOCK_USER.phone },
              ].map((field) => (
                <div key={field.label} className="flex items-center justify-between border-b border-[#3B2208]/6 pb-5 last:border-0 last:pb-0">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-[#3B2208]/35 font-medium">{field.label}</p>
                    <p className="mt-1 text-base font-medium text-[#3B2208]">{field.value}</p>
                  </div>
                  <button className="text-[#6B3D1E]/60 hover:text-[#6B3D1E] transition-colors"><Edit3 className="h-5 w-5" /></button>
                </div>
              ))}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-5">
              {[
                { label: 'Total Orders', value: MOCK_ORDERS.length.toString() },
                { label: 'Wishlist Items', value: wishlistCount.toString() },
                { label: 'Saved Addresses', value: addresses.length.toString() },
              ].map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-[#3B2208]/8 bg-[#F8F1E4] p-6 text-center">
                  <p className="text-3xl font-bold text-[#6B3D1E]">{stat.value}</p>
                  <p className="mt-1.5 text-xs uppercase tracking-widest text-[#3B2208]/40 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ──── ADDRESSES TAB ──── */}
        {activeTab === 'addresses' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-[#3B2208] ">My Addresses</h1>
              {addresses.length < 2 && !showAddressForm && (
                <button
                  onClick={() => { setEditingAddress(null); setAddressDraft(EMPTY_ADDRESS); setShowAddressForm(true); }}
                  className="inline-flex items-center gap-2 rounded-full bg-[#6B3D1E] px-6 py-2.5 text-sm font-bold uppercase tracking-wider text-white hover:bg-[#5A3218] transition-all"
                >
                  <Plus className="h-3.5 w-3.5" /> Add Address
                </button>
              )}
            </div>

            {/* Address Cards */}
            <div className="grid gap-4 sm:grid-cols-2">
              {addresses.map((addr) => (
                <div key={addr.id} className={`rounded-2xl border bg-[#F8F1E4] p-5 ${addr.isDefault ? 'border-[#6B3D1E]/30 ring-1 ring-[#6B3D1E]/10' : 'border-[#3B2208]/8'}`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-[#6B3D1E]/8 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#6B3D1E]">{addr.label || 'Address'}</span>
                      {addr.isDefault && <span className="rounded-full bg-green-50 px-2 py-0.5 text-[10px] font-bold uppercase text-green-600">Default</span>}
                    </div>
                    <div className="flex gap-1">
                      <button onClick={() => handleEditAddress(addr)} className="p-1.5 text-[#3B2208]/30 hover:text-[#6B3D1E] transition-colors"><Edit3 className="h-3.5 w-3.5" /></button>
                      <button onClick={() => handleDeleteAddress(addr.id)} className="p-1.5 text-[#3B2208]/30 hover:text-red-500 transition-colors"><Trash2 className="h-3.5 w-3.5" /></button>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-[#3B2208]">{addr.name}</p>
                  <p className="mt-1 text-sm text-[#3B2208]/55 leading-relaxed">{addr.line1}<br />{addr.line2}<br />{addr.city}, {addr.state} — {addr.pincode}</p>
                  <p className="mt-2 text-xs text-[#3B2208]/40">{addr.phone}</p>
                  {!addr.isDefault && (
                    <button onClick={() => handleSetDefault(addr.id)} className="mt-3 text-xs font-medium text-[#6B3D1E] hover:underline">Set as default</button>
                  )}
                </div>
              ))}
            </div>

            {addresses.length >= 2 && !showAddressForm && (
              <p className="text-xs text-[#3B2208]/40 italic">Maximum of 2 addresses allowed.</p>
            )}

            {/* Address Form Modal */}
            {showAddressForm && (
              <div className="rounded-2xl border border-[#3B2208]/8 bg-[#F8F1E4] p-6 sm:p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-[#3B2208] ">{editingAddress ? 'Edit Address' : 'Add New Address'}</h3>
                  <button onClick={() => { setShowAddressForm(false); setEditingAddress(null); }} className="p-1 text-[#3B2208]/30 hover:text-[#3B2208]"><X className="h-5 w-5" /></button>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    { key: 'label', label: 'Label (Home/Work)', placeholder: 'e.g. Home' },
                    { key: 'name', label: 'Full Name', placeholder: 'Recipient name' },
                    { key: 'line1', label: 'Address Line 1', placeholder: 'House/Flat, Building' },
                    { key: 'line2', label: 'Address Line 2', placeholder: 'Street, Area' },
                    { key: 'city', label: 'City', placeholder: 'City' },
                    { key: 'state', label: 'State', placeholder: 'State' },
                    { key: 'pincode', label: 'PIN Code', placeholder: '6-digit code' },
                    { key: 'phone', label: 'Phone', placeholder: '+91 ...' },
                  ].map((f) => (
                    <div key={f.key}>
                      <label className="text-[10px] font-bold uppercase tracking-widest text-[#3B2208]/40">{f.label}</label>
                      <input
                        type="text"
                        value={(addressDraft as any)[f.key] || ''}
                        onChange={(e) => setAddressDraft((prev) => ({ ...prev, [f.key]: e.target.value }))}
                        placeholder={f.placeholder}
                        className="mt-1 w-full rounded-lg border border-[#3B2208]/12 bg-[#FDFAF5] px-3.5 py-2.5 text-sm text-[#3B2208] placeholder:text-[#3B2208]/25 focus:border-[#6B3D1E]/40 focus:outline-none focus:ring-1 focus:ring-[#6B3D1E]/20"
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex items-center gap-3">
                  <button onClick={handleSaveAddress} className="rounded-full bg-[#6B3D1E] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#5A3218] transition-all">
                    {editingAddress ? 'Update Address' : 'Save Address'}
                  </button>
                  <button onClick={() => { setShowAddressForm(false); setEditingAddress(null); }} className="rounded-full border border-[#3B2208]/15 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-[#3B2208]/60 hover:bg-[#3B2208]/5 transition-all">
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ──── ORDERS TAB ──── */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-[#3B2208] ">Order History</h1>
            {MOCK_ORDERS.map((order) => (
              <div key={order.id} className="rounded-2xl border border-[#3B2208]/8 bg-[#F8F1E4] overflow-hidden">
                {/* Order header */}
                <div className="flex flex-wrap items-center justify-between gap-3 bg-[#F8F1E4] px-6 py-4 border-b border-[#3B2208]/6">
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-[#3B2208]/35 font-medium">Order</p>
                      <p className="text-sm font-bold text-[#3B2208]">{order.id}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-[#3B2208]/35 font-medium">Date</p>
                      <p className="text-sm text-[#3B2208]/70">{order.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${statusColor(order.status)}`}>{order.status}</span>
                    <span className="text-lg font-bold text-[#3B2208]">{formatPrice(order.total)}</span>
                  </div>
                </div>
                {/* Order items */}
                <div className="px-6 py-4 space-y-3">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex items-center justify-between text-sm">
                      <div>
                        <span className="font-medium text-[#3B2208]">{item.name}</span>
                        <span className="ml-2 text-[#3B2208]/40">× {item.qty} · {item.variant}</span>
                      </div>
                      <span className="font-semibold text-[#3B2208]/70">{formatPrice(item.price * item.qty)}</span>
                    </div>
                  ))}
                </div>
                <div className="px-6 pb-4">
                  <button className="inline-flex items-center gap-1 text-xs font-bold text-[#6B3D1E] hover:underline">
                    View Details <ChevronRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'wishlist' && (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-[#3B2208] ">My Wishlist</h1>
            {wishlistCount === 0 ? (
              <div className="rounded-2xl border border-[#3B2208]/8 bg-[#F8F1E4] p-12 text-center">
                <p className="text-[#3B2208]/50">Your wishlist is currently empty.</p>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2">
                {wishlistItems.map((item) => (
                  <ProductCard key={item.id} product={item} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* ──── SETTINGS TAB ──── */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-[#3B2208] ">Account Settings</h1>
            <div className="rounded-2xl border border-[#3B2208]/8 bg-[#F8F1E4] p-8 sm:p-10 space-y-8">
              {/* Password */}
              <div className="flex items-center justify-between border-b border-[#3B2208]/6 pb-6">
                <div>
                  <p className="text-base font-semibold text-[#3B2208]">Change Password</p>
                  <p className="mt-1 text-sm text-[#3B2208]/40">Last changed 3 months ago</p>
                </div>
                <button className="rounded-full border border-[#3B2208]/15 px-5 py-2 text-xs font-bold uppercase tracking-wider text-[#3B2208]/60 hover:bg-[#3B2208]/5">Update</button>
              </div>
              {/* Notifications */}
              <div className="flex items-center justify-between border-b border-[#3B2208]/6 pb-6">
                <div>
                  <p className="text-base font-semibold text-[#3B2208]">Email Notifications</p>
                  <p className="mt-1 text-sm text-[#3B2208]/40">Order updates, promotions, and recipes</p>
                </div>
                <div className="relative h-7 w-12 cursor-pointer rounded-full bg-[#6B3D1E]/20 transition-colors">
                  <div className="absolute left-0.5 top-0.5 h-6 w-6 rounded-full bg-[#6B3D1E] shadow transition-transform translate-x-5" />
                </div>
              </div>
              {/* Delete Account */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-base font-semibold text-red-600">Delete Account</p>
                  <p className="mt-1 text-sm text-[#3B2208]/40">Permanently delete your account and all data</p>
                </div>
                <button className="rounded-full border border-red-200 px-5 py-2 text-xs font-bold uppercase tracking-wider text-red-500 hover:bg-red-50">Delete</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
