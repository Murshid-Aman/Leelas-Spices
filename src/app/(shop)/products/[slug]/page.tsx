import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { getProductBySlug, getProducts } from '@/lib/api';
import { APP_NAME, APP_URL, ROUTES } from '@/lib/constants';
import { ProductDetail } from '@/components/product/ProductDetail';
import { StructuredData } from '@/components/seo/StructuredData';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return { title: 'Product Not Found' };
  }

  return {
    title: `${product.name} — ${APP_NAME}`,
    description: product.shortDescription,
    openGraph: {
      title: `${product.name} — ${APP_NAME}`,
      description: product.shortDescription,
      images: [{ url: `${APP_URL}${product.image}`, alt: product.name }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.shortDescription,
    },
  };
}

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({ slug: product.slug }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="bg-[#fdfbf8] min-h-screen">
      <div className="mx-auto max-w-[1600px] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      {/* Breadcrumbs */}
      <nav className="mb-6 flex items-center gap-1.5 text-sm text-[#4A3020]/70" aria-label="Breadcrumb">
        <Link href={ROUTES.HOME} className="hover:text-[#6B3D1E] transition-colors">
          Home
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link href={ROUTES.PRODUCTS} className="hover:text-[#6B3D1E] transition-colors">
          Shop
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="font-medium text-[#3B2208]">{product.name}</span>
      </nav>

      <StructuredData product={product} />
      <ProductDetail product={product} />
    </div>
    </div>
  );
}
