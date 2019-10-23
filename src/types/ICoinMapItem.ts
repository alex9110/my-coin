export interface ICoinMapItem {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  is_active: 0 | 1;
  first_historical_data: string;
  last_historical_data: string;
  platform: {} | null;
}