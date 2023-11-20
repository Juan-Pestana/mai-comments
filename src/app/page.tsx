import ResponsiveTextArea from '@/components/ResponsiveTextArea'
import Comments from '@/components/Comments'
import { IordComment } from '@/types/comment'
import { Icomment } from '@/types/comment'

const asignResponse = (id: number, comments: Icomment[]) => {
  let found = comments.find((c) => c.id === id)
  let response: any = {}
  if (found) {
    response.created = found.created_at
    response.id = found.id
    response.isResponse = found.isResponse
    response.post = found.post
    response.text = found.text
    response.user = found.user
    response.responses = found.responses

    if (response.responses && response.responses.length) {
      response.responses = response.responses
        .map((res: number) => asignResponse(res, comments))
        .sort(function (a: Icomment, b: Icomment) {
          return b.created_at - a.created_at
        })
    }

    return response
  }
}

const CommentsPage = async () => {
  const res = await fetch('http://localhost:8000/comments', {
    cache: 'no-store',
  })
  const comments: Icomment[] = await res.json()
  const ordComments: IordComment[] = comments
    .filter((c: Icomment) => !c.isResponse)
    .map((comment: Icomment) => ({
      id: comment.id,
      text: comment.text,
      created_at: comment.created_at,
      user: comment.user,
      isResponse: comment.isResponse,
      post: comment.post,
      responses:
        comment.responses && comment.responses.length
          ? comment.responses
              .map((resp: number) => asignResponse(resp, comments))
              .sort(function (a: IordComment, b: IordComment) {
                return b.created_at - a.created_at
              })
          : [],
    }))
    .sort(function (a: IordComment, b: IordComment) {
      return b.created_at - a.created_at
    })

  console.log('estos son los ordComments en el servidor', ordComments)

  return (
    <div className="w-full flex justify-center py-20">
      <div className=" px-2 w-full md:w-1/2 xl:w-1/3">
        <ResponsiveTextArea />
        <Comments ordComments={ordComments} />
      </div>
    </div>
  )
}

export default CommentsPage
