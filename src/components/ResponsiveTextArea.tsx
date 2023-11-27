'use client'
import { startTransition, useEffect, useRef } from 'react'

import withAuth from '@/lib/withAuthIframe'

import { useSession, signIn, getSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { signInUser, signOutUser } from '@/app/actions/authActions'
import Image from 'next/image'
import * as z from 'zod'
import { set, useForm } from 'react-hook-form'
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Input } from '@/components/ui/input'
import { log } from 'console'

const formSchema = z.object({
  text: z.string().min(2).max(500),
  email: z.string().email().optional(),
  name: z.string().min(2).max(50).optional(),
  anonCheck: z.boolean().optional(),
  notifyCheck: z.boolean().optional(),
})

const ResponsiveTextArea = ({ session }: { session: any }) => {
  //const { data: session, update, status } = useSession()
  const router = useRouter()

  console.log('session', session)

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

  const handleLogin = () => {
    const newWindow = window.open(
      `https://mai-comments.vercel.app//auth/signin?callbackUrl=http://127.0.0.1:5500/index.html`,
      //    `http://localhost:3000/auth/signin?callbackUrl=${window.parent.location.href}`,
      '_blank'
    )
    try {
      newWindow?.focus()
      setTimeout(() => {
        window.location.reload()
        //   newWindow?.close()
      }, 4000)
    } catch {
      alert(
        'Pop-up Blocker is enabled! Please add this site to your exception list.'
      )
      //or change state to display something different on the page
    }
  }

  return (
    <div className="flex space-x-3">
      <Button onClick={handleLogin}>pruebas</Button>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" flex-1 space-y-2 mb-5"
        >
          {' '}
          <div className="flex items-center space-x-3">
            {/* //ojo con esto */}
            {session && (
              <Popover>
                <PopoverTrigger className=" ">
                  {session?.user?.image && (
                    <Image
                      className="object-cover rounded-full"
                      src={session.user.image}
                      alt="avatar small"
                      //style={{ width: '100%', height: '100%' }}
                      width={70}
                      height={70}
                    />
                  )}
                </PopoverTrigger>
                <PopoverContent className="flex flex-col items-center justify-center">
                  <Button
                    type="button"
                    onClick={() =>
                      startTransition(() => {
                        signOutUser()
                      })
                    }
                  >
                    Signout
                  </Button>
                </PopoverContent>
              </Popover>
            )}
            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem className="flex-1">
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
          </div>
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
              {!session && !watchChecks[0] ? (
                <Popover>
                  <PopoverTrigger className="block ml-auto">
                    <span>SignIn</span>
                  </PopoverTrigger>
                  <PopoverContent className="flex flex-col items-center justify-center">
                    <Button
                      type="button"
                      onClick={() =>
                        startTransition(() => {
                          signInUser()
                        })
                      }
                    >
                      SignIn with Github
                    </Button>
                  </PopoverContent>
                </Popover>
              ) : (
                <Button type="submit" className="block ml-auto">
                  Comentar
                </Button>
              )}
            </div>
          </div>
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
        </form>
      </Form>
    </div>
  )
}

export default ResponsiveTextArea
