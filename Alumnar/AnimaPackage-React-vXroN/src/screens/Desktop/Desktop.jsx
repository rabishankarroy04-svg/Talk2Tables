import React from "react";
import { useWindowWidth } from "../../breakpoints";
import { NavBar } from "../../components/NavBar";
import "./style.css";

export const Desktop = () => {
  const screenWidth = useWindowWidth();

  return (
    <div className="desktop">
      <div
        className="div-2"
        style={{
          width: screenWidth < 1490 ? "1080px" : screenWidth >= 1490 ? "1490px" : undefined,
        }}
      >
        <div
          className="nav-bar-with-logo"
          style={{
            width: screenWidth < 1490 ? "976px" : screenWidth >= 1490 ? "1386px" : undefined,
          }}
        >
          <div className="text-wrapper-2">ALUMNAR</div>
          <NavBar className="nav-bar-instance" />
        </div>
        <div
          className="frame"
          style={{
            width: screenWidth < 1490 ? "765px" : screenWidth >= 1490 ? "1175px" : undefined,
          }}
        >
          <div className="frame-2">
            <div className="search-your-college">
              Search <br />
              Your College
            </div>
            <div className="search-bar">
              <div className="div-wrapper">
                <div className="text-wrapper-3">Search</div>
              </div>
            </div>
          </div>
          <div
            className="frame-3"
            style={{
              marginBottom: screenWidth < 1490 ? "-501.00px" : undefined,
            }}
          >
            <div className="rectangle-2" />
            <div className="rectangle-2" />
            <div className="rectangle-2" />
            <div className="rectangle-2" />
            <div className="rectangle-2" />
            <div className="rectangle-2" />
          </div>
        </div>
      </div>
    </div>
  );
};
