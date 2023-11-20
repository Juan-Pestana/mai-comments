'use client'

import { Button } from '@/components/ui/button'

import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { useRouter } from 'next/navigation'
import { FormEvent, useEffect, useRef, useState } from 'react'

const ResponsiveTextArea = () => {
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const router = useRouter()

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (inputRef.current?.value) {
      const res = await fetch('http://localhost:8000/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: new Date().getTime(),
          post: 'this_is_a_post',
          text: inputRef.current.value,
          created_at: new Date().getTime(),
          isResponse: false,
          responses: [],
          user: {
            name: 'juan',
            avatar: 'https://i.pravatar.cc/150?img=8',
          },
        }),
      })

      const newComment = await res.json()
      console.log('comentario creado', newComment)

      inputRef.current.value = ''
      inputRef.current.style.height = 'auto'
      router.refresh()
    } else {
      return
    }
  }

  const handleChange = () => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto'
      inputRef.current.style.height = inputRef.current.scrollHeight + 'px'
    }
  }
  return (
    <form
      className="flex flex-col justify-center gap-4 mb-10"
      onSubmit={onSubmit}
    >
      <label htmlFor="comentario" className="text-slate-500">
        Y tu qué opinas?
      </label>
      <Textarea
        name="comentario"
        ref={inputRef}
        onChange={handleChange}
        rows={2}
        className="resize-none min-h-[40px] scrollbar-hide"
      />
      <div className="flex items-center space-x-4 lg:space-x-7">
        <div className="flex items-center space-x-2">
          <Checkbox id="anonymus" />
          <label
            htmlFor="anonymous"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Anonymus
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="Notify" />
          <label
            htmlFor="Notify"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Notify responses
          </label>
        </div>

        <div className="flex-1">
          <Button className="block ml-auto">Comentar</Button>
        </div>
      </div>
    </form>
  )
}

export default ResponsiveTextArea
