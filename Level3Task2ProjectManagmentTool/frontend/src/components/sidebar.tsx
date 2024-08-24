import { Link, useLocation } from 'react-router-dom'
import { routes } from '../../constants'
import logoutImg from '../assets/logout.png'
import mainIcon from '../assets/mainicon.png'
import classnames from 'classnames'

export default function Sidebar () {
  const location = useLocation()

  return (
    <section className='w-[226px] blur blur-low rounded-lg'>
      <nav className='h-full'>
        <div className='flex flex-col h-full'>
          <div className='flex justify-center my-5'>
            <img src={mainIcon} alt='main' />
          </div>
          {routes.map((route, index) => {
            const isActive = route.path === location.pathname
            return (
              <div
                key={index}
                className={classnames({
                  'flex gap-2 py-3 pl-4': true,
                  'border-r-4 border-[#d9b906]': isActive
                })}
              >
                <img
                  src={route.image}
                  alt={route.name}
                  className={classnames({
                    'w-[24px] h-[24px]': true,
                    'filter-gold': isActive
                  })}
                />
                <Link
                  to={route.path}
                  className={classnames({
                    'font-semibold text-lg pr-1': true,
                    'text-[#d9b906]': isActive
                  })}
                >
                  {route.name}
                </Link>
              </div>
            )
          })}
          <div className='flex gap-2 mt-auto p-4'>
            <img src={logoutImg} alt='logout' className='w-[24px] h-[24px]' />
            <p className='font-semibold'>Logout</p>
          </div>
        </div>
      </nav>
    </section>
  )
}
