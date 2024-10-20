'use client'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)
const labels = [
  'Jan 1',
  'Jan 8',
  'Jan 15',
  'Jan 22',
  'Jan 29',
  'Feb 5',
  'Feb 12',
  'Feb 19',
  'Feb 26',
  'Mar 4',
]
export default function test() {
  const data = {
    labels,
    datasets: [
      {
        label: 'My First dataset',
        data: [65, 59, 80, 81, 56, 55, 40, 50, 60, 70],
        fill: false,
        backgroundColor: '#3196FF', // 라인의 배경색 (선의 색깔과 동일하게 설정)
        borderColor: '#3196FF', // 선의 색깔 설정
        tension: 0.4, // 곡선의 정도를 조절하는 속성
        pointRadius: 0,
      },
    ],
  }
  // X축 날짜 라벨을 7일 간격으로 설정

  const options = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(255,99,132,0.8)',
      },
    },
    scales: {
      x: {
        ticks: { display: false },
      },
      y: {
        beginAtZero: true,
        border: {
          dash: [2, 4],
        },
        ticks: {
          stepSize: 11, // Y축 눈금 간격을 10으로 설정
          min: 0, // Y축 최소값
          max: 50, // Y축 최대값
        },
      },
    },
  }

  return (
    <div
      style={{
        background: 'white',
      }}
    >
      <Line width={1208} height={226} data={data} options={options} />
    </div>
  )
}
