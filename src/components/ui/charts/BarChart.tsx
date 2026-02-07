'use client';
import Chart from './BaseChart';
import { ApexOptions } from 'apexcharts';

interface BarChartProps {
  series: { name: string; data: number[] }[];
  categories: string[];
  colors?: string[];
}

export const BarChart = ({ series, categories, colors = ['#80CAEE'] }: BarChartProps) => {
  const options: ApexOptions = {
    chart: { type: 'bar', toolbar: { show: false } },
    plotOptions: { bar: { borderRadius: 4, columnWidth: '45%' } },
    colors: colors,
    xaxis: { categories },
    dataLabels: { enabled: false }
  };
  return <Chart options={options} series={series} type="bar" height={300} />;
};