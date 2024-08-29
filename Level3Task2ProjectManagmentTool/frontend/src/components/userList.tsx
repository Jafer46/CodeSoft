import { User } from '../schema'
import AvatarCircle from './avatarCircle'
import { usersData } from '../../constants'

export default function UserList () {
  //   if (!users || users.length < 1) {
  //     return (
  //       <div className='h-[26px] w-auto rounded-lg px-3'>
  //         <p>no user selected</p>
  //       </div>
  //     )
  //   }

  const length = usersData.length < 5 ? usersData.length : 5
  return (
    <div className='flex w-[100px] h-[36px] relative'>
      {new Array(length).fill(null).map((_, index) => {
        return (
          <div
            key={index}
            className='w-[32px] h-[32px] rounded-full absolute bg-white flex justify-center items-center'
            style={{ left: `${index * 20}px` }}
          >
            <AvatarCircle url={usersData[index].avatar} />
          </div>
        )
      })}
      {usersData.length > 5 && (
        <div
          className='w-[32px] h-[32px] rounded-full absolute bg-white flex justify-center items-center'
          style={{ left: `${20 * 5}px` }}
        >
          +{usersData.length - 5}
        </div>
      )}
    </div>
  )
}
