import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { CategoryScale, ChartData } from "chart.js";
ChartJS.register(CategoryScale);

interface LineChartProps {
  chartData: ChartData<"line">;
}

/// const options: ChartOptions = {
//     // Add Options here....
// import ChartOptions from the chart.js module
// }

const LineChart: React.FC<LineChartProps> = (props: LineChartProps) => {
  const { chartData } = props;

  return <Line data={chartData} />;
};

export default LineChart;
