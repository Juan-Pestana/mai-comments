// if (inputRef.current?.value) {
//     const res = await fetch('http://localhost:8000/comments', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         id: new Date().getTime(),
//         post: 'this_is_a_post',
//         text: inputRef.current.value,
//         created_at: new Date().getTime(),
//         isResponse: false,
//         responses: [],
//         user: {
//           name: 'juan',
//           avatar: 'https://i.pravatar.cc/150?img=8',
//         },
//       }),
//     })

//     const newComment = await res.json()
//     console.log('comentario creado', newComment)

//     inputRef.current.value = ''
//     inputRef.current.style.height = 'auto'
//     router.refresh()
//   } else {
//     return
//   }
