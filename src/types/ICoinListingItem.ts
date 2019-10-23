export interface ICoinListingItem {
  id: number,
  name: string
  symbol: string,
  [key: string]: any
  quote: {
    USD: {
      price: number,
      [key: string]: any
    },
    [key: string]: any
  },
}