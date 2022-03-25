import { Component } from '@zup-it/beagle-backend-core'
import {
  popStack, popToView, popView, pushStack, pushView, PushViewParams, resetApplication, resetStack,
} from '@zup-it/beagle-backend-core/actions'
import { AnalyticsConfig } from '@zup-it/beagle-backend-core/model/action'
import { omit } from 'lodash'
import { Navigator } from 'src/navigator'
import { RouteMap } from 'src/route'
import { Screen } from 'src'

describe('Navigator', () => {
  const component = new Component({ name: 'test' })
  const screenA = () => component
  const screenB = () => component
  const screenC = () => component
  const screenD = () => component
  const routes: RouteMap = {
    'my-screen-a': screenA,
    'my-screen-b': { screen: screenB },
    'my-screen-c': { method: 'post', screen: screenC },
    'my-screen-d/:id/:resource': screenD,
  }
  const navigator = new Navigator(routes)

  describe('Push and reset navigations', () => {
    function testNavigation(navigatorFn: any, actionFactory: any, options?: any) {
      const actionA = navigatorFn(screenA, options)
      const actionB = navigatorFn(screenB, options)
      const actionC = navigatorFn(screenC, options)
      expect(actionA).toEqual(actionFactory({ route: { url: 'my-screen-a' } }))
      expect(actionB).toEqual(actionFactory({ route: { url: 'my-screen-b' } }))
      expect(actionC).toEqual(actionFactory({
        route: {
          url: 'my-screen-c',
          httpAdditionalData: { method: 'post' },
        },
      }))
    }

    it('should create actions to pushView', () => {
      testNavigation(navigator.pushView, pushView)
    })

    it('should create actions to pushStack', () => {
      testNavigation(navigator.pushStack, pushStack)
    })

    it('should create actions to resetStack', () => {
      testNavigation(navigator.resetStack, resetStack)
    })

    it('should create actions to resetApplication', () => {
      testNavigation(navigator.resetApplication, resetApplication)
    })

    it('should throw error when navigating to unregistered screen', () => {
      expect(() => navigator.pushView(() => component)).toThrow()
    })
  })

  describe('Pop navigations', () => {
    it('should create action to popView', () => {
      const action = navigator.popView()
      expect(action).toEqual(popView())
    })

    it('should create action to popToView', () => {
      const actionA = navigator.popToView(screenA)
      const actionC = navigator.popToView(screenC)
      expect(actionA).toEqual(popToView({ route: 'my-screen-a' }))
      expect(actionC).toEqual(popToView({ route: 'my-screen-c' }))
    })

    it('should create action to popStack', () => {
      const action = navigator.popStack()
      expect(action).toEqual(popStack())
    })
  })

  describe('Options', () => {
    function testActionWithOptions(screen: Screen, navigationFn: any, options: any, expected: any) {
      const action = (navigationFn === navigator.popView || navigationFn === navigator.popStack)
        ? navigationFn(options)
        : navigationFn(screen, options)
      expect(action).toEqual(expected)
    }

    function testAllPushResetActions(
      options: any,
      expectedParams: any,
      { exclude = [], screen = screenA }: { exclude?: string[], screen?: Screen } = {}) {
      if (!exclude.includes('pushView')) {
        testActionWithOptions(screen, navigator.pushView, options, pushView(expectedParams))
      }
      if (!exclude.includes('pushStack')) {
        testActionWithOptions(screen, navigator.pushStack, options, pushStack(expectedParams))
      }
      if (!exclude.includes('resetStack')) {
        testActionWithOptions(screen, navigator.resetStack, options, resetStack(expectedParams))
      }
      if (!exclude.includes('resetApplication')) {
        testActionWithOptions(screen, navigator.resetApplication, options, resetApplication(expectedParams))
      }
    }

    function testAllPopActions(options: any, expectedParams: any, screen: Screen = screenA) {
      testActionWithOptions(screen, navigator.popView, options, popView(omit(expectedParams, 'route')))
      testActionWithOptions(screen, navigator.popStack, options, popStack(omit(expectedParams, 'route')))
      testActionWithOptions(screen, navigator.popToView, options, popToView(expectedParams))
    }

    it('should create action with analytics', () => {
      const analytics: AnalyticsConfig<PushViewParams> = { additionalEntries: { test: 1 }, attributes: { route: true } }
      testAllPushResetActions({ analytics }, { route: { url: expect.any(String) }, analytics })
      testAllPopActions({ analytics }, { route: expect.any(String), analytics })
    })

    it('should create action with request body', () => {
      const body = { a: 1, b: 2, c: '3' }
      testAllPushResetActions(
        { body },
        { route: { url: expect.any(String), httpAdditionalData: { body, method: 'post' } } },
        { screen: screenC },
      )
    })

    it('should create action with controllerId', () => {
      const controllerId = 'test'
      testAllPushResetActions(
        { controllerId },
        { route: { url: expect.any(String) }, controllerId },
        { exclude: ['pushView'] },
      )
    })

    it('should create action with fallback', () => {
      const fallback = new Component({ name: 'fallback' })
      testAllPushResetActions({ fallback }, { route: { url: expect.any(String), fallback } })
    })

    it('should create action with headers', () => {
      const headers = { 'my-header': 'my-value' }
      testAllPushResetActions({ headers }, { route: { url: expect.any(String), httpAdditionalData: { headers } } })
    })

    it('should create action with navigationContext', () => {
      const navigationContext = { address: { zip: '00000000' } }
      testAllPushResetActions({ navigationContext }, { route: { url: expect.any(String) }, navigationContext })
      testAllPopActions({ navigationContext }, { route: expect.any(String), navigationContext })
    })

    it('should create action with query params', () => {
      const query = { a: 'hello world', b: '&?' }
      const expectedUrl = expect.stringMatching(/\?((a=hello%20world&b=%26%3F)|(b=%26%3F&a=hello%20world))$/)
      testAllPushResetActions(
        { query },
        { route: { url: expectedUrl },
      })
      testActionWithOptions(screenA, navigator.popToView, { query }, popToView({ route: expectedUrl }))
    })

    it('should create action with route params', () => {
      const routeParams = { id: 'a & b', resource: 'test' }
      const expectedUrl = 'my-screen-d/a%20%26%20b/test'
      testAllPushResetActions(
        { routeParams },
        { route: { url: expectedUrl } },
        { screen: screenD },
      )
      testActionWithOptions(screenD, navigator.popToView, { routeParams }, popToView({ route: expectedUrl }))
    })

    it('should create action with shouldPrefetch', () => {
      const shouldPrefetch = true
      testAllPushResetActions({ shouldPrefetch }, { route: { url: expect.any(String), shouldPrefetch } })
    })
  })
})
