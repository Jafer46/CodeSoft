import { ReactNode } from 'react'
import Sidebar from './components/sidebar'
import { Outlet } from 'react-router-dom'
import TopBar from './components/topBar'

export default function Layout () {
  return (
    <div className='w-full h-[100vh] p-4 flex gap-[20px]'>
      <Sidebar />
      <div className='w-full flex flex-col gap-2'>
        <TopBar />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
