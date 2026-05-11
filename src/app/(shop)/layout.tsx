import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shop All Spices',
  description:
    'Browse our curated collection of premium Indian spices — whole spices, ground spices, and signature blends sourced from the finest farms across India.',
};

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
