import "./App.css";
import Header from "./Components/Header";
import SideNav from "./Components/SideNav";
import StatCard from "./Components/StatCard";
import GraphCard from "./Components/GraphCard";
import OrdersTable from "./Components/OrdersTable";
import { generateStats } from "./utils/generateStats";
import { getRange } from "./utils/getRange";
import { getPreviousCount } from "./utils/getPreviousCount";
import { timePeriods, standardDateFormat } from "./constants";

import { useState } from "react";
import moment from "moment";
// import userDataJson from "./userData.json";

// console.table(JSON.parse(JSON.stringify(userDataJson))[0])

const fakeStats = generateStats();
const today = moment(Date.now()).format(standardDateFormat);

let onLoadTraffic = 0;
let onLoadRegistrations = 0;
let onLoadEmailsCollected = 0;
let onLoadProductsSoldCount = 0;
let onLoadSalesRevenue = 0;

// Build on load fake data
getRange(fakeStats, timePeriods.THIRTY_DAYS).forEach((statsObj) => {
  onLoadTraffic = onLoadTraffic + statsObj!.traffic;
  onLoadRegistrations = onLoadRegistrations + statsObj!.registrations;
  onLoadEmailsCollected = onLoadEmailsCollected + statsObj!.emailsCollected;
  onLoadProductsSoldCount =
    onLoadProductsSoldCount + statsObj!.products.salesCount;
  onLoadSalesRevenue = onLoadSalesRevenue + statsObj!.products.totalSalesAmount;
});

function App() {
  // State
  const [currentRange, setCurrentRange] = useState(timePeriods.THIRTY_DAYS);
  const [minDateInCurrentRange, setMinDateInCurrentRange] = useState(
    moment(today, standardDateFormat).subtract(29, `days`).format(standardDateFormat)
  );
  const [maxDateInCurrentRange, setMaxDateInCurrentRange] = useState(today);
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

  // Methods
  const handDateRangeChange = (val: string) => {
    setCurrentRange(val);
    const currentStatsInRange = getRange(fakeStats, val);

    const minDateInRange = moment
      .min(currentStatsInRange.map((foo) => moment(foo.date, standardDateFormat)))
      .format(standardDateFormat);

    const maxDateInRange = moment
      .max(currentStatsInRange.map((foo) => moment(foo.date, standardDateFormat)))
      .format(standardDateFormat);

    let totalTraffic = 0;
    let totalRegistrations = 0;
    let totalEmailsCollected = 0;
    let totalProductsSoldCount = 0;
    let totalSalesRevenue = 0;

    currentStatsInRange?.forEach((statsObj) => {
      totalTraffic = totalTraffic + statsObj!.traffic;
      totalRegistrations = totalRegistrations + statsObj!.registrations;
      totalEmailsCollected = totalEmailsCollected + statsObj!.emailsCollected;
      totalProductsSoldCount =
        totalProductsSoldCount + statsObj!.products.salesCount;
      totalSalesRevenue =
        totalSalesRevenue + statsObj!.products.totalSalesAmount;
    });

    setMinDateInCurrentRange(minDateInRange);
    setMaxDateInCurrentRange(maxDateInRange);

    setTotalTraffic(totalTraffic);
    setTotalRegistrations(totalRegistrations);
    setTotalEmailsCollected(totalEmailsCollected);
    setTotalProductsSoldCount(totalProductsSoldCount);
    setTotalSalesRevenue(totalSalesRevenue);
  };

  return (
    <div className="App font-sans min-h-screen w-full">
      <Header />
      <div className="main flex w-full h-full  top-20">
        <SideNav />

        {/* Main dashboard display section */}
        <div className="display-board flex flex-col min-h-screen pb-20 w-full px-8 pt-20 bg-slate-100 md:ml-32">
          <div>
            <label
              htmlFor="timePeriod"
              className="block text-sm font-medium leading-6 text-gray-900 tracking-wider mt-3"
            >
              <div className="flex flex-col md:w-1/5 text-left">
                Date Range:
              </div>
              <div className="text-lg text-left md:w-1/5 ">
                {`${minDateInCurrentRange} - ${maxDateInCurrentRange}`}
              </div>
            </label>
            <select
              id="timePeriod"
              name="timePeriod"
              className="mt-2 block w-full md:w-1/5 rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6 hover:cursor-pointer"
              onChange={(e) => handDateRangeChange(e.target.value)}
              value={currentRange}
            >
              <option>Today</option>
              <option>Week</option>
              <option>30 Days</option>
              <option>Year</option>
            </select>
          </div>

          <div className="stat-cards flex grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 w-full h-1/12 gap-4 mt-8">
            <StatCard
              title="Total Traffic"
              count={totalTraffic}
              percentage={"17.46"}
              isPositiveStat={true}
              previousCount={getPreviousCount(
                fakeStats,
                currentRange,
                `traffic`
              )}
              isMoneyStat={false}
              minDateInRange={moment(minDateInCurrentRange, standardDateFormat).format(`MM/DD/YY`)}
              maxDateInRange={moment(maxDateInCurrentRange, standardDateFormat).format(`MM/DD/YY`)}
            />
            <StatCard
              title="New Registrations"
              count={totalRegistrations}
              percentage={"8.32"}
              isPositiveStat={true}
              previousCount={getPreviousCount(
                fakeStats,
                currentRange,
                `registrations`
              )}
              isMoneyStat={false}
              minDateInRange={moment(minDateInCurrentRange, standardDateFormat).format(`MM/DD/YY`)}
              maxDateInRange={moment(maxDateInCurrentRange, standardDateFormat).format(`MM/DD/YY`)}
            />
            <StatCard
              title="Emails Collected"
              count={totalEmailsCollected}
              percentage={"4.56"}
              isPositiveStat={false}
              previousCount={getPreviousCount(
                fakeStats,
                currentRange,
                `emailsCollected`
              )}
              isMoneyStat={false}
              minDateInRange={moment(minDateInCurrentRange, standardDateFormat).format(`MM/DD/YY`)}
              maxDateInRange={moment(maxDateInCurrentRange, standardDateFormat).format(`MM/DD/YY`)}
            />
            <StatCard
              title="Product Sales"
              count={totalProductsSoldCount}
              percentage={"10.31"}
              isPositiveStat={true}
              previousCount={getPreviousCount(
                fakeStats,
                currentRange,
                `productSales`
              )}
              isMoneyStat={false}
              minDateInRange={moment(minDateInCurrentRange, standardDateFormat).format(`MM/DD/YY`)}
              maxDateInRange={moment(maxDateInCurrentRange, standardDateFormat).format(`MM/DD/YY`)}
            />
            <StatCard
              title="Total Revenue"
              count={totalSalesRevenue}
              percentage={"9.59"}
              isPositiveStat={true}
              previousCount={getPreviousCount(
                fakeStats,
                currentRange,
                `totalSales`
              )}
              isMoneyStat={true}
              minDateInRange={minDateInCurrentRange}
              maxDateInRange={maxDateInCurrentRange}
            />
          </div>

          <div className="graph-cards flex grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-full h-2/6 gap-4 mt-8">
            <GraphCard />
            <GraphCard />
            <GraphCard />
          </div>

          <div className="orders-table-container mt-8 h-screen">
            <OrdersTable />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
