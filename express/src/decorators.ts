import { HttpMethod } from '@zup-it/beagle-backend-core'
import { BeagleApp } from './beagle-app'
import { ScreenClass } from './screen'

let app: BeagleApp | undefined
let screenQueue: Parameters<BeagleApp['addScreen']>[] = []

export const Beagle = () => (AppFactory: { new(): BeagleApp }) => {
  app = new AppFactory()
  if (screenQueue.length) {
    screenQueue.forEach(item => app!.addScreen(...item))
    screenQueue = []
  }
}

function register(method: HttpMethod, path: string, ScreenFactory: ScreenClass) {
  if (!app) screenQueue.push([method, path, ScreenFactory])
  else app.addScreen(method, path, ScreenFactory)
}

export const GetScreen = (path: string) => (ScreenFactory: ScreenClass) => register('get', path, ScreenFactory)
export const PostScreen = (path: string) => (ScreenFactory: ScreenClass) => register('post', path, ScreenFactory)
export const PutScreen = (path: string) => (ScreenFactory: ScreenClass) => register('put', path, ScreenFactory)
export const PatchScreen = (path: string) => (ScreenFactory: ScreenClass) => register('patch', path, ScreenFactory)
export const DeleteScreen = (path: string) => (ScreenFactory: ScreenClass) => register('delete', path, ScreenFactory)
