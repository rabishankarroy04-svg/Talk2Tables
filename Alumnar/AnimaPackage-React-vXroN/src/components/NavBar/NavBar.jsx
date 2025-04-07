/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";
import "./style.css";

export const NavBar = ({ className }) => {
  return (
    <div className={`nav-bar ${className}`}>
      <div className="text-wrapper">Financial Aid</div>
      <div className="text-wrapper">Events</div>
      <div className="text-wrapper">Contact us</div>
      <div className="group">
        <div className="overlap-group">
          <div className="rectangle" />
          <div className="sign-up">Sign&nbsp;&nbsp;Up</div>
        </div>
      </div>
      <div className="overlap-wrapper">
        <div className="overlap-group">
          <div className="div" />
          <div className="sign-in">Sign&nbsp;&nbsp;In</div>
        </div>
      </div>
    </div>
  );
};
