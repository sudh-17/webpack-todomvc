import { host, api } from './urls.js'
import axios from 'axios'

var instance = axios.create({
  baseURL: host,
  timeout: 10000
})

export function getAll() {
  return instance.get(api.GetAll)
}

export function addTodo(params) {
  return instance({
    url: api.Add,
    method: 'post',
    data: params
  })
}

export function deleteTodo(id) {
  return instance({
    url: api.Delete + '/' + id,
    method: 'delete'
  })
}

export function updateTodo(todo) {
  return instance({
    url: api.Update,
    method: 'post',
    data: todo
  })
}

export function completedAll(value) {
  return instance({
    url: api.IsCompletedAll,
    method: 'get',
    params: {
      completed: value
    }
  })
}

export function clearCompleted() {
  return instance({
    url: api.ClearCompleted,
    method: 'get'
  })
}
