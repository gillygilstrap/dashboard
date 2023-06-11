import { useContext, useEffect } from "react";
import moment from "moment";

import StatCard from "../StatCard";
import ChartCard from "../ChartCard";
import OrdersTable from "../tables/OrdersTable";

import { getRange } from "../../utils/getRange";
import { getPreviousRange } from "../../utils/getPreviousRange";
import { getPreviousCount } from "../../utils/getPreviousCount";
import { chartTypes, timePeriods, standardDateFormat, tabs } from "../../constants";
import { isCurrentTab } from "../../utils/isCurrentTab";
import { buildLineChartData } from "../../utils/buildLineChartData";
import { buildBarChartData } from "../../utils/buildBarChartData";

import { AppContext } from "./Layout";

const MainDashboard = () => {
  // State context from decendant Parent
  const {
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
    lineChartData,
    setLineChartData,
    barChartData,
    setBarChartData,
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
    orders,
    currentTab,
    setCurrentTab
  } = useContext(AppContext);

  if(!isCurrentTab(currentTab, tabs.STATS)) {
    setCurrentTab(tabs.STATS)
  }

  // Methods
  const handleDateRateChange = (val: string) => {

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

    setLineChartData(buildLineChartData(fakeStats, val, showPreviousDateRange));
    setBarChartData(buildBarChartData(fakeStats, val, showPreviousDateRange));
  };

  useEffect(() => {
    setLineChartData(buildLineChartData(fakeStats, currentRange, showPreviousDateRange));
    setBarChartData(buildBarChartData(fakeStats, currentRange, showPreviousDateRange));

  },[showPreviousDateRange, currentRange])

  return (
    <div className="display-board flex flex-col">
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
            onChange={(e) => handleDateRateChange(e.target.value)}
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

      <div className="stat-cards flex grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 w-full gap-4">
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
        <OrdersTable orders={orders} isMainDashboardInstance={true} />
      </div>
    </div>
  );
};

export default MainDashboard;
