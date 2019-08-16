/***
 * author sdh
 */
function Controller(model, view) {
  this.model = model;
  this.view = view;
}

// 初始化
Controller.prototype.init = function () {
  this.showAll();
  this.initAction();
  this.model.watch(todos => {
    console.log('change', todos)
    let unCompletedItems = todos.filter(item => item.completed === false)
    this.view.setTodoCount(unCompletedItems.length)
    let completedItems = todos.filter(item => item.completed === true)
    this.view.clearVisible(completedItems.length > 0)
    this.view.setToggleAll(completedItems.length > 0 && completedItems.length === todos.length)
    this.view.toggleAllVisible(todos.length > 0)
    this.view.footerVisible(todos.length > 0)
  })
};

Controller.prototype.showAll = function () {
  this.model.getAll().then(data => {
    this.view.showList(data);
  });
};

Controller.prototype.initAction = function () {
  this.view.newTodoAction(value => {
    this.model.addTodo(value).then(todo => {
      if (todo) {
        this.view.addItem(todo)
      }
    })
  })

  this.view.delAction(id => {
    this.model.delTodo(id).then(removeId => {
      if (removeId) {
        this.view.removeItem(removeId)
      }
    })
  })

  this.view.toggleAction((id, value, target) => {
    this.model.updateTodo({id: id, completed: value})
      .then(res => {
        if (!res) {
          target.checked = !value
        }
      })
  })

  this.view.toggleAllAction(e => {
    let value = e.target.checked
    this.model.completedAll(value).then(data => {
      if (data) {
        this.view.showList(data)
      }
    })
  })

  this.view.clearAction(e => {
    this.model.clearCompleted().then(data => {
      if (data) {
        this.view.showList(data)
      }
    })
  })

  this.view.filterAction(filter => {
    let data = this.model.getLocalData()
    if (filter.toLowerCase() === 'completed') {
      this.view.showList(data.filter(item => item.completed === true))
    } else if (filter.toLowerCase() === 'active') {
      this.view.showList(data.filter(item => item.completed === false))
    } else {
      this.view.showList(data)
    }
  })
};

export default Controller;
