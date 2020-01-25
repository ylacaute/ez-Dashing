import React from 'react';
import {number} from "@storybook/addon-knobs";

const Resizable = ({children, width = 300, height = 350, className}) => (
  <div style={{
    width: width,
    height: height,
    border: "2px solid #222",
    padding: "10px",
    resize: "both",
    overflow: "hidden",
    display: "flex"
  }} className={className}>
    {children}
  </div>
);

export default Resizable;