const PROFIT_PERCENTAGES = [2, 4, 5, 8, 10];

export function calculateProfit(wholesaleRate) {
  const result = {};

  PROFIT_PERCENTAGES.forEach((percent) => {
    const sellingPrice =
      wholesaleRate + (wholesaleRate * percent) / 100;

    result[percent] = {
      sellingPrice: Number(sellingPrice.toFixed(2)),
      profit: Number((sellingPrice - wholesaleRate).toFixed(2)),
    };
  });

  return result;
}
