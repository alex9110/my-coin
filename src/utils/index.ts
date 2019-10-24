import {ICoinMapItem} from "../types/ICoinMapItem";
import {Filter} from "../types/Filter";
import {ICoinListingItem} from "../types/ICoinListingItem";
import {SortBy} from "../types/SortBy";

export const search = (coinsMap: ICoinMapItem[], what: string): string[] => {
  if (what.length < 1) return [];
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

export const sort = (arr: ICoinListingItem[], by?: SortBy): ICoinListingItem[] => {
  const sortedArr = [...arr];

  if (by === "price") sortedArr.sort((a, b) => b.quote.USD.price - a.quote.USD.price);
  if (by === "reverse") sortedArr.reverse();
  if (by === "symbol" || by === "name") sortedArr.sort((a, b) => {
    const first = a[by].toLocaleLowerCase();
    const second = b[by].toLocaleLowerCase();
    if (first < second) return -1;
    if (first > second) return 1;
    return 0;
  });

  return sortedArr;
};