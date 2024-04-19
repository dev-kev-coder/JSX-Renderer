/** Notes:
 *
 * In this file the h() would be the thing helping us build our "Virtual DOM"
 *
 * The render() method consumes this object and then knows, based on the data,
 * how to create actual DOM elements the the HTML document.
 */

function h(nodeName, attributes, ...args) {
  let children = args.length ? [].concat(...args) : null;

  return { nodeName, attributes, children };
}

function innerRender(virtualNode) {
  // Strings just convert to #text Nodes:
  if (virtualNode.split) return document.createTextNode(virtualNode);

  // create a DOM element with the nodeName of our VDOM element:
  let domNode = document.createElement(virtualNode.nodeName);

  // copy attributes onto the new node:
  let attributes = virtualNode.attributes || {};

  Object.keys(attributes).forEach(attrName =>
    domNode.setAttribute(attrName, attributes[attrName])
  );

  // render (build) and then append child nodes:
  (virtualNode.children || []).forEach(childDomNode =>
    domNode.appendChild(innerRender(childDomNode))
  );

  return domNode;
}

function render(rootNode, virtualNode) {
  const virtualDOM = innerRender(virtualNode);

  rootNode.appendChild(virtualDOM);
}

// JSX -> VDOM:
/** @jsx h */
const App = <div id="foo">Hello! World sdfsdfsdfsdfsdf</div>;

const root = document.getElementById('root');

// VDOM -> DOM:
render(root, App);

root.appendChild(VirtualDOM);
