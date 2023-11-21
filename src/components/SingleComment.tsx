import { useState } from 'react'
import { IordComment } from '@/types/comment'
import Image from 'next/image'
import CommentInput from './CommentInput'
import { Span } from 'next/dist/trace'

export function SingleComment(comment: IordComment): JSX.Element {
  const [responding, setResponding] = useState<boolean>(false)
  return (
    // if is response comment add ml-16

    <>
      <div className="flex gap-2 px-1 py-1 items-center">
        <div className="object-cover ">
          {comment.user?.avatar && (
            <Image
              className="rounded-full"
              src={comment.user.avatar}
              alt="avatar small"
              //style={{ width: '100%', height: '100%' }}
              width={60}
              height={60}
            />
          )}
        </div>
        <div className="flex-1">
          <div>
            <h5 className="mx-2 text-base font-bold text-slate-400">
              {comment.user?.name}
            </h5>
            <div className="bg-slate-100 rounded-2xl py-2 flex items-center">
              <p className="text-slate-600 px-2">{comment.text}</p>
              <div
                className="ml-auto px-2 cursor-pointer text-slate-400"
                onClick={() => setResponding(!responding)}
              >
                ↩
              </div>
            </div>
          </div>
          <div className="px-3 flex justify-between">
            {comment.responses && comment.responses.length ? (
              <span className="text-slate-400">
                {comment.responses.length} respuestas
              </span>
            ) : (
              <span></span>
            )}
            <span>❤</span>
          </div>
        </div>
      </div>
      {responding && (
        <CommentInput
          postId={comment.post}
          isResponse={true}
          comment={comment}
          setResponding={setResponding}
        />
      )}

      {comment.responses && comment.responses.length
        ? comment.responses.map((response: any) => (
            <div key={response.id} className="ml-10">
              <SingleComment
                key={response.text}
                id={response.id}
                created_at={response.created_at}
                // addCommentToPost={comment.addCommentToPost}
                text={response.text}
                user={response.user}
                post={response.post}
                responses={response.responses}
              />
            </div>
          ))
        : null}
    </>
  )
}
