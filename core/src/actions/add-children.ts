import { Expression } from '..'
import { ComponentInterface } from '../model/component'
import { createCoreAction } from './core-action'

interface AddChildrenParams {
  componentId: string,
  value?: ComponentInterface[] | Expression<string>,
  mode?: 'APPEND' | 'PREPEND' | 'REPLACE',
}

export const addChildren = createCoreAction<AddChildrenParams>('addChildren')
