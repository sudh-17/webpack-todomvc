function qs (arg1, arg2) {
  if (typeof arg1 === 'object') {
    return arg1.querySelector(arg2)  
  } else if (typeof arg1 === 'string'){
    return document.querySelector(arg1)
  } else {
    return null
  }
}

function qsa (arg1, arg2) {
  if (typeof arg1 === 'object') {
    return arg1.querySelectorAll(arg2)  
  } else if (typeof arg1 === 'string'){
    return document.querySelectorAll(arg1)
  } else {
    return null
  }
}

function $on (target, type, callback, useCapture) {
  target.addEventListener(type, callback, !!useCapture)
}

function $delegated (target, selector, type, handler) {
  function dispatchEvent(event) {
    var targetElement = event.target
    var potentialElements = qsa(selector, target)
    var hasMatch = Array.prototype.indexOf.call(potentialElements, targetElement) >= 0

    if (hasMatch) {
      handler.call(targetElement, event)
    }
  }
  var useCapture = type === 'blur' || type === 'focus'
  $on(target, type, dispatchEvent, useCapture)
}

function $insertAfter(dom, newNode) {
  dom.parentNode.insertBefore(newNode, dom.nextSibling)
}

function S4() {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
}
// 生成uuid
function createUUID() {
  return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4())
}

//字符串转 dom
function parseDom(str) {
  let parent = document.createElement('div')
  parent.innerHTML = str
  return parent.childNodes
}

// 添加子dom
function appendChild (parent, str) {
 let nodes = this.parseDom(str)
 nodes.forEach(node => {
   parent.appendChild(node)
 })
}

module.exports = {
  qs,
  qsa,
  $delegated,
  $insertAfter,
  createUUID,
  parseDom,
  appendChild
}
