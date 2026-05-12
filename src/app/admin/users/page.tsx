'use client';

import { 
  Search, 
  MoreVertical, 
  User, 
  Mail, 
  MapPin, 
  Calendar,
  Shield
} from 'lucide-react';

const MOCK_ADMIN_USERS = [
  { id: '1', name: 'Priya Sharma', email: 'priya@example.com', location: 'Bangalore', joined: 'Mar 12, 2024', orders: 3 },
  { id: '2', name: 'Rahul Varkey', email: 'rahul.v@gmail.com', location: 'Kochi', joined: 'Apr 02, 2024', orders: 1 },
  { id: '3', name: 'Anjali Kurian', email: 'anjali.k@outlook.com', location: 'Chennai', joined: 'Feb 20, 2024', orders: 5 },
];

export default function AdminUsersPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className=" text-4xl font-bold text-[var(--color-text-heading)]">Customer Management</h1>
        <p className="mt-2 text-[var(--color-text-heading)]/50">View and manage your registered customers.</p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--color-text-heading)]/20" />
          <input 
            type="text" 
            placeholder="Search customers by name or email..."
            className="w-full rounded-2xl border border-[var(--color-text-heading)]/10 bg-[var(--color-bg-surface)] py-4 pl-12 pr-4 text-sm text-[var(--color-text-heading)] focus:border-[var(--color-brand-primary)] focus:outline-none"
          />
        </div>
      </div>

      {/* Users Grid */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {MOCK_ADMIN_USERS.map((user) => (
          <div key={user.id} className="group relative overflow-hidden rounded-[40px] bg-[var(--color-bg-surface)] p-8 shadow-sm border border-[var(--color-brand-primary)]/5 hover:shadow-xl hover:shadow-[var(--color-brand-primary)]/5 transition-all">
            <div className="flex items-start justify-between">
              <div className="h-16 w-16 rounded-full bg-[var(--color-brand-primary)]/5 flex items-center justify-center text-xl font-bold text-[var(--color-brand-primary)]">
                {user.name[0]}
              </div>
              <button className="text-[var(--color-text-heading)]/20 hover:text-[var(--color-brand-primary)]">
                <MoreVertical className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-6">
              <h3 className="text-xl font-bold text-[var(--color-text-heading)]">{user.name}</h3>
              <div className="mt-4 space-y-3">
                <div className="flex items-center gap-3 text-sm text-[var(--color-text-heading)]/60">
                  <Mail className="h-4 w-4" /> {user.email}
                </div>
                <div className="flex items-center gap-3 text-sm text-[var(--color-text-heading)]/60">
                  <MapPin className="h-4 w-4" /> {user.location}
                </div>
                <div className="flex items-center gap-3 text-sm text-[var(--color-text-heading)]/60">
                  <Calendar className="h-4 w-4" /> Joined {user.joined}
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-[var(--color-text-heading)]/5 pt-6">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-heading)]/35">Total Orders</p>
                <p className="text-lg font-bold text-[var(--color-brand-primary)]">{user.orders}</p>
              </div>
              <button className="rounded-full bg-[var(--color-text-heading)]/5 px-5 py-2 text-[11px] font-bold uppercase tracking-widest text-[var(--color-text-heading)] hover:bg-[var(--color-brand-primary)] hover:text-white transition-all">
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
