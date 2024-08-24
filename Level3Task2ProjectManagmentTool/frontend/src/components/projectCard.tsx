import { Progress } from '@radix-ui/react-progress'

interface project {
  leaderName: String
  leaderAvatar?: String
  priority: String
  dueDate: Date
  status: Number
  userList: []
  progress: Number
  numberOfTasks: Number
  finishedTasks: Number
}
export default function ProjectCard () {
  return (
    <div className='w-[300px] blur blur-high rounded-2xl p-4 flex flex-col gap-2'>
      <div className='flex gap-2'>
        <img src='../assets/icon.png' alt='icon' height='24px' width='24px' />
        <p className='font-semibold'>By: John Doe</p>
      </div>
      <div className='flex justify-between'>
        <div className='progress progress-2'> in progress</div>
        <div className='priority priority-high'> High</div>
      </div>
      <div>
        <p>Task Completed: 25/50</p>
      </div>
      <div>
        <Progress value={33} />
      </div>
      <div className='flex'>
        <p className='progress progress-0'>Due Datae: Jun 24</p>
      </div>
    </div>
  )
}
