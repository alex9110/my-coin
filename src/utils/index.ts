import {ICoinMapItem} from "../types/ICoinMapItem";
import {Filter} from "../types/Filter";
import {ICoinListingItem} from "../types/ICoinListingItem";

export const search = (coinsMap: ICoinMapItem[], what: string): string[] => {
  const maxFilterLength = 10;
  const result: Filter = [];

  coinsMap.forEach((item) => {
    const slug = item.slug.toLocaleLowerCase();
    const symbol = item.symbol.toLocaleLowerCase();
    const text = what.toLocaleLowerCase();
    if (slug.includes(text) || symbol.includes(text)) result.push(item.slug)
  });

  if (result.length > maxFilterLength) return result.splice(0, 10);
  return result;
};

export const alreadyTracked = (trackedList: ICoinListingItem[], coin: ICoinListingItem): boolean => {
  return !!trackedList.find(item => item.id === coin.id);
};

export const localCash = {
  getTrackedCoins: (): ICoinListingItem[] => {
    return JSON.parse(localStorage.getItem("coinsListing") || "[]");
  },
  setTrackedCoins: (coins: ICoinListingItem[]): void => {
    localStorage.setItem("coinsListing", JSON.stringify(coins));
  }
};