import dashbordIcon from './src/assets/dashboard.png'
import projectIcon from './src/assets/project.png'
import taskIcon from './src/assets/task.png'
import calendarIcon from './src/assets/calendar.png'
import createIcon from './src/assets/create.png'
import { type ChartConfig } from "@/components/ui/chart"
import { PhilippinePeso } from 'lucide-react'

export const tasks = [
  {
    completed: false,
    title: 'Do this'
  },
  {
    completed: false,
    title: 'Do that'
  },
  {
    completed: true,
    title: 'Do whatever'
  },
  {
    completed: false,
    title: 'Do this'
  },
  {
    completed: false,
    title: 'Do that'
  },
  {
    completed: true,
    title: 'Do whatever'
  }
]

export const routes = [
  { path: '/', name: 'Dashboard', image: dashbordIcon },
  { path: '/projects', name: 'Projects', image: projectIcon },
  { path: '/tasks', name: 'My Task', image: taskIcon },
  { path: '/create', name: 'Create', image: createIcon },
  { path: '/calendar', name: 'Calendar', image: calendarIcon },
]

export const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 0, mobile: 2 },
]


 
export const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} satisfies ChartConfig


export enum FormFieldType {
    INPUT = 'input',
    TEXTAREA = 'textarea',
    PHONE_INPUT = 'phoneInput',
    CHECKBOX = 'checkbox',
    DATE_PICKER = 'datePicker',
    SELECT = 'select',
    SKELETON = 'skeleton',
}