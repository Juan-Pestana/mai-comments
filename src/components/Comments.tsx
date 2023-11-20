'use client'

import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { SingleComment } from './SingleComment'
import { IordComment } from '@/types/comment'

interface IcommentsProps {
  ordComments: IordComment[] | []
}

export default function Coments({ ordComments }: IcommentsProps) {
  //const allComments = await getComments(postId)

  // fetch the comments

  return (
    <>
      {ordComments &&
        ordComments
          .filter((comment: IordComment) => !comment.isResponse)
          .map((comment: IordComment) => (
            <div key={comment.id}>
              <SingleComment
                key={comment.id}
                id={comment.id}
                created_at={comment.created_at}
                text={comment.text}
                isResponse={comment.isResponse}
                post={comment.post}
                user={comment.user}
                //addCommentToPost={addCommentToPost}
                responses={comment.responses}
              />
            </div>
          ))}
    </>
  )
}
