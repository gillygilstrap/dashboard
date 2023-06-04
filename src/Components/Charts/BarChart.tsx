import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { CategoryScale, ChartData } from "chart.js";
ChartJS.register(CategoryScale);

interface BarChartProps {
  chartData: ChartData<"bar">;
}

/// const options: ChartOptions = {
//     // Add Options here....
// import ChartOptions from the chart.js module
// }

const BarChart: React.FC<BarChartProps> = (props: BarChartProps) => {
  const { chartData } = props;
  return <Bar data={chartData} />;
};

export default BarChart;
