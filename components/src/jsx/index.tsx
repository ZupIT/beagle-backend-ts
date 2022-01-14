import { BeagleJSX as _BeagleJSX, FC } from '@zup-it/beagle-backend-core'
import { Fragment } from '..'

function processChildrenArgs(children: any[]) {
  if (children.length === 0) return undefined
  return children.length === 1 ? children[0] : children
}

export const BeagleJSX = {
  createElement: (jsx: string | FC<any>, props?: Record<string, any>, ...children: any[]): any => {
    const componentChildren = processChildrenArgs(children)
    if (!jsx) return <Fragment>{componentChildren}</Fragment>
    return _BeagleJSX.createElement(jsx, props, componentChildren)
  },
}
