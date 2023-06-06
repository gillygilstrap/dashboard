import { useState } from "react";
import { NavLink } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const barsIcon = <FontAwesomeIcon icon={faBars} />;


export default function Header() {
  const [isHamburgerDropdownOpen, setIsHamburgerDropdownOpen] = useState(false);

  const handleHamburgerClick = () => {
    setIsHamburgerDropdownOpen(!isHamburgerDropdownOpen);
  };

  const handleHamburgerItemClick = () => {
    setIsHamburgerDropdownOpen(!isHamburgerDropdownOpen);
    window.scrollTo(0, 0);
  };
  
  const handleLogOutclick = () => {
    alert(`...you can't log out if you never logged in.`);
    setIsHamburgerDropdownOpen(false);
  };

  return (
    <div className="header flex flex-row justify-between w-full h-20 bg-slate-300 md:pl-12 shadow-sm fixed z-10">
      <NavLink to="/" className="logo bg-slate-300 my-auto text-2xl tracking-wider font-bold text-slate-800 rounded-lg hover:cursor-pointer pl-6" onClick={() => window.scrollTo(0, 0)}>
        Sales Dashboard
      </NavLink>

      <div
        className="hidden md:block text-slate-700 font-normal tracking-wider my-auto mr-2 md:mr-6 p-4 hover:cursor-pointer hover:scale-105 hover:text-slate-800"
        onClick={() => handleLogOutclick()}
      >
        Log Out
      </div>

      <div
        className={`hamburger text-2xl text-slate-800 rounded-md md:hidden mr-4 my-auto px-4 py-3 hover:cursor-pointer hover:bg-slate-400 ${
          isHamburgerDropdownOpen ? "bg-slate-400" : ""
        }`}
        onClick={() => handleHamburgerClick()}
      >
        {barsIcon}
      </div>

      <div
        className={`${
          isHamburgerDropdownOpen ? "block" : "hidden"
        } hamburger-dropdown w-full bg-slate-300 absolute mt-20 flex flex-col border-t-2 border-slate-400 text-xl tracking-wider`}
      >
        <NavLink
          to="/"
          className="w-full h-14 pl-6 hover:cursor-pointer border-b border-slate-400 flex hover:bg-slate-400"
          onClick={() => handleHamburgerItemClick()}
        >
          <div className="my-auto">Stats</div>
        </NavLink>

        <NavLink
          to="orders"
          className="w-full h-14 pl-6 hover:cursor-pointer border-b border-slate-400 flex hover:bg-slate-400"
          onClick={() => handleHamburgerItemClick()}
        >
          <div className="my-auto">Orders</div>
        </NavLink>
        <NavLink
          to="/"
          className="w-full h-14 pl-6 hover:cursor-pointer border-b border-slate-400 flex hover:bg-slate-400"
          onClick={() => handleHamburgerItemClick()}
        >
          <div className="my-auto">Users</div>
        </NavLink>
        <div
          className="w-full h-14 pl-6 hover:cursor-pointer border-b border-slate-400 flex hover:bg-slate-400 text-slate-600"
          onClick={() => handleLogOutclick()}
        >
          <div className="my-auto">Log Out</div>
        </div>
      </div>
    </div>
  );
}
