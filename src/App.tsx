import Header from "./Components/Header";
import SideNav from "./Components/SideNav";
import StatCard from "./Components/StatCard";
import ChartCard from "./Components/ChartCard";
import OrdersTable from "./Components/OrdersTable";

import { generateStats } from "./utils/generateStats";
import { getRange } from "./utils/getRange";
import { getPreviousCount } from "./utils/getPreviousCount";
import { getPreviousRange } from "./utils/getPreviousRange";
import { randomYearValues } from "./utils/randomYearValues";
import { buildLineChartData } from "./utils/buildLineChartData";
import { buildBarChartData } from "./utils/buildBarChartData";

import { chartTypes } from "./constants";

import { timePeriods, standardDateFormat } from "./constants";

import { useState } from "react";
import moment from "moment";
import userDataJson from "./userData.json";

console.log(
  `One user----`,
  JSON.parse(JSON.stringify(userDataJson))[0].results[0]
);

const fakeStats = generateStats();
const today = moment(Date.now()).format(standardDateFormat);
const randomPreviousYearValues = randomYearValues();

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

function App() {
  const [lineChartData, setLineChartData] = useState(onloadLineChartData);
  const [barChartData, setBarChartData] = useState(onloadBarChartData);

  // State
  const [currentRange, setCurrentRange] = useState(timePeriods.THIRTY_DAYS);

  // State -> Dates
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

  const [showPreviousDateRange, setShowPreviousDateRange] = useState(false);

  // Methods
  const handDateRangeChange = (val: string) => {
    // ******************************************
    // ******************************************
    // ******************************************
    // Temoporary TypeScript Warning Fix/Hack
    setLineChartData(onloadLineChartData);
    setBarChartData(onloadBarChartData);
    // ******************************************
    // ******************************************
    // ******************************************

    setCurrentRange(val);
    const currentStatsInRange = getRange(fakeStats, val);

    const minDateInRange = moment
      .min(
        currentStatsInRange.map((day) => moment(day.date, standardDateFormat))
      )
      .format(standardDateFormat);

    const maxDateInRange = moment
      .max(
        currentStatsInRange.map((day) => moment(day.date, standardDateFormat))
      )
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
    setMinDateInPreviousRange(getPreviousRange(val).min);
    setMaxDateInPreviousRange(getPreviousRange(val).max);

    setTotalTraffic(totalTraffic);
    setTotalRegistrations(totalRegistrations);
    setTotalEmailsCollected(totalEmailsCollected);
    setTotalProductsSoldCount(totalProductsSoldCount);
    setTotalSalesRevenue(totalSalesRevenue);
  };

  return (
    <div className="App font-sans min-h-screen w-full">
      <Header />
      <div className="main flex w-full h-full top-20">
        <SideNav />

        {/* Main dashboard display section */}
        <div className="display-board flex flex-col min-h-screen pb-20 w-full px-8 pt-20 bg-slate-100 md:ml-32">
          {/* Date Range Selection */}
          <div className="time-container flex flex-col md:flex-row w-full flex-row mt-3 mb-6">
            <div className="mb-3 md:mb-0">
              <label
                htmlFor="timePeriod"
                className="text-sm font-medium leading-6 text-gray-900 tracking-wider"
              >
                <div className="w-full text-left">Current Date Range:</div>
                <div className="text-lg text-left w-full ">
                  {`${minDateInCurrentRange} - ${maxDateInCurrentRange}`}
                </div>
              </label>
              <select
                id="timePeriod"
                name="timePeriod"
                className="mt-2 w-full w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6 hover:cursor-pointer"
                onChange={(e) => handDateRangeChange(e.target.value)}
                value={currentRange}
              >
                <option value={timePeriods.TODAY}>Today</option>
                <option value={timePeriods.WEEK}>Week</option>
                <option value={timePeriods.THIRTY_DAYS}>30 Days</option>
                <option value={timePeriods.YEAR}>Year</option>
              </select>
            </div>

            <div className="previous-container h-full  md:ml-6 flex flex-col justify-between align-middle pt-2 py-1">
              <button
                className={`toggle-previous-button h-10 px-4 rounded-lg shadow-md hover:shadow-lg hover:scale-101 font-bold tracking-wider text-slate-700 ${
                  showPreviousDateRange ? `bg-amber-500` : `bg-green-500`
                }`}
                onClick={() => setShowPreviousDateRange(!showPreviousDateRange)}
              >
                {showPreviousDateRange
                  ? `Hide Previous Date Range`
                  : `Compare Previous Date Range`}
              </button>

              <div
                className={`previous-date-range mx-auto text-amber-500 ${
                  showPreviousDateRange ? `` : `hidden`
                }`}
              >
                {`${minDateInPreviousRange} - ${maxDateInPreviousRange}`}
              </div>
            </div>
          </div>

          <div className="stat-cards flex grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 w-full h-1/12 gap-4">
            <StatCard
              title="Website Traffic"
              count={totalTraffic}
              isPositiveStat={true}
              previousCount={getPreviousCount(
                fakeStats,
                currentRange,
                `traffic`,
                randomPreviousYearValues
              )}
              isMoneyStat={false}
              showPreviousDateRange={showPreviousDateRange}
              previousRange={{
                min: minDateInPreviousRange,
                max: maxDateInPreviousRange,
              }}
            />
            <StatCard
              title="New Registrations"
              count={totalRegistrations}
              isPositiveStat={true}
              previousCount={getPreviousCount(
                fakeStats,
                currentRange,
                `registrations`,
                randomPreviousYearValues
              )}
              isMoneyStat={false}
              showPreviousDateRange={showPreviousDateRange}
              previousRange={{
                min: minDateInPreviousRange,
                max: maxDateInPreviousRange,
              }}
            />
            <StatCard
              title="Emails Collected"
              count={totalEmailsCollected}
              isPositiveStat={false}
              previousCount={getPreviousCount(
                fakeStats,
                currentRange,
                `emailsCollected`,
                randomPreviousYearValues
              )}
              isMoneyStat={false}
              showPreviousDateRange={showPreviousDateRange}
              previousRange={{
                min: minDateInPreviousRange,
                max: maxDateInPreviousRange,
              }}
            />
            <StatCard
              title="Product Sales"
              count={totalProductsSoldCount}
              isPositiveStat={true}
              previousCount={getPreviousCount(
                fakeStats,
                currentRange,
                `productSales`,
                randomPreviousYearValues
              )}
              isMoneyStat={false}
              showPreviousDateRange={showPreviousDateRange}
              previousRange={{
                min: minDateInPreviousRange,
                max: maxDateInPreviousRange,
              }}
            />
            <StatCard
              title="Total Revenue"
              count={totalSalesRevenue}
              isPositiveStat={true}
              previousCount={getPreviousCount(
                fakeStats,
                currentRange,
                `totalSales`,
                randomPreviousYearValues
              )}
              isMoneyStat={true}
              showPreviousDateRange={showPreviousDateRange}
              previousRange={{
                min: minDateInPreviousRange,
                max: maxDateInPreviousRange,
              }}
            />
          </div>

          <div className="chart-cards flex grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-full gap-4 mt-8">
            {/* Line Chart */}
            <ChartCard type={chartTypes.LINE} data={lineChartData!} />

            {/* Bar Chart */}
            <ChartCard type={chartTypes.BAR} data={barChartData!} />
            {/* Pie Chart */}
            <ChartCard
              type={chartTypes.PIE}
              data={{
                labels: [`EBook`, `New Subscriptions`, `Consulting`],
                datasets: [
                  {
                    label: `Product Sales`,
                    data: [12, 42, 18],
                  },
                ],
              }}
            />
          </div>

          <div className="orders-table-container mt-8">
            <OrdersTable />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
