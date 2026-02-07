'use client';
import Chart from './BaseChart';
import { ApexOptions } from 'apexcharts';

interface LineChartProps {
  series: { name: string; data: number[] }[];
  categories: string[];
  colors?: string[];
  height?: string | number;
}

export const LineChart = ({ 
  series, 
  categories, 
  colors = ['#10B981', '#3C50E0'], 
  height = "100%" 
}: LineChartProps) => {
  const options: ApexOptions = {
    legend: { show: false },
    chart: { 
      type: 'area',
      toolbar: { show: false }, 
      fontFamily: 'Satoshi, sans-serif',
      dropShadow: {
        enabled: true,
        color: colors[0],
        top: 10,
        left: 0,
        blur: 4,
        opacity: 0.1,
      },
    },
    stroke: {
      curve: 'smooth',
      width: 3,
    },

    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.05,
        stops: [0, 90, 100]
      }
    },
    grid: {
      strokeDashArray: 5,
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } },
      padding: { top: 0, right: 0, left: -10, bottom: 0 }
    },
    dataLabels: { enabled: false },
    markers: {
      size: 4,
      colors: '#fff',
      strokeColors: colors,
      strokeWidth: 3,
      strokeOpacity: 0.9,
      hover: { size: 6 }
    },
    xaxis: {
      categories,
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        style: { colors: '#64748b', fontSize: '12px' }
      }
    },
    yaxis: {
      labels: {
        style: { colors: '#64748b', fontSize: '12px' }
      }
    },
    tooltip: {
      x: { show: true },
      theme: 'light',
    },
  };

  return (
    <div className="w-full h-full min-h-75">
      <Chart options={options} series={series} type="area" height={height} />
    </div>
  );
};