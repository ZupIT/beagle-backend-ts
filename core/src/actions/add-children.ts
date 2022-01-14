import { Expression } from '..'
import { Component } from '../model/component'
import { createCoreAction } from './core-action'

interface AddChildrenParams {
  componentId: string,
  value?: Expression<Component[]>,
  mode?: 'APPEND' | 'PREPEND' | 'REPLACE',
}

export const addChildren = createCoreAction<AddChildrenParams>('addChildren')
