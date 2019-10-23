import React, {FC} from "react";
import {ICoinListingItem} from "../types/ICoinListingItem";
import {connect} from "react-redux";
import {AppState} from "../store/configureStore";
import {ThunkDispatch} from "redux-thunk";
import {AppActions} from "../types/actions";
import {bindActionCreators} from "redux";
import {deleteTrackedCoins} from "../actions/coins";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  coinsListing: ICoinListingItem[],
}

const TrackedCoinsList: FC<Props & LinkDispatchProps> = (props: Props & LinkDispatchProps) => {

  const deleteCurrentCoin = (e: React.MouseEvent<HTMLElement, MouseEvent>): void => {
    e.preventDefault();
    e.stopPropagation();
    if (e.target instanceof Element) {
      const id = e.target.getAttribute("data-coin_id");
      if (id) props.deleteTrackedCoins(+id);
    }
  };

  return (
    <div>
      <ul onClick={deleteCurrentCoin}>
        {props.coinsListing.map(item => {
          return (
            <li key={item.id}>
              <div>{JSON.stringify(item.symbol)}</div>
              <button data-coin_id={item.id}>Delete</button>
            </li>
          )
        })}
      </ul>
    </div>
  )
};


interface LinkDispatchProps {
  deleteTrackedCoins: (id: number) => void;
}

const mapStateToProps = (state: AppState) => ({});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>): LinkDispatchProps => ({
  deleteTrackedCoins: bindActionCreators(deleteTrackedCoins, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(TrackedCoinsList);
