import Link from 'next/link';
import Image from 'next/image';
import { ROUTES, APP_NAME } from '@/lib/constants';

const FOOTER_LINKS = {
  shop: [
    { label: 'All Spices', href: ROUTES.PRODUCTS },
    { label: 'Whole Spices', href: `${ROUTES.PRODUCTS}?category=whole-spices` },
    { label: 'Ground Spices', href: `${ROUTES.PRODUCTS}?category=ground-spices` },
    { label: 'Spice Blends', href: `${ROUTES.PRODUCTS}?category=spice-blends` },
    { label: 'Bundles', href: '#' },
    { label: 'New Arrivals', href: '#' },
    { label: 'Best Sellers', href: '#' },
  ],
  company: [
    { label: 'About Us', href: '#' },
    { label: 'Our Story', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Quality Promise', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Contact Us', href: '#' },
  ],
  support: [
    { label: 'Shipping', href: '#' },
    { label: 'Returns & Refunds', href: '#' },
    { label: 'FAQ', href: '#' },
    { label: 'Track Your Order', href: '#' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms & Conditions', href: '#' },
  ],
};

export function Footer() {
  return (
    <footer className="relative bg-[#F9F7F1] pt-16 pb-0 overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-8 relative z-10">
        {/* Background Illustration - Now constrained to this container */}
        <div className="absolute right-0 top-0 bottom-0 w-[50%] pointer-events-none z-0 hidden lg:block">
          <Image
            src="/images/footer-illustration.png"
            alt=""
            fill
            className="object-contain object-right-bottom mix-blend-multiply opacity-80 translate-x-[-130px] translate-y-[35px] scale-[1.45]"
          />
        </div>

        <div className="grid gap-12 lg:grid-cols-[1.3fr_0.9fr_0.9fr_0.9fr_1fr] relative z-10">
          {/* Brand & Newsletter Column */}
          <div className="flex flex-col">
            <Link href={ROUTES.HOME} className="mb-6 inline-block">
              <div className="relative h-12 w-28 sm:h-14 sm:w-32">
                <Image
                  src="/images/logo.png"
                  alt="Leela's Spices"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>

            <p className="text-[14px] font-bold text-[#536B31] mb-2 italic">A little spice, a lot of love.</p>
            <p className="text-[13px] leading-relaxed text-[#605A51] max-w-xs">
              Bringing you honest, high-quality spices from the best farms across India.
              Made for everyday Indian cooking.
            </p>

            {/* Newsletter */}
            <div className="mt-8">
              <h4 className="text-[12px] font-bold text-[#3B2208] mb-3">Get recipes & offers</h4>
              <form className="flex w-full max-w-[290px] rounded-xl bg-[#F0EBE1]/60 border border-[#3B2208]/10 p-1 shadow-sm">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 min-w-0 bg-transparent px-3 text-sm text-[#3B2208] placeholder-[#3B2208]/40 outline-none"
                />
                <button
                  type="submit"
                  className="rounded-lg bg-[#536B31] px-4 py-2 text-xs font-bold text-white transition-all hover:bg-[#3D4D24] active:scale-95 shadow-sm"
                >
                  Subscribe
                </button>
              </form>
            </div>

            {/* Socials */}
            <div className="mt-8 flex gap-3">
              {[
                { icon: 'instagram', d: 'M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z', circle: 'M17.5 6.5h.01' },
                { icon: 'facebook', d: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' },
                { icon: 'youtube', d: 'M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z' },
                { icon: 'whatsapp', d: 'M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-13.8 8.38 8.38 0 0 1 3.8.9L21 3z' }
              ].map((s) => (
                <Link key={s.icon} href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EBECE1] text-[#536B31] transition-all hover:bg-[#DDE0CC] hover:scale-110">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d={s.d} />
                    {s.icon === 'instagram' && <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />}
                    {s.circle && <path d={s.circle} />}
                    {s.icon === 'youtube' && <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" />}
                  </svg>
                </Link>
              ))}
            </div>
          </div>

          {/* Shop Column */}
          <div>
            <h3 className="mb-5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#536B31]">
              Shop
              <div className="mt-2 h-0.5 w-7 bg-[#536B31]/40"></div>
            </h3>
            <ul className="space-y-3.5">
              {FOOTER_LINKS.shop.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-[13px] font-medium text-[#605A51] transition-colors hover:text-[#536B31]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="mb-5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#536B31]">
              Company
              <div className="mt-2 h-0.5 w-7 bg-[#536B31]/40"></div>
            </h3>
            <ul className="space-y-3.5">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-[13px] font-medium text-[#605A51] transition-colors hover:text-[#536B31]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h3 className="mb-5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#536B31]">
              Support
              <div className="mt-2 h-0.5 w-7 bg-[#536B31]/40"></div>
            </h3>
            <ul className="space-y-3.5">
              {FOOTER_LINKS.support.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-[13px] font-medium text-[#605A51] transition-colors hover:text-[#536B31]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Spacer Column for Illustration */}
          <div className="hidden lg:block"></div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-16 bg-[#F0EEE6]/80 backdrop-blur-sm py-6 relative z-10 border-t border-[#3B2208]/5">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[12px] font-medium text-[#605A51]/50">
            <span>© 2025 Leela's Spices. All rights reserved.</span>
            <span className="hidden md:inline text-[#605A51]/20">|</span>
            <span>Made with ❤️ in India.</span>
            <span className="hidden md:inline text-[#605A51]/20">|</span>
            <span>Bringing purity to every kitchen.</span>
          </div>

          <div className="flex items-center gap-5">
            <span className="text-[10px] font-bold text-[#605A51]/40 uppercase tracking-[0.15em]">We accept</span>
            <div className="flex flex-wrap items-center gap-2.5">
              {[
                { name: 'UPI' },
                { name: 'RAZORPAY' },
                { name: 'VISA' },
                { name: 'MASTERCARD' },
                { name: 'COD' }
              ].map((p) => (
                <span key={p.name} className="flex h-7 items-center px-3 rounded-lg border border-[#605A51]/10 bg-white/60 text-[9px] font-bold tracking-wider text-[#605A51]/70 shadow-sm">
                  {p.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

