import React, { useState } from "react";
import "./style.scss";

const SwitchTab = ({ data, onTabChange }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const activeTab = (tab, i) => {
    setTranslateX(i * 90);
    setTimeout(() => {
      setSelectedTab(i);
    }, 100);
    onTabChange(tab, i);
  };
  return (
    <nav class="switchTab">
      <ul class="switchTab__list">
        {data.map((tab, i) => {
          return (
            <li
              class={`switchTab__item ${selectedTab === i ? "isActive" : ""}`}
              key={i}
              onClick={() => activeTab(tab, i)}
            >
              {tab}
            </li>
          );
        })}
      </ul>
      <div class="switchTab__slider">
        <div
          class="switchTab__slider-rect"
          style={{ transform: `translateX(${translateX}px)` }}
        ></div>
      </div>
    </nav>
  );
};

export default SwitchTab;
