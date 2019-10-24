import React from "react";
import {connect} from "react-redux";
import {startGetCoinsListing, startGetCoinsMap, startUpdateTrackedCoins, updateFilter} from "../actions/coins";
import {AppState} from "../store/configureStore";
import {bindActionCreators} from "redux";
import {AppActions} from "../types/actions";
import {ThunkDispatch} from "redux-thunk";
import {search} from "../utils";
import {ICoinMapItem} from "../types/ICoinMapItem";
import CoinsList from "./CoinsList";
import {Filter} from "../types/Filter";
import TrackedCoinsList from "./TrackedCoinsList"
import {ICoinListingItem} from "../types/ICoinListingItem";
import {alreadyTracked} from "../utils";
import {Input} from 'antd';


const style: any = {
  display: "flex",
  maxWidth: "100%",
  flexWrap: "wrap",
  justifyContent: "space-between"
};

interface HomePageProps {
  id?: string;
  color?: string;
}

interface HomePageState {
  searchInput: string;
  loading: boolean;
}

type Props = HomePageProps & LinkStateProps & LinkDispatchProps;

export class HomePagePage extends React.PureComponent<Props, HomePageState> {

  static updateFilterTimeout = 300;
  updateFilterTimeoutId: any;

  constructor(props: Props) {
    super(props);
    this.state = {
      searchInput: "",
      loading: false
    }
  }

  componentDidMount(): void {
    this.props.getCoinsMap();
    this.props.updateTrackedCoins(this.props.trackedCoins);
  }

  onChangeSearchInput = (e: React.FormEvent<HTMLInputElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({loading: true});
    const inputValue = e.currentTarget.value;
    this.setState({
      searchInput: inputValue
    }, () => {

      if (this.updateFilterTimeoutId) clearTimeout(this.updateFilterTimeoutId);

      this.updateFilterTimeoutId = setTimeout(() => {
        const filter = search(this.props.coinsMap, inputValue);
        this.props.updateFilter(filter);
        this.props.getCoinsListing(filter);
        this.setState({loading: false});
      }, HomePagePage.updateFilterTimeout)

    })
  };

  checkIfAlreadyTracked = (clickedCoin: ICoinListingItem) => alreadyTracked(this.props.trackedCoins, clickedCoin);


  render() {
    return (
      <div style={style}>
        <form action="#">
          <Input.Search style={{paddingRight: "8px"}}
            placeholder="Coin name or symbol"
            value={this.state.searchInput}
            onChange={this.onChangeSearchInput}
          />
          <CoinsList checkIfAlreadyTracked={this.checkIfAlreadyTracked}/>
        </form>
        <TrackedCoinsList coinsListing={this.props.trackedCoins}/>
      </div>
    );
  }
}

interface LinkStateProps {
  coinsMap: ICoinMapItem[];
  trackedCoins: ICoinListingItem[]
}

interface LinkDispatchProps {
  getCoinsMap: () => void;
  updateFilter: (filter: Filter) => void;
  getCoinsListing: (filter: Filter) => void;
  updateTrackedCoins: (coinsListing: ICoinListingItem[]) => void;
}

const mapStateToProps = (state: AppState, ownProps: HomePageProps): LinkStateProps => ({
  coinsMap: state.coins.coinsMap,
  trackedCoins: state.coins.trackedCoins
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, ownProps: HomePageProps) => ({
  getCoinsMap: bindActionCreators(startGetCoinsMap, dispatch),
  updateFilter: (filter: Filter) => dispatch(updateFilter(filter)),
  getCoinsListing: bindActionCreators(startGetCoinsListing, dispatch),
  updateTrackedCoins: bindActionCreators(startUpdateTrackedCoins, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePagePage);
