function qs(arg1, arg2) {
  if (typeof arg1 === "object") {
    return arg1.querySelector(arg2);
  } else if (typeof arg1 === "string") {
    return document.querySelector(arg1);
  } else {
    return null;
  }
}

function qsa(arg1, arg2) {
  if (typeof arg1 === "object") {
    return arg1.querySelectorAll(arg2);
  } else if (typeof arg1 === "string") {
    return document.querySelectorAll(arg1);
  } else {
    return null;
  }
}

function $on(target, type, callback, useCapture) {
  target.addEventListener(type, callback, !!useCapture);
}

function $delegated(target, selector, type, handler) {
  function dispatchEvent(event) {
    let targetElement = event.target;
    let potentialElements = qsa(selector, target);
    let hasMatch =
      Array.prototype.indexOf.call(potentialElements, targetElement) >= 0;

    if (hasMatch) {
      handler.call(targetElement, event);
    }
  }
  let useCapture = type === "blur" || type === "focus";
  $on(target, type, dispatchEvent, useCapture);
}

function $insertAfter(dom, newNode) {
  dom.parentNode.insertBefore(newNode, dom.nextSibling);
}

//字符串转 dom
function parseDom(str) {
  let parent = document.createElement("div");
  parent.innerHTML = str;
  return parent.childNodes;
}

// 添加子dom
function appendChild(parent, str) {
  let nodes = parseDom(str);
  nodes.forEach(node => {
    parent.appendChild(node);
  });
}

function createElement (str) {
  let parent = document.createElement("div");
  parent.innerHTML = str;
  return parent.childNodes[0];
}

module.exports = {
  qs,
  qsa,
  $on,
  $delegated,
  $insertAfter,
  parseDom,
  createElement,
  appendChild
};
