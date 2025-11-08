const currencyFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
});

export function formatCurrency(amount: number): string {
  return currencyFormatter.format(amount);
}

