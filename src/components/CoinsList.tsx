import React, {FC, useState} from "react";
import {ICoinListingItem} from "../types/ICoinListingItem";
import {connect} from "react-redux";
import {AppState} from "../store/configureStore";
import {ThunkDispatch} from "redux-thunk";
import {AppActions} from "../types/actions";
import {bindActionCreators} from "redux";
import {addCoinToTracked} from "../actions/coins";


interface Props extends React.HTMLAttributes<HTMLDivElement> {
  coinsListing: ICoinListingItem[],
  addCoinToTracked: (coin: ICoinListingItem) => void,
  checkIfAlreadyTracked: (clickedCoin: ICoinListingItem) => boolean
}


const CoinsList: FC<Props> = (props: Props) => {

  const [note, showHideNote] = useState(false);

  const coinChose = (e: React.MouseEvent<HTMLElement, MouseEvent>, coin: ICoinListingItem): void => {
    e.preventDefault();
    e.stopPropagation();
    if (!props.checkIfAlreadyTracked(coin)){
      props.addCoinToTracked(coin)
    }else {
      console.log("Уже существует");
      showHideNote(true);
      setTimeout(()=>{
        showHideNote(false)
      }, 1000)
    }
  };

  return (
    <div>
      {note && <div>Уже существует</div>}
      <ul>
        {props.coinsListing.map(item => <li key={item.id} onClick={(e) => {
          coinChose(e, item)
        }}>{item.symbol}</li>)}
      </ul>
    </div>
  )
};

interface LinkStateProps {
  coinsListing: ICoinListingItem[];
}

interface LinkDispatchProps {
  addCoinToTracked: (coin: ICoinListingItem) => void;
}

const mapStateToProps = (state: AppState): LinkStateProps => ({
  coinsListing: state.coins.coinsListing
});


const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>): LinkDispatchProps => ({
  addCoinToTracked: bindActionCreators(addCoinToTracked, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CoinsList);