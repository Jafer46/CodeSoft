import { createBrowserRouter } from 'react-router-dom'
import Layout from './Layout'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import { Create } from './pages/Create'
import Tasks from './pages/Tasks'
import { Calendar } from './components/ui/calendar'
import Login from './pages/Login'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'projects', element: <Projects /> },
      { path: 'tasks', element: <Tasks /> },
      { path: 'calendar', element: <Calendar /> },
      { path: 'create', element: <Create /> }
    ]
  },
  {
    path: '/login',
    element: <Login />
  }
])

export default router
