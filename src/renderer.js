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

function render(virtualNode) {
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
    domNode.appendChild(render(childDomNode))
  );

  return domNode;
}

// JSX -> VDOM:
/** @jsx h */
const VirtualNode = <div id="foo">Hello!</div>;

// VDOM -> DOM:
const VirtualDOM = render(VirtualNode);

const root = document.getElementById('root');

root.appendChild(VirtualDOM);
