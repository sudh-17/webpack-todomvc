import {
  getAll,
  addTodo,
  deleteTodo,
  updateTodo,
  completedAll,
  clearCompleted
} from './api'

function Model() {
  this.data = []
}

Model.prototype.getAll = function() {
  return getAll().then(res => {
    return new Promise(resolve => {
      if (res.status === 200) {
        this.data = res.data
        resolve(res.data)
      } else {
        resolve([])
      }
    })
  })
}

Model.prototype.getLocalData = function() {
  return this.data
}

Model.prototype.addTodo = function(value) {
  return addTodo({ title: value }).then(res => {
    return new Promise(resolve => {
      if (res.status === 200) {
        this.data.push(res.data)
        this.data = JSON.parse(JSON.stringify(this.data))
        resolve(res.data)
      } else {
        resolve(null)
      }
    })
  })
}

Model.prototype.delTodo = function(id) {
  return deleteTodo(id).then(res => {
    return new Promise(resolve => {
      if (res.status === 200) {
        let i = this.data.findIndex(item => item.id === res.data)
        this.data.splice(i, 1)
        this.data = JSON.parse(JSON.stringify(this.data))
        resolve(res.data)
      } else {
        resolve(null)
      }
    })
  })
}

Model.prototype.updateTodo = function(todo) {
  return updateTodo(todo).then(res => {
    return new Promise(resolve => {
      if (res.status === 200) {
        let i = this.data.findIndex(item => item.id === res.data.id)
        this.data.splice(i, 1, res.data)
        this.data = JSON.parse(JSON.stringify(this.data))
        resolve(res.data)
      } else {
        resolve(null)
      }
    })
  })
}

Model.prototype.completedAll = function(value) {
  return completedAll(value).then(res => {
    return new Promise(resolve => {
      if (res.status === 200) {
        this.data = res.data
        resolve(res.data)
      } else {
        resolve(null)
      }
    })
  })
}

Model.prototype.clearCompleted = function() {
  return clearCompleted().then(res => {
    return new Promise(resolve => {
      if (res.status === 200) {
        this.data = res.data
        resolve(res.data)
      } else {
        resolve(null)
      }
    })
  })
}

Model.prototype.watch = function(callback) {
  let watchValue = []
  let lastTimeValue = this.data
  Object.defineProperty(this, 'data', {
    get: function() {
      return watchValue
    },
    set: function(value) {
      watchValue = value
      if (lastTimeValue !== watchValue) {
        lastTimeValue = watchValue
        callback && callback(value)
      }
    }
  })
}

export default Model
