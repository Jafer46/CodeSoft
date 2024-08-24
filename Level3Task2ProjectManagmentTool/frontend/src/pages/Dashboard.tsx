import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart'
import ProjectCard from '../components/projectCard'

import TaskListCard from '../components/taskListCard'
import { chartConfig } from '../../constants'
import { chartData } from '../../constants'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'

function Dashboard () {
  const date = new Date()
  console.log(date)
  const selected = [
    date,
    new Date(date.setDate(date.getDate() - 3)),
    new Date(date.setDate(date.getDate() - 2)),
    new Date(date.setDate(date.getDate() - 6))
  ]
  return (
    <>
      <ProjectCard />
      {/* <Calendar
        mode='multiple'
        selected={selected}
        className='blur blur-low rounded-2xl'
      /> */}
      <TaskListCard />
      <ChartContainer
        config={chartConfig}
        className='h-[200px] w-[200px] blur blur-low rounded-xl'
      >
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey='month'
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={value => value.slice(0, 3)}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey='desktop' fill='var(--color-desktop)' radius={4} />
          <Bar dataKey='mobile' fill='var(--color-mobile)' radius={4} />
        </BarChart>
      </ChartContainer>
    </>
  )
}

export default Dashboard
