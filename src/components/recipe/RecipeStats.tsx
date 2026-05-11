'use client';

import { FileText } from 'lucide-react';
import Image from 'next/image';

export function RecipeStats() {
  return (
    <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-[#F0E6D3] flex flex-col justify-between h-full hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center">
          <FileText className="text-orange-500" size={20} />
        </div>
        <h3 className="font-bold text-[#3B2208]">Your Receipts</h3>
      </div>

      <div className="flex items-end justify-between gap-4">
        <div>
          <span className="text-5xl font-black text-[#3B2208]">12</span>
          <p className="text-xs font-semibold text-[#3B2208]/40 uppercase tracking-widest mt-1">Created</p>
        </div>

        {/* Overlapping avatar group like in ref */}
        <div className="flex -space-x-3 overflow-hidden">
          {[1, 2, 3].map((i) => (
            <div key={i} className="relative w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-[#F0E6D3]">
               <Image
                  src={`https://i.pravatar.cc/100?u=${i}`}
                  alt="User"
                  fill
                  className="object-cover"
               />
            </div>
          ))}
          <div className="w-10 h-10 rounded-full border-2 border-white bg-[#F0E6D3] flex items-center justify-center text-[10px] font-bold text-[#3B2208]/60">
            +9
          </div>
        </div>
      </div>
    </div>
  );
}
