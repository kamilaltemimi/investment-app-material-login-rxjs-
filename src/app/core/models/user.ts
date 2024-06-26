import { Stock } from "./stock"

export interface User {
  id: string
  nickname: string
  password: string
  balance: number
  investedFunds: number
  stocks: Stock[]
  portfolioValue: number
  soldStockAmount?: number
  soldStockName?: string
  boughtStockAmount?: number
  boughtStockName?: string
}