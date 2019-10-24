import React, {useState} from "react";
import {AppState} from "../store/configureStore";
import {ThunkDispatch} from "redux-thunk";
import {AppActions} from "../types/actions";
import {bindActionCreators} from "redux";
import {sorTrackedCoins} from "../actions/coins";
import {connect} from "react-redux";
import {SortBy} from "../types/SortBy";
import {Checkbox} from 'antd';

type OwnProps = {}
type Props = LinkDispatchProps;

const Sort = (props: Props & OwnProps) => {
  const [checked, onChangeChecked] = useState(false);
  const onSort = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    onChangeChecked(false);
    props.sorTrackedCoins(e.currentTarget.innerHTML as SortBy);
  };
  const onChange = () => {
    onChangeChecked(!checked);
    props.sorTrackedCoins("reverse");
  };

  const buttons = ["symbol", "price", "name"];

  return (
    <div>
      <span>Sort by</span>
      <div style={{display: "flex"}}>
        <ul style={{display: "flex", margin:0}}>
          {buttons.map(item => {
            return(
              <li style={{padding: "2px 8px 2px 0", cursor: "pointer"}} key={item} onClick={onSort}>{item}</li>
            )
          })}
        </ul>
        <div style={{margin: "auto 0 auto auto"}}>
          <Checkbox
            onChange={onChange}
            checked={checked}
          >desc</Checkbox>
        </div>
      </div>
    </div>
  )
};

interface LinkDispatchProps {
  sorTrackedCoins: (by: SortBy) => void;
}

const mapStateToProps = (state: AppState) => ({});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>): LinkDispatchProps => ({
  sorTrackedCoins: bindActionCreators(sorTrackedCoins, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sort);