export const planPrices: Record<string, number> = {
  DIET: 30000,
  PROTEIN: 40000,
  ROYALE: 60000,
};

export const calculateTotalPrice = (
  planType: string,
  mealCount: number,
  dayCount: number
): number => {
  const price = planPrices[planType];
  return Math.round(price * mealCount * dayCount * 4.3);
};