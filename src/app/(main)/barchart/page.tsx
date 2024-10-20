'use client'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const labels = [
  '수채화',
  '유화',
  'AI포토',
  'AI프롬프트',
  'AI 스트레스 그림검사',
  'AI 정서유형 색깔검사',
]

export default function BarChartExample() {
  const data = {
    labels,
    datasets: [
      {
        data: [15, 50, 35, 10, 40, 30],
        backgroundColor: [
          '#4ED3FF',
          '#FFD54F',
          '#81C784',
          '#F48FB1',
          '#B39DDB',
          '#4DD0E1',
        ],
        borderColor: [
          '#4ED3FF',
          '#FFD54F',
          '#81C784',
          '#F48FB1',
          '#B39DDB',
          '#4DD0E1',
        ],
        borderWidth: 1,
        barThickness: 40, // 막대 너비 설정 (px)
        borderRadius: {
          topLeft: 4,
          topRight: 4,
          bottomLeft: 0,
          bottomRight: 0,
        },
      },
    ],
  }

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          display: false, // Remove grid lines
        },
      },
      y: {
        border: {
          dash: [2, 4],
        },
        beginAtZero: true,
        ticks: {
          stepSize: 10, // Y축 눈금 간격을 10으로 설정
          min: 0,
          max: 50,
        },
      },
    },
  }

  return (
    <div
      style={{
        width: '70%',
        height: '50%',
        background: 'white',
      }}
    >
      <h2>사용자 수에 따른 AI 및 그림 유형</h2>
      <Bar data={data} options={options} />
    </div>
  )
}
