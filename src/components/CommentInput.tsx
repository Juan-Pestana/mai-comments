'use client'

import { FormEvent, useRef } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { IordComment } from '@/types/comment'

interface IcommentInputProps {
  postId: string
  isResponse: boolean
  setResponding: React.Dispatch<React.SetStateAction<boolean>>
  comment: IordComment
}

export default function CommentInput({
  postId,
  isResponse,
  setResponding,
  comment,
}: IcommentInputProps) {
  //const user = pb.authStore.model

  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const user = {
    name: 'juan',
    avatar: 'https://i.pravatar.cc/150?img=8',
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()

    //creamos el nuevo comentario
    if (inputRef.current?.value) {
      const res = await fetch('http://localhost:8000/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: new Date().getTime(),
          post: postId,
          text: inputRef.current.value,
          created_at: new Date().getTime(),
          isResponse: isResponse,
          responses: [],
          user: user,
        }),
      })

      const newComment = await res.json()
      console.log('comentario creado', newComment)

      if (newComment) {
        //actualizamos el comentario padre

        const res = await fetch(
          `http://localhost:8000/comments/${comment.id}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              ...comment,
              responses: [
                newComment.id,
                ...comment.responses.map((resp) => resp.id),
              ],
            }),
          }
        )
      }

      inputRef.current.value = ''
      inputRef.current.style.height = 'auto'
      setResponding(false)
      router.refresh()
    } else {
      return
    }
  }

  return (
    <>
      <div className="flex gap-2  items-center border-l-4 border-yellow-500 border-solid py-5 ml-16 bg-slate-300 px-2 mr-1 rounded-xl mb-3">
        <div className="object-cover">
          {user ? (
            <Image
              className="rounded-full"
              src={user.avatar}
              alt="avatar small"
              width={48}
              height={48}
            />
          ) : (
            <div className="w-11 h-11"></div>
          )}
        </div>
        <form className="w-full" onSubmit={onSubmit}>
          <div className="relative flex items-center  w-full rounded-xl  ">
            <input
              ref={inputRef}
              className="w-full p-2 text-slate-600 rounded-xl bg-slate-100 outline-none"
              type="text"
              placeholder="what do u think"
              autoFocus={isResponse ? true : false}
            />
          </div>
        </form>
      </div>
    </>
  )
}
