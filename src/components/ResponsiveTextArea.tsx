'use client'
import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const formSchema = z.object({
  text: z.string().min(2).max(500),
  email: z.string().email().optional(),
  name: z.string().min(2).max(50).optional(),
  anonCheck: z.boolean().optional(),
  notifyCheck: z.boolean().optional(),
})

const ResponsiveTextArea = () => {
  const { data: session, update, status } = useSession()

  const inputRef = useRef<HTMLTextAreaElement>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: '',
      email: '',
      name: '',
      anonCheck: false,
      notifyCheck: false,
    },
  })

  const watchChecks = form.watch(['anonCheck', 'notifyCheck'])
  const textChange = form.watch('text')

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto'
      inputRef.current.style.height = inputRef.current.scrollHeight + 'px'
    }
  }, [textChange])

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 mb-10">
        {' '}
        <div className="flex space-x-3">
          {watchChecks[0] ? (
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Alias</FormLabel>
                  <FormControl>
                    <Input placeholder="Pablito Maravilla" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          ) : null}
          {watchChecks[1] ? (
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="pablito@maravilla.com" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          ) : null}
        </div>
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Y tu qué opinas?</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none min-h-[40px] no-scrollbar"
                  {...field}
                  ref={inputRef}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center space-x-4 lg:space-x-7">
          {!session && (
            <div className="flex items-center space-x-4 lg:space-x-7">
              <FormField
                control={form.control}
                name="anonCheck"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Anonimous</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="notifyCheck"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Notify responses</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          )}

          <div className="flex-1">
            <Button type="submit" className="block ml-auto">
              Comentar
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}

export default ResponsiveTextArea
