import ResponsiveTextArea from '@/components/ResponsiveTextArea'
import Comments from '@/components/Comments'

import { IordComment } from '@/types/comment'
import { Icomment } from '@/types/comment'
import { data } from '@/db/data'
import { auth, signIn, signOut } from '../../auth'
import { Button } from '@/components/ui/button'

const asignResponse = (id: number, comments: Icomment[]) => {
  const response: IordComment[] = comments
    .filter((c) => c.parent === id)
    .map((c) => {
      return {
        ...c,
        responses: asignResponse(c.id, comments).sort(function (
          a: IordComment,
          b: IordComment
        ) {
          return b.created_at - a.created_at
        }),
      }
    })
    .sort(function (a: IordComment, b: IordComment) {
      return b.created_at - a.created_at
    })

  return response
}

const CommentsPage = async () => {
  let ordComments: IordComment[] = []

  try {
    if (data) {
      const comments: Icomment[] = data.comments
      ordComments = comments
        .filter((c: Icomment) => !c.parent)
        .map((comment: Icomment) => ({
          ...comment,
          responses: asignResponse(comment.id, comments),
        }))
        .sort(function (a: IordComment, b: IordComment) {
          return b.created_at - a.created_at
        })
    }
  } catch (error) {
    console.log(error)
  }

  return (
    <div className="w-full flex justify-center py-20">
      <div className=" px-2 w-full md:w-1/2 xl:w-1/3">
        <ResponsiveTextArea />
        <hr className="mb-5" />
        {ordComments ? <Comments ordComments={ordComments} /> : null}
      </div>
    </div>
  )
}

export default CommentsPage
