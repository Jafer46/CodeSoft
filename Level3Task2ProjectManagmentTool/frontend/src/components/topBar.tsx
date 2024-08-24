import notificationIcon from '../assets/notification.png'
export default function TopBar () {
  return (
    <div className='w-full flex rounded-xl gap-2 blur blur-high p-2'>
      <input type='text' className='flex-grow blur blur-high' />
      <img
        src={notificationIcon}
        alt='notification'
        className='w-[24px] h-[24px] ml-auto'
      />
      <img className='w-[24px] h-[24px] rounded-[50%]' />
    </div>
  )
}
