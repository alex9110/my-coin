import {ICoinMapItem} from "./ICoinMapItem";
import {ICoinListingItem} from "./ICoinListingItem";
import {Filter} from "./Filter";

export interface ICoins {
  coinsMap: ICoinMapItem[],
  filter: Filter,
  coinsListing: ICoinListingItem[],
  trackedCoins: ICoinListingItem[]
}