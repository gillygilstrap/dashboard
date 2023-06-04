import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { CategoryScale, ChartData } from "chart.js";
ChartJS.register(CategoryScale);

interface PieChartProps {
  chartData: ChartData<"pie">;
}

// const options: ChartOptions = {
//     // Add Options here....
// import ChartOptions from the chart.js module
// }

const PieChart: React.FC<PieChartProps> = (props: PieChartProps) => {
  const { chartData } = props;
  return <Pie data={chartData} />;
};

export default PieChart;
