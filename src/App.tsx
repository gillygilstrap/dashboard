import "./App.css";

import Header from "./Components/Header";
import SideNav from "./Components/SideNav";
import StatCard from "./Components/StatCard";
import GraphCard from "./Components/GraphCard";
import OrdersTable from "./Components/OrdersTable";

function App() {
  return (
    <div className="App font-sans min-h-screen w-full overflow-y-scroll">
      <Header />
      <div className="main flex w-full h-full fixed top-20">
        <SideNav />

        {/* Main dashboard displa section */}
        <div className="display-board flex flex-col overflow-y-scroll w-full relative px-8 pt-8 bg-slate-100">
          <div className="stat-cards flex grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 w-full h-1/6 gap-4">
            <StatCard title="Total Traffic" count={"7,491"} percentage={"17.46"} isPositiveStat={true}/>
            <StatCard title="New Registrations" count={"38"} percentage={"8.32"} isPositiveStat={true}/>
            <StatCard title="Emails Collected" count={"133"} percentage={"4.56"} isPositiveStat={false}/>
            <StatCard title="Product Sales" count={"27"} percentage={"10.31"} isPositiveStat={true}/>
            <StatCard title="Total Revenue" count={"$2,904.64"} percentage={"9.59"} isPositiveStat={true}/>
          </div>

          <div className="graph-cards flex grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-full h-2/6 gap-4 mt-8">
            <GraphCard/>
            <GraphCard/>
            <GraphCard/>
          </div>

          <div className="orders-table-container mt-8 h-80">
            <OrdersTable/>  
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
