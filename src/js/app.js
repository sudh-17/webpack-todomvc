import View from './view.js'
import Model from './model.js'
import Controller from './controller.js'

let view = new View();
let model = new Model();
let controller = new Controller(model, view);

controller.init();