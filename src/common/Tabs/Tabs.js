import React from "react";

import { classNames } from "../../utilities/css";

import Styles from "./Tabs.module.scss";

export function Tabs({ tabs = [], selected, onSelect, children }) {

  const tabsItem = tabs.map((item, index) => (
    <li className={Styles.Tabs__Item} key={index}>
      <div className={classNames(
          Styles.Tabs__Tab,
          selected === item.panelID && Styles['Tabs__Tab--selected'])
          } 
        onClick={() => onSelect(item.panelID)}>
        <span>{item.content}</span>
      </div>
    </li>
  ));

  return (
    <div className={Styles.Tabs}>
      <div className={Styles.Tabs__Wrapper}>
        <ul className={Styles.Tabs__List}>{tabsItem}</ul>
      </div>
      <div className={Styles.Tabs__Panel}>{children}</div>
    </div>
  );
}
