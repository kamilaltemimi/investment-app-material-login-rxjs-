export interface Stock {
  stockData: any;
  symbol: string,
  name: string,
  price: number,
  changesPercentage: number,
  change: number,
  dayLow: number,
  dayHigh: number,
  yearHigh: number,
  yearLow: number,
  marketCap: number,
  exchange: string,
  volume: number,
  avgVolume: number,
  open: number,
  previousClose: number,
  eps: number,
  pe: number,
  earningsAnnouncement: string,
  sharesOutstanding: number,
  timestamp: number,
  amount?: number,
  value?: number,
  boughtFor?: number,
  valueWhenBought?: number
}