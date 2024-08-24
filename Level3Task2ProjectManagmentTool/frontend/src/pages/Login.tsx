import { Form } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import CustomFormField from '../components/CustomFormField'
import { z } from 'zod'
import { FormFieldType } from '../../constants'
import SubmitButton from '../components/SubmitButton'

const fromSchema = z.object({
  username: z.string().min(2, {
    message: 'user must be at least two characters.'
  }),
  enail: z.string().email('invalid email address'),
  phone: z.number()
})

export default function Login () {
  const form = useForm<z.infer<typeof fromSchema>>({
    resolver: zodResolver(fromSchema)
  })

  const onSubmit = () => {}
  return (
    <div className='h-[100vh] w-full flex justify-center items-center'>
      <div className='w-1/3 h-[50vh] rounded-xl blur blur-low p-4'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-8 flex-1 mb-3'
          >
            <section className='mb-12 space-y-4'>
              <h1 className='header'>Hi there 👋</h1>
              <p className='text-dark-700'>Tell us more about yourself</p>
            </section>
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name='name'
              label='Full Name'
              placeHolder='ex. Jafer Hussein'
              iconSrc=''
            />
          </form>
          <SubmitButton isLoading={false}>Login</SubmitButton>
        </Form>
      </div>
    </div>
  )
}
