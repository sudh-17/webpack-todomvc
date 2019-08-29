let  host = 'http://127.0.0.1:9527'

// if (process.env.NODE_ENV === 'production') {
//   host = 'http://10.10.1.17:9527'
// }

const api = {
  GetAll: '/getAll',
  Add: '/add',
  DeleteById: '/deleteById',
  Delete: 'delete',
  Update: '/update',
  IsCompletedAll: 'isCompletedAll',
  ClearCompleted: 'clearCompleted'
}

export { host, api }
