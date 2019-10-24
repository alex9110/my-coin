import React, {FC} from "react";
import {ICoinListingItem} from "../types/ICoinListingItem";
import {connect} from "react-redux";
import {AppState} from "../store/configureStore";
import {ThunkDispatch} from "redux-thunk";
import {AppActions} from "../types/actions";
import Sort from "./Sort";
import {bindActionCreators} from "redux";
import {deleteTrackedCoins} from "../actions/coins";
import {Button, List, Tooltip, Card} from "antd";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  coinsListing: ICoinListingItem[],
}

const TrackedCoinsList: FC<Props & LinkDispatchProps> = (props: Props & LinkDispatchProps) => {

  const deleteCurrentCoin = (e: React.MouseEvent<HTMLElement, MouseEvent>): void => {
    e.preventDefault();
    e.stopPropagation();
    // if (e.target instanceof Element) {
    const id = e.currentTarget.getAttribute("data-coin_id");
    if (id) props.deleteTrackedCoins(+id);
    // }
  };



  return (
    <div>
      <Card size="small" title="Tracked Coins" bordered={true} >
        <Sort/>
        <List style={{width: "400px"}}
          dataSource={props.coinsListing}
          renderItem={item => (
            <List.Item key={item.id} style={{justifyContent: "center"}} actions={[
              <Tooltip title="Remove coin from tracked list." placement="right">
                <Button size="small" type="danger" ghost data-coin_id={item.id} onClick={deleteCurrentCoin}>Del</Button>
              </Tooltip>]}
            >
              <List.Item.Meta style={{fontSize: "15px", alignSelf: "left"}} avatar={item.symbol}/>
              <div style={{display: "flex", width:"100%", justifyContent: "space-between", alignItems: "center"}}>
                <span style={{fontSize: "12.5px"}}>{item.quote.USD.price} $</span>
                <span style={{fontSize: "14px"}}>{item.name}</span>
              </div>

            </List.Item>
          )}
        />
      </Card>
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
