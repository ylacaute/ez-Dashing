import React from 'react';
import {number} from "@storybook/addon-knobs";

const Resizable = ({children, width = 300, height = 350}) => (
  <div style={{
    width: number("Container width", width),
    height: number("Container height", height),
    border: "2px solid #222",
    padding: "10px",
    margin: "auto",
    resize: "both",
    overflow: "hidden"
  }}>
    {children}
  </div>
);

export default Resizable;