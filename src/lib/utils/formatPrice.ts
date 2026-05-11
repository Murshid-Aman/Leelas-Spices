import { CURRENCY } from '@/lib/constants';

export function formatPrice(price: number): string {
  return `${CURRENCY}${price.toLocaleString('en-IN', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;
}
