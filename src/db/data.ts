export const data = {
  comments: [
    {
      id: 1,
      created_at: 1,
      text: 'primer comentario',
      //isResponse: false,
      post: 'test',
      user: {
        name: 'Juan',
        avatar: 'https://i.pravatar.cc/150?img=3',
      },

      parent: undefined,
    },
    {
      id: 2,
      created_at: 2,
      text: 'dentro del comentario',
      //isResponse: true,
      user: {
        name: 'Juan',
        avatar: 'https://i.pravatar.cc/150?img=4',
      },
      post: 'test',
      //responses: [],
      parent: 1,
    },
    {
      id: 1699815112212,
      post: 'this_is_a_post',
      text: 'Nuevo comentario',
      created_at: 1699815112212,
      //isResponse: false,
      //responses: [],
      user: {
        name: 'juan',
        avatar: 'https://i.pravatar.cc/150?img=8',
      },
      parent: undefined,
    },
    {
      id: 1699815119848,
      post: 'test',
      text: 'Respuesta',
      created_at: 1699815119848,
      user: {
        name: 'juan',
        avatar: 'https://i.pravatar.cc/150?img=8',
      },
      parent: 1,
    },
    {
      id: 4,
      created_at: 4,
      text: 'tercer nivel',
      //isResponse: false,
      post: 'test',
      user: {
        name: 'Juan',
        avatar: 'https://i.pravatar.cc/150?img=3',
      },

      parent: 1699815119848,
    },
  ],
}
