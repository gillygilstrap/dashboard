import "./App.css";
import { useState } from "react";

import Header from "./Components/Header";
import SideNav from "./Components/SideNav";
import StatCard from "./Components/StatCard";
import GraphCard from "./Components/GraphCard";
import OrdersTable from "./Components/OrdersTable";
import { generateStats } from "./utils/generateStats";
import { getRange } from "./utils/getRange";

// import userDataJson from "./userData.json";

// console.table(JSON.parse(JSON.stringify(userDataJson))[0])

const generatedStats = generateStats();

function App() {
  const [currentRange, setCurrentRange] = useState(`30 Days`);
  const [totalTraffic, setTotalTraffic] = useState(0);
  const [totalRegistrations, setTotalRegistrations] = useState(0);
  const [totalEmailsCollected, setTotalEmailsCollected] = useState(0);
  const [totalProductsSoldCount, setTotalProductsSoldCount] = useState(0);
  const [totalSalesRevenue, setTotalSalesRevenue] = useState(0);

  const handDateRangeChange = (val: string) => {
    setCurrentRange(val)
    const currentStatsInRange = getRange(generatedStats, val);

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
      totalSalesRevenue = totalSalesRevenue + statsObj!.products.totalSalesAmount;
    });

    setTotalTraffic(totalTraffic);
    setTotalRegistrations(totalRegistrations);
    setTotalEmailsCollected(totalEmailsCollected);
    setTotalProductsSoldCount(totalProductsSoldCount);
    setTotalSalesRevenue(totalSalesRevenue);
  }

  return (
    <div className="App font-sans min-h-screen w-full overflow-y-scroll">
      <Header />
      <div className="main flex w-full h-full mt-20 top-20">
        <SideNav />

        {/* Main dashboard displa section */}
        <div className="display-board flex flex-col min-h-screen pb-20 w-full px-8 pt-4 bg-slate-100 md:ml-32 overflow-y-scroll">
          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium leading-6 text-gray-900 tracking-wider"
            >
              Location
            </label>
            <select
              id="location"
              name="location"
              className="mt-2 block w-full md:w-1/4 rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
              count={String(totalTraffic)}
              percentage={"17.46"}
              isPositiveStat={true}
            />
            <StatCard
              title="New Registrations"
              count={String(totalRegistrations)}
              percentage={"8.32"}
              isPositiveStat={true}
            />
            <StatCard
              title="Emails Collected"
              count={String(totalEmailsCollected)}
              percentage={"4.56"}
              isPositiveStat={false}
            />
            <StatCard
              title="Product Sales"
              count={String(totalProductsSoldCount)}
              percentage={"10.31"}
              isPositiveStat={true}
            />
            <StatCard
              title="Total Revenue"
              count={`$${totalSalesRevenue.toFixed(2)}`}
              percentage={"9.59"}
              isPositiveStat={true}
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
