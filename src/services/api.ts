import axios from "axios";
import {ICoinMapItem} from "../types/ICoinMapItem";
import {ICoinListingItem} from "../types/ICoinListingItem";
import {Filter} from "../types/Filter";

const API_KEY = "";


interface IResult {
  error: null | Error;
}


interface IResultCoinsMap extends IResult {
  coinsMap: ICoinMapItem[]
}

export const fetchCoinsMap = async (): Promise<IResultCoinsMap> => {
  try {
    let result = await axios.get("cryptocurrency/map", {
      headers: {
        "X-CMC_PRO_API_KEY": API_KEY
      }
    });
    const data = result.data.data as ICoinMapItem[];
    return {
      error: null,
      coinsMap: data
    }
  } catch (e) {
    return {
      error: e.message ? e.message : e,
      coinsMap: []
    }
  }
};

interface IResultCoinsListing extends IResult {
  coinsListing: ICoinListingItem[]
}

export const fetchCoinsListing = async (filter: Filter): Promise<IResultCoinsListing> => {
  const filterStr = filter.join(",");
  try {
    let result = await axios.get("cryptocurrency/quotes/latest", {
      headers: {
        "X-CMC_PRO_API_KEY": API_KEY
      },
      params: {
        slug: filterStr
      }
    });
    const data = Object.values(result.data.data) as ICoinListingItem[];
    return {
      error: null,
      coinsListing: data
    }
  } catch (e) {
    return {
      error: e.message ? e.message : e,
      coinsListing: []
    }
  }
};

