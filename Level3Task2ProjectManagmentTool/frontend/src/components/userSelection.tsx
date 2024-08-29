import { cn } from '@/lib/utils'
import {
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  Command
} from './ui/command'
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons'
import React, { useEffect } from 'react'
import { Button } from './ui/button'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { ScrollArea } from './ui/scroll-area'
import AvatarCircle from './avatarCircle'
import { search } from '@/api/userApi'
import { useToast } from './ui/use-toast'
import { User } from '@/schema'

export default function UserSelection ({
  users,
  setUsers,
  selectedUsers,
  setSelectedUsers
}: {
  users: any[]
  setUsers: any
  selectedUsers: any[]
  setSelectedUsers: any
}) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState('')
  const { toast } = useToast()
  const [popoverStates, setPopoverStates] = React.useState<{
    [key: string]: boolean
  }>({})

  const searchUser = async (value: string) => {
    try {
      const users = await search(value)
      console.log(users)
      setUsers(users)
    } catch (err) {
      toast({
        title: 'error',
        description: err.message
      })
    }
  }

  useEffect(() => {
    if (!users || users.length === 0) {
      setValue('') // Reset selected value if users are cleared
    }
  }, [users, selectedUsers])

  const togglePopover = (id: string) => {
    setPopoverStates(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            role='combobox'
            aria-expanded={open}
            className='w-auto justify-between'
          >
            <span className='font-light'>Add user</span>
            <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-[200px] p-0'>
          <Command>
            <CommandInput
              placeholder='Search user...'
              className='h-9'
              onChangeCapture={e => searchUser(e.target.value)}
            />
            <CommandList>
              <CommandEmpty>No user found.</CommandEmpty>
              <CommandGroup>
                {users &&
                  users.map(user => (
                    <CommandItem
                      key={user._id}
                      value={user.username}
                      onSelect={() => {
                        setSelectedUsers(prev => {
                          // Check if the user is already selected
                          if (
                            prev.find(
                              selectedUser => selectedUser._id === user._id
                            )
                          ) {
                            return prev // Return the previous state if the user is already selected
                          }
                          return [...prev, user] // Add the new user if not already selected
                        })
                        setOpen(false)
                      }}
                    >
                      {user.username}
                      <CheckIcon
                        className={cn(
                          'ml-auto h-4 w-4',
                          value === user.username ? 'opacity-100' : 'opacity-0'
                        )}
                      />
                    </CommandItem>
                  ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <ScrollArea className='bg-white rounded-lg w-auto h-[100px] p-2'>
        <div className='grid grid-cols-4 md:grid-cols-6 gap-2'>
          {selectedUsers &&
            selectedUsers.map(user => (
              <Popover
                key={user._id}
                open={popoverStates[user._id]}
                onOpenChange={() => togglePopover(user._id)}
              >
                <PopoverTrigger asChild>
                  <div className='flex flex-col items-center overflow-hidden gap-1'>
                    <AvatarCircle url={user.avatar} />
                    <p className='self-start'>{user.username}</p>
                  </div>
                </PopoverTrigger>
                <PopoverContent className='p-0 w-fit bg-transparent'>
                  <Button
                    variant='destructive'
                    onClick={() => {
                      setSelectedUsers(prev =>
                        prev.filter(u => u._id !== user._id)
                      )
                      togglePopover(user._id) // Close popover after removing
                    }}
                  >
                    remove
                  </Button>
                </PopoverContent>
              </Popover>
            ))}
        </div>
      </ScrollArea>
    </>
  )
}
