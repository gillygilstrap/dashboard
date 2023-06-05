import React, { useState, createContext } from "react";
import Header from "./Header";
import SideNav from "./SideNav";

import { timePeriods, standardDateFormat } from "../constants";
import { generateStats } from "../utils/generateStats";
import { getRange } from "../utils/getRange";
import { randomYearValues } from "../utils/randomYearValues";
import { buildLineChartData } from "../utils/buildLineChartData";
import { buildBarChartData } from "../utils/buildBarChartData";
import { generateOrders } from "../utils/generateOrders";

import { Outlet } from "react-router-dom";
import moment from "moment";

export const AppContext = createContext<any>(null);

const fakeStats = generateStats();
const today = moment(Date.now()).format(standardDateFormat);
const randomPreviousYearValues = randomYearValues();
const orders = generateOrders();

let onLoadTraffic = 0;
let onLoadRegistrations = 0;
let onLoadEmailsCollected = 0;
let onLoadProductsSoldCount = 0;
let onLoadSalesRevenue = 0;

// Build on load fake data
const initialRange = getRange(fakeStats, timePeriods.THIRTY_DAYS);
initialRange.forEach((statsObj) => {
  onLoadTraffic = onLoadTraffic + statsObj!.traffic;
  onLoadRegistrations = onLoadRegistrations + statsObj!.registrations;
  onLoadEmailsCollected = onLoadEmailsCollected + statsObj!.emailsCollected;
  onLoadProductsSoldCount =
    onLoadProductsSoldCount + statsObj!.products.salesCount;
  onLoadSalesRevenue = onLoadSalesRevenue + statsObj!.products.totalSalesAmount;
});

const onloadLineChartData = buildLineChartData(
  initialRange,
  timePeriods.THIRTY_DAYS
);
const onloadBarChartData = buildBarChartData(
  initialRange,
  timePeriods.THIRTY_DAYS
);

const Layout: React.FC = () => {
  // App State => Dates
  const [showPreviousDateRange, setShowPreviousDateRange] = useState(false);
  const [currentRange, setCurrentRange] = useState(timePeriods.THIRTY_DAYS);

  const [minDateInCurrentRange, setMinDateInCurrentRange] = useState(
    moment(today, standardDateFormat)
      .subtract(29, `days`)
      .format(standardDateFormat)
  );
  const [maxDateInCurrentRange, setMaxDateInCurrentRange] = useState(today);
  const [minDateInPreviousRange, setMinDateInPreviousRange] = useState(
    moment(Date.now()).subtract(59, `days`).format(standardDateFormat)
  );
  const [maxDateInPreviousRange, setMaxDateInPreviousRange] = useState(
    moment(Date.now()).subtract(30, `days`).format(standardDateFormat)
  );

  // App State => Chart Data
  const [lineChartData, setLineChartData] = useState(onloadLineChartData);
  const [barChartData, setBarChartData] = useState(onloadBarChartData);

  // App State => Stats
  const [totalTraffic, setTotalTraffic] = useState(onLoadTraffic);
  const [totalRegistrations, setTotalRegistrations] =
    useState(onLoadRegistrations);
  const [totalEmailsCollected, setTotalEmailsCollected] = useState(
    onLoadEmailsCollected
  );
  const [totalProductsSoldCount, setTotalProductsSoldCount] = useState(
    onLoadProductsSoldCount
  );
  const [totalSalesRevenue, setTotalSalesRevenue] =
    useState(onLoadSalesRevenue);

  // AppContext Values
  const contextValue = {
    // Date Ranges
    showPreviousDateRange,
    setShowPreviousDateRange,
    currentRange,
    setCurrentRange,
    minDateInCurrentRange,
    setMinDateInCurrentRange,
    maxDateInCurrentRange,
    setMaxDateInCurrentRange,
    minDateInPreviousRange,
    setMinDateInPreviousRange,
    maxDateInPreviousRange,
    setMaxDateInPreviousRange,

    // Stats
    totalTraffic,
    setTotalTraffic,
    totalRegistrations,
    setTotalRegistrations,
    totalEmailsCollected,
    setTotalEmailsCollected,
    totalProductsSoldCount,
    setTotalProductsSoldCount,
    totalSalesRevenue,
    setTotalSalesRevenue,
    fakeStats,
    randomPreviousYearValues,

    // Chart Data
    lineChartData,
    onloadLineChartData,
    setLineChartData,
    barChartData,
    onloadBarChartData,
    setBarChartData,

    // Orders
    orders,
  };

  return (
    <AppContext.Provider value={contextValue}>
      <div className="App font-sans min-h-screen w-full">
        <Header />
        <div className="main flex w-full h-full top-20">
          <SideNav />
          <div className="min-h-screen pb-20 w-full px-8 pt-20 bg-slate-100 md:ml-32">
            <Outlet />
          </div>
        </div>
      </div>
    </AppContext.Provider>
  );
};

export default Layout;
