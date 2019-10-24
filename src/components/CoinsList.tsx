import React, {FC, useState} from "react";
import {ICoinListingItem} from "../types/ICoinListingItem";
import {connect} from "react-redux";
import {AppState} from "../store/configureStore";
import {ThunkDispatch} from "redux-thunk";
import {AppActions} from "../types/actions";
import {bindActionCreators} from "redux";
import {addCoinToTracked} from "../actions/coins";
import {Button, Tooltip, List, Alert, notification} from "antd";
import {ArgsProps} from "antd/lib/notification";


interface Props extends React.HTMLAttributes<HTMLDivElement> {
  coinsListing: ICoinListingItem[],
  addCoinToTracked: (coin: ICoinListingItem) => void,
  checkIfAlreadyTracked: (clickedCoin: ICoinListingItem) => boolean
}


const CoinsList: FC<Props> = (props: Props) => {


  const coinChose = (e: React.MouseEvent<HTMLElement, MouseEvent>, coin: ICoinListingItem): void => {
    e.preventDefault();
    e.stopPropagation();
    if (!props.checkIfAlreadyTracked(coin)) {
      props.addCoinToTracked(coin);
      openNotification("sux", {message: 'Successfully added.'})
    } else openNotification("warn", {message: 'Already exists'})
  };

  const openNotification = (type: "sux" | "warn", config: ArgsProps) => {
    const conf:ArgsProps = {
      placement: "bottomLeft",
      duration: 1,
      ...config
    };
    type === "sux"? notification.success(conf): notification.warning(conf)
  };

  return (
    <div>
      <List style={{width: "300px", maxWidth:"100%"}}
        dataSource={props.coinsListing}
        renderItem={item => (
          <List.Item key={item.id} actions={[
            <Tooltip title="Add coin to tracked list. " placement="right">
              <Button size="small" type="primary" ghost data-coin_id={item.id} onClick={(e) => {
                coinChose(e, item)
              }}>Add</Button>
            </Tooltip>]}
          >
            <List.Item.Meta style={{fontSize: "15px", alignSelf: "left"}} avatar={item.symbol}/>
            <List.Item.Meta style={{fontSize: "13px", alignSelf: "left"}} avatar={item.name}/>
          </List.Item>
        )}
      />
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