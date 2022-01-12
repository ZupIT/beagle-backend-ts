import { Component } from '../model/component'
import { FC } from './types'

export const React = {
  createElement: (jsx: FC<any> | string, props?: any, children?: FC<any>[]) => {
    if (typeof jsx === 'function') return jsx({ ...props, children })
    if (jsx !== 'component') {
      throw new Error(`Invalid Beagle JSX element "${jsx}". Did you mean "component"?`)
    }
    return new Component(props)
  },
}
