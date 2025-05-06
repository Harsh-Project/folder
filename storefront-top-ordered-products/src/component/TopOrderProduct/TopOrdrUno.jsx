import React from "react";
import { GlobalStore } from "redux-micro-frontend";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { handleClick } from "../Event/ClickEvent";
import { handleChange } from "../Event/Change";
import { handleAddToCartClick } from "../Event/AddToCart";

export const TopOrdrUno = (props) => {
  const { item } = props
  const dispatch = useDispatch();
  const getStore = GlobalStore.Get();
  const NumberEditTopOrder =
    window.UnoDuoComponent("NumberEditTopOrder");
    const SetLocalStorage = getStore._globalActions.Helpers[0].SetLocalStorage;
  const GetLocalStorage = getStore._globalActions.Helpers[0].GetLocalStorage;
  const AddToCartTopOrder =
    window.UnoDuoComponent("AddToCartTopOrder");
    const setTopOrderProductSnackBarMode =
    window.topOrderProductState("setTopOrderProductSnackBarMode");
    const API =
    getStore._globalActions.API[0].API;
  const SelectTopOrder =
    window.UnoDuoComponent("SelectTopOrder");
    const useTranslationLanguage = getStore._globalActions.Helpers[0].useTranslationLanguage
    const TopOrderWrapper =
    window.UnoDuoComponent("TopOrderWrapper");
  const TopOrderCard = window.UnoDuoComponent("TopOrderCard");
  const setOrderField =
    window.topOrderProductState("setOrderField");
  const TopOrderAction =
    window.UnoDuoComponent("TopOrderAction");
    const setTopOrderProductSnackBarMessage =
    window.topOrderProductState("setTopOrderProductSnackBarMessage");
  const orderField = useSelector(
    (state) => state.storeFrontTopOrderProduct.orderField
  );
  const { t } = useTranslationLanguage()
  const handleClickEvent = (value) => {
    handleClick(item, dispatch, setOrderField, orderField, value)
  };
  const handleChangeEvent = (e) => {
    handleChange(setOrderField, dispatch, orderField, e ,item)
  };
  const handleAddToCartClickEvent = async () => {
    handleAddToCartClick(setTopOrderProductSnackBarMode, API, setTopOrderProductSnackBarMessage, orderField, t , item, dispatch, GetLocalStorage, SetLocalStorage )
  };
  return (
    <TopOrderCard item={item}>
      <TopOrderAction item={item}>
      <TopOrderWrapper>
        {item?.length >= 1 && item[0]?.product_title === "Default Title" ? null :  <SelectTopOrder item={item} handleChange={handleChangeEvent}/>}
        <NumberEditTopOrder onClickEvent={handleClickEvent} item={item} dispatch={dispatch} message={setTopOrderProductSnackBarMessage} mode={setTopOrderProductSnackBarMode}/>
        </TopOrderWrapper>
        <AddToCartTopOrder item={item} handleAddToCartClick={handleAddToCartClickEvent}/>
      </TopOrderAction>
    </TopOrderCard>
  );
};
