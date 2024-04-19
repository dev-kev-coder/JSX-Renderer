"use strict";

/** Notes:
 *
 * In this file the h() would be the thing helping us build our "Virtual DOM"
 *
 * The render() method consumes this object and then knows, based on the data,
 * how to create actual DOM elements the the HTML document.
 */

function h(nodeName, attributes) {
  var _ref;
  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }
  var children = args.length ? (_ref = []).concat.apply(_ref, args) : null;
  return {
    nodeName: nodeName,
    attributes: attributes,
    children: children
  };
}
function innerRender(virtualNode) {
  // Strings just convert to #text Nodes:
  if (virtualNode.split) return document.createTextNode(virtualNode);

  // create a DOM element with the nodeName of our VDOM element:
  var domNode = document.createElement(virtualNode.nodeName);

  // copy attributes onto the new node:
  var attributes = virtualNode.attributes || {};
  Object.keys(attributes).forEach(function (attrName) {
    return domNode.setAttribute(attrName, attributes[attrName]);
  });

  // render (build) and then append child nodes:
  (virtualNode.children || []).forEach(function (childDomNode) {
    return domNode.appendChild(innerRender(childDomNode));
  });
  return domNode;
}
function render(rootNode, virtualNode) {
  var virtualDOM = innerRender(virtualNode);
  rootNode.appendChild(virtualDOM);
}

// JSX -> VDOM:
/** @jsx h */
var App = h("div", {
  id: "foo"
}, "Hello! World sdfsdfsdfsdfsdf");
var root = document.getElementById('root');

// VDOM -> DOM:
render(root, App);
root.appendChild(VirtualDOM);