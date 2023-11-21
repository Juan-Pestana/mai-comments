'use client'

import React from 'react'
import { SingleComment } from './SingleComment'
import { IordComment } from '@/types/comment'

interface IcommentsProps {
  ordComments: IordComment[] | []
}

export default function Coments({ ordComments }: IcommentsProps) {
  return (
    <>
      {ordComments &&
        ordComments
          //
          .map((comment: IordComment) => (
            <div key={comment.id}>
              <SingleComment
                key={comment.id}
                id={comment.id}
                created_at={comment.created_at}
                text={comment.text}
                post={comment.post}
                user={comment.user}
                responses={comment.responses}
              />
            </div>
          ))}
    </>
  )
}
