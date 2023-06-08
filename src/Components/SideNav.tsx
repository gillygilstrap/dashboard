import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTable,
  faChartSimple,
  faUser
} from "@fortawesome/free-solid-svg-icons";

import { AppContext } from "../Components/pages/Layout";
import { tabs } from "../constants";
import { isCurrentTab } from "../utils/isCurrentTab";


const tableIcon = <FontAwesomeIcon icon={faTable} />;
const chartIcon = <FontAwesomeIcon icon={faChartSimple} />;
const userIcon = <FontAwesomeIcon icon={faUser} />;

export default function SideVav() {

  const { currentTab, setCurrentTab } = useContext(AppContext);

  const handleTabClick = (tab: string) => {
    setCurrentTab(tab);
    window.scrollTo(0, 0);
  };


  return (
    <div className="w-32 h-full hidden md:flex bg-slate-700 flex flex-col text-white fixed top-20">
      <NavLink
        to="/"
        className="w-full text-center mx-auto mt-12 hover:cursor-pointer hover:text-slate-200"
        onClick={() => handleTabClick(tabs.STATS)}
      >
        <div className={`py-4 icon-container flex flex-col w-full bg-slate-100 ${isCurrentTab(currentTab, tabs.STATS) ? 'bg-slate-400 text-slate-700 hover:text-slate-800' : 'bg-slate-700 hover:text-slate-300'}`}>
          <div className="icon text-5xl">{chartIcon}</div>
          <div className="label text-center mt-1">Stats</div>
        </div>
      </NavLink>

      <NavLink
        to="orders"
        className={`w-full py-4 text-center mx-auto hover:cursor-pointer  ${isCurrentTab(currentTab, tabs.ORDERS) ? 'bg-slate-400 text-slate-700 hover:text-slate-800' : 'bg-slate-700 hover:text-slate-300'}`}
        onClick={() => handleTabClick(tabs.ORDERS)}
      >
        <div className="icon-container flex flex-col">
          <div className="icon text-5xl">{tableIcon}</div>
          <div className="label text-center mt-1">Orders</div>
        </div>
      </NavLink>
      <NavLink
        to="users"
        className={`w-full py-4 text-center mx-auto hover:cursor-pointer ${isCurrentTab(currentTab, tabs.USERS) ? 'bg-slate-400 text-slate-700 hover:text-slate-800' : 'bg-slate-700 hover:text-slate-300'}`}
        onClick={() => handleTabClick(tabs.USERS)}
      >
        <div className="icon-container flex flex-col">
          <div className="icon text-5xl">{userIcon}</div>
          <div className="label text-center mt-1">Users</div>
        </div>
      </NavLink>
    </div>
  );
}
