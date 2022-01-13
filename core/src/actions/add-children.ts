import { Expression } from '..'
import { ComponentInterface } from '../model/component'
import { createCoreAction } from './core-action'

interface AddChildrenParams {
  componentId: string,
  value?: Expression<ComponentInterface[]>,
  mode?: 'APPEND' | 'PREPEND' | 'REPLACE',
}

export const addChildren = createCoreAction<AddChildrenParams>('addChildren')
