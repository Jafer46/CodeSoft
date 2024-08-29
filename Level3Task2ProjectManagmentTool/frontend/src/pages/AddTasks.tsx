import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Task } from '../schema'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Variable } from 'lucide-react'
import { createTask } from '@/api/taskApi'
import { useToast } from '@/components/ui/use-toast'
import useAuth from '@/store'

export default function AddTasks () {
  const [expanded, setExpanded] = useState(false)
  const [tasks, setTasks] = useState<any[]>([])
  const [assignUsers, setAssignedUsers] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const { state } = useLocation()
  const { toast } = useToast()
  const { token } = useAuth()
  const { project, users } = state

  const close = () => {
    setExpanded(false)
    setTitle('')
    setDescription('')
  }
  const create = async () => {
    if (!title || !description) {
      return
    }
    try {
      const task = await createTask(
        {
          title,
          description,
          assignUsers,
          partOf: project._id
        },
        token
      )
      if (task._id) {
        setTasks((prevtask: any[]) => [...prevtask, task])
      }
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Something went wrong'
      })
    }
  }
  useEffect(() => {}, [])
  return (
    <div className='w-full blur blur-high rounded-lg p-4 '>
      <div className='text-xl font-semibold mb-2'>Table of Tasks</div>
      <Table>
        {(!tasks || tasks.length === 0) && (
          <TableCaption>There are no tasks.</TableCaption>
        )}
        <TableHeader>
          <TableRow>
            <TableHead className='max-w-[50px]'>Title</TableHead>
            <TableHead className='max-w-[50px]'>Description</TableHead>
            <TableHead className='max-w-[50px]'>Status</TableHead>
            <TableHead className='max-w-[50px]'>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks &&
            tasks.map((task: Task) => (
              <TableRow key={task._id}>
                <TableCell className='max-w-[50px]'>{task.title}</TableCell>
                <TableCell className='max-w-[50px]'>
                  {task.description}
                </TableCell>
                <TableCell className='max-w-[50px]'>
                  {task.status === 0 ? 'Pending' : 'Completed'}
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            ))}
        </TableBody>
        {expanded && (
          <TableFooter>
            <TableRow>
              <TableCell>
                <Input
                  width='50px'
                  placeholder='Title'
                  onChange={e => setTitle(e.target.value)}
                />
              </TableCell>
              <TableCell>
                <Input
                  width='50px'
                  placeholder='Description'
                  onChange={e => setDescription(e.target.value)}
                />
              </TableCell>
              <TableCell>
                <Select>
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder='select users' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Users</SelectLabel>
                      {users &&
                        users.map((user: any) => (
                          <SelectItem value={user._id}>
                            {user.username}
                          </SelectItem>
                        ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell className='flex flex-wrap gap-2 p-0 m-0'>
                <Button variant='default' onClick={() => create()}>
                  save
                </Button>
                <Button variant='destructive' onClick={() => close()}>
                  X
                </Button>
              </TableCell>
            </TableRow>
          </TableFooter>
        )}
      </Table>
      {!expanded && (
        <div className='flex justify-center'>
          <button
            className='text-xl font-semibold bg-white h-[34px] w-[34px] rounded-full border border-gray-300'
            onClick={() => setExpanded(!expanded)}
          >
            +
          </button>
        </div>
      )}
    </div>
  )
}
