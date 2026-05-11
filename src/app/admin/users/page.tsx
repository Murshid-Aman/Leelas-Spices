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
        <h1 className=" text-4xl font-bold text-[#3B2208]">Customer Management</h1>
        <p className="mt-2 text-[#3B2208]/50">View and manage your registered customers.</p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#3B2208]/20" />
          <input 
            type="text" 
            placeholder="Search customers by name or email..."
            className="w-full rounded-2xl border border-[#3B2208]/10 bg-[#F8F1E4] py-4 pl-12 pr-4 text-sm text-[#3B2208] focus:border-[#6B3D1E] focus:outline-none"
          />
        </div>
      </div>

      {/* Users Grid */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {MOCK_ADMIN_USERS.map((user) => (
          <div key={user.id} className="group relative overflow-hidden rounded-[40px] bg-[#F8F1E4] p-8 shadow-sm border border-[#6B3D1E]/5 hover:shadow-xl hover:shadow-[#6B3D1E]/5 transition-all">
            <div className="flex items-start justify-between">
              <div className="h-16 w-16 rounded-full bg-[#6B3D1E]/5 flex items-center justify-center text-xl font-bold text-[#6B3D1E]">
                {user.name[0]}
              </div>
              <button className="text-[#3B2208]/20 hover:text-[#6B3D1E]">
                <MoreVertical className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-6">
              <h3 className="text-xl font-bold text-[#3B2208]">{user.name}</h3>
              <div className="mt-4 space-y-3">
                <div className="flex items-center gap-3 text-sm text-[#3B2208]/60">
                  <Mail className="h-4 w-4" /> {user.email}
                </div>
                <div className="flex items-center gap-3 text-sm text-[#3B2208]/60">
                  <MapPin className="h-4 w-4" /> {user.location}
                </div>
                <div className="flex items-center gap-3 text-sm text-[#3B2208]/60">
                  <Calendar className="h-4 w-4" /> Joined {user.joined}
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-[#3B2208]/5 pt-6">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#3B2208]/35">Total Orders</p>
                <p className="text-lg font-bold text-[#6B3D1E]">{user.orders}</p>
              </div>
              <button className="rounded-full bg-[#3B2208]/5 px-5 py-2 text-[11px] font-bold uppercase tracking-widest text-[#3B2208] hover:bg-[#6B3D1E] hover:text-white transition-all">
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
