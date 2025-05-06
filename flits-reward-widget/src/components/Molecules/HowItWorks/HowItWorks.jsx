import React, { useEffect } from "react";
import "./style.css";
import { Icon } from "../../Helpers/Icon/Icon";
import { useDispatch, useSelector } from "react-redux";
import { setPagesViewClicks } from "../../../redux/reducer/rewardWidgetSlice";

export const HowItWorks = (props) => {
  const pagesViewClicks = useSelector(
    (state) => state.rewardWidget.pagesViewClicks
  );
  const dispatch = useDispatch()
  useEffect(() => {
    if (pagesViewClicks?.fromReferView) {
      let element = document.querySelector(".flits-how-it-works-main");
      if (element) {
        element.scrollIntoView();
      }
      dispatch(setPagesViewClicks({
        ...pagesViewClicks,
        fromReferView: false
      }))
    }
  }, [pagesViewClicks, dispatch]);
  return (
    <div className="flits-how-it-works-main">
      <div className="flits-how-it-head">
        <div className="flits-how-it-head-left">
          <Icon
            icon={
              window?.flits_icons?.flits?.icons?.how_referral_work_indicator
            }
          ></Icon>
          <p>{props.title}</p>
        </div>
        <div
          className="flits-how-it-head-close"
          onClick={props.howItWorksClose}
        >
          <Icon icon={window?.flits_icons?.flits?.icons?.close_button}></Icon>
        </div>
      </div>
      <div className="flits-how-it-body">
        <div className="flits-line-container">
          <div className="flits-number">1</div>
          <div className="flits-line"></div>
          <div className="flits-number">2</div>
          <div className="flits-line"></div>
          <div className="flits-number">3</div>
        </div>
        <div className="flits-line-words">
          <div className="flits-line-word">{props.stepOne}</div>
          <div
            className="flits-line-word"
            dangerouslySetInnerHTML={{ __html: props.stepTwo }}
          />
          <div
            className="flits-line-word"
            dangerouslySetInnerHTML={{ __html: props.stepThree }}
          />
        </div>
      </div>
    </div>
  );
};
