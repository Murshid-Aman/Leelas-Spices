'use client';

import { useState } from 'react';
import { 
  Package, 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit, 
  Trash2, 
  ChevronRight, 
  CheckCircle2, 
  ChevronLeft,
  Upload,
  Image as ImageIcon
} from 'lucide-react';
import Image from 'next/image';
import { formatPrice } from '@/lib/utils';

/* ── MOCK PRODUCTS ── */
const MOCK_ADMIN_PRODUCTS = [
  { id: '1', name: 'Kashmir Saffron', category: 'Whole Spices', price: 1699, stock: 12, status: 'Active' },
  { id: '2', name: 'Organic Turmeric Powder', category: 'Ground Spices', price: 549, stock: 45, status: 'Active' },
  { id: '3', name: 'Green Cardamom', category: 'Whole Spices', price: 749, stock: 5, status: 'Low Stock' },
  { id: '4', name: 'Garam Masala Blend', category: 'Spice Blends', price: 399, stock: 82, status: 'Active' },
];

export default function AdminProductsPage() {
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    description: '',
  });

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 5));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className=" text-4xl font-bold text-[var(--color-text-heading)]">Product Catalog</h1>
          <p className="mt-2 text-[var(--color-text-heading)]/50">Manage your spices, pricing, and availability.</p>
        </div>
        <button 
          onClick={() => { setIsWizardOpen(true); setCurrentStep(1); }}
          className="flex items-center justify-center gap-2 rounded-full bg-[var(--color-brand-primary)] px-8 py-4 text-sm font-bold uppercase tracking-widest text-white shadow-lg hover:shadow-xl active:scale-95 transition-all"
        >
          <Plus className="h-5 w-5" /> Add New Product
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--color-text-heading)]/20" />
          <input 
            type="text" 
            placeholder="Search products by name or SKU..."
            className="w-full rounded-2xl border border-[var(--color-text-heading)]/10 bg-[var(--color-bg-surface)] py-4 pl-12 pr-4 text-sm text-[var(--color-text-heading)] focus:border-[var(--color-brand-primary)] focus:outline-none"
          />
        </div>
        <button className="flex items-center gap-2 rounded-2xl border border-[var(--color-text-heading)]/10 bg-[var(--color-bg-surface)] px-6 py-4 text-sm font-bold text-[var(--color-text-heading)]/60 hover:bg-[var(--color-text-heading)]/5">
          <Filter className="h-4 w-4" /> Filter
        </button>
      </div>

      {/* Product Table */}
      <div className="overflow-hidden rounded-[40px] border border-[var(--color-text-heading)]/5 bg-[var(--color-bg-surface)] shadow-sm">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-[var(--color-brand-primary)]/10 bg-[var(--color-brand-primary)]/[0.03] text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--color-brand-primary)]/60">
              <th className="px-8 py-5">Product Name</th>
              <th className="px-8 py-5">Category</th>
              <th className="px-8 py-5">Price</th>
              <th className="px-8 py-5">Stock</th>
              <th className="px-8 py-5">Status</th>
              <th className="px-8 py-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-text-heading)]/5">
            {MOCK_ADMIN_PRODUCTS.map((product) => (
              <tr key={product.id} className="group hover:bg-[var(--color-brand-primary)]/[0.02] transition-colors">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-[var(--color-brand-primary)]/5 flex items-center justify-center">
                       <Package className="h-5 w-5 text-[var(--color-brand-primary)]/20" />
                    </div>
                    <span className="font-bold text-[var(--color-text-heading)]">{product.name}</span>
                  </div>
                </td>
                <td className="px-8 py-6 text-sm text-[var(--color-text-heading)]/60 font-medium">{product.category}</td>
                <td className="px-8 py-6 text-sm font-bold text-[var(--color-text-heading)]">{formatPrice(product.price)}</td>
                <td className="px-8 py-6 text-sm text-[var(--color-text-heading)]/60 font-medium">{product.stock} units</td>
                <td className="px-8 py-6">
                  <span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${
                    product.status === 'Low Stock' ? 'bg-amber-50 text-amber-600' : 'bg-green-50 text-green-600'
                  }`}>
                    {product.status}
                  </span>
                </td>
                <td className="px-8 py-6 text-right">
                  <button className="p-2 text-[var(--color-text-heading)]/20 hover:text-[var(--color-brand-primary)] transition-colors">
                    <MoreVertical className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── PRODUCT WIZARD OVERLAY ── */}
      {isWizardOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--color-text-heading)]/40 backdrop-blur-md p-4">
          <div className="w-full max-w-4xl overflow-hidden rounded-[48px] bg-[var(--color-bg-surface)] shadow-2xl animate-in zoom-in duration-300">
            {/* Wizard Header */}
            <div className="bg-[var(--color-brand-primary)] p-10 text-white">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold ">Add New Spice Product</h2>
                <button onClick={() => setIsWizardOpen(false)} className="text-white/60 hover:text-white">
                   <X className="h-6 w-6" />
                </button>
              </div>
              
              {/* Stepper */}
              <div className="flex items-center justify-between max-w-2xl mx-auto">
                {[1, 2, 3, 4, 5].map((step) => (
                  <div key={step} className="flex items-center">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-500 ${
                      currentStep >= step ? 'bg-white text-[var(--color-brand-primary)] border-white' : 'border-white/20 text-white/40'
                    }`}>
                      {currentStep > step ? <CheckCircle2 className="h-6 w-6" /> : step}
                    </div>
                    {step < 5 && (
                      <div className={`h-[2px] w-12 sm:w-20 transition-all duration-500 ${
                        currentStep > step ? 'bg-white' : 'bg-white/20'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between max-w-2xl mx-auto mt-4 px-2">
                 {['Basic Info', 'Pricing', 'Media', 'Details', 'Review'].map((label, i) => (
                   <span key={label} className={`text-[10px] font-bold uppercase tracking-widest transition-opacity ${
                     currentStep === i + 1 ? 'opacity-100' : 'opacity-40'
                   }`}>{label}</span>
                 ))}
              </div>
            </div>

            {/* Wizard Body */}
            <div className="p-12 min-h-[400px]">
              {currentStep === 1 && (
                <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                  <div className="grid gap-8 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold uppercase tracking-widest text-[var(--color-text-heading)]/40">Product Name</label>
                      <input type="text" placeholder="e.g. Malabar Black Pepper" className="w-full rounded-2xl border border-[var(--color-text-heading)]/12 bg-[var(--color-bg-neutral)] p-4 text-sm focus:border-[var(--color-brand-primary)] focus:outline-none" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold uppercase tracking-widest text-[var(--color-text-heading)]/40">Category</label>
                      <select className="w-full rounded-2xl border border-[var(--color-text-heading)]/12 bg-[var(--color-bg-neutral)] p-4 text-sm focus:border-[var(--color-brand-primary)] focus:outline-none">
                        <option>Whole Spices</option>
                        <option>Ground Spices</option>
                        <option>Spice Blends</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold uppercase tracking-widest text-[var(--color-text-heading)]/40">Product Description</label>
                    <textarea rows={4} placeholder="Describe the aroma, taste and origin..." className="w-full rounded-2xl border border-[var(--color-text-heading)]/12 bg-[var(--color-bg-neutral)] p-4 text-sm focus:border-[var(--color-brand-primary)] focus:outline-none" />
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                  <div className="grid gap-8 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold uppercase tracking-widest text-[var(--color-text-heading)]/40">Base Price (₹)</label>
                      <input type="number" placeholder="499" className="w-full rounded-2xl border border-[var(--color-text-heading)]/12 bg-[var(--color-bg-neutral)] p-4 text-sm focus:border-[var(--color-brand-primary)] focus:outline-none" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold uppercase tracking-widest text-[var(--color-text-heading)]/40">Initial Stock</label>
                      <input type="number" placeholder="100" className="w-full rounded-2xl border border-[var(--color-text-heading)]/12 bg-[var(--color-bg-neutral)] p-4 text-sm focus:border-[var(--color-brand-primary)] focus:outline-none" />
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-[var(--color-text-heading)]/10 rounded-[40px] p-20 animate-in fade-in slide-in-from-right-4 duration-500">
                  <Upload className="h-12 w-12 text-[var(--color-brand-primary)]/20 mb-4" />
                  <p className="font-bold text-[var(--color-text-heading)]">Drop product images here</p>
                  <p className="text-sm text-[var(--color-text-heading)]/40 mt-1">PNG or JPG up to 10MB</p>
                  <button className="mt-6 rounded-full border border-[var(--color-text-heading)]/10 px-8 py-3 text-[11px] font-bold uppercase tracking-widest text-[var(--color-text-heading)]/60 hover:bg-[var(--color-text-heading)]/5">Select Files</button>
                </div>
              )}

              {currentStep >= 4 && (
                 <div className="flex flex-col items-center justify-center py-10 animate-in fade-in duration-500">
                   <CheckCircle2 className="h-16 w-16 text-green-500 mb-6" />
                   <h3 className="text-2xl font-bold text-[var(--color-text-heading)]">Ready to Publish</h3>
                   <p className="text-[var(--color-text-heading)]/50 mt-2 text-center max-w-sm">Please review all details before making this product live in the storefront.</p>
                 </div>
              )}
            </div>

            {/* Wizard Footer */}
            <div className="flex items-center justify-between border-t border-[var(--color-text-heading)]/5 p-10 bg-[var(--color-bg-surface)]">
              <button 
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[var(--color-text-heading)]/40 hover:text-[var(--color-text-heading)] disabled:opacity-0 transition-all"
              >
                <ChevronLeft className="h-5 w-5" /> Previous
              </button>
              
              <button 
                onClick={currentStep === 5 ? () => setIsWizardOpen(false) : nextStep}
                className="flex items-center gap-2 rounded-full bg-[var(--color-brand-primary)] px-10 py-4 text-sm font-bold uppercase tracking-widest text-white shadow-lg hover:shadow-xl active:scale-95 transition-all"
              >
                {currentStep === 5 ? 'Publish Spice' : 'Continue'} <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function X({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
    </svg>
  );
}
