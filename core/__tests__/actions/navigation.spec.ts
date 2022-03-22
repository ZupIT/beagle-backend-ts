import { Component } from 'src'
import { AnalyticsConfig } from 'src/model/action'
import { ContextNode } from 'src/model/context/context-node'
import {
  openExternalUrl, openNativeRoute, popStack, popToView, popView, pushStack, pushView, resetApplication, resetStack,
  OpenExternalUrlParams, OpenNativeRouteParams, PopStackParams, PopToViewParams, PopViewParams, PushStackParams,
  PushViewParams, ResetApplicationParams, ResetStackParams,
} from 'src/actions'
import { expectActionToBeCorrect } from './utils'

describe('Actions: navigation', () => {
  describe('openExternalUrl', () => {
    const properties: OpenExternalUrlParams = {
      url: 'http://test.com',
    }

    it('should create action', () => expectActionToBeCorrect(
      openExternalUrl({ ...properties, analytics: false }),
      'openExternalUrl',
      properties,
      false,
    ))

    it('should create action with url only', () => expectActionToBeCorrect(
      openExternalUrl(properties.url),
      'openExternalUrl',
      properties,
    ))
  })

  describe('openNativeRoute', () => {
    const properties: OpenNativeRouteParams = {
      route: 'my-route',
      data: { id: '01' },
      shouldResetApplication: false,
    }

    const analytics: AnalyticsConfig<OpenNativeRouteParams> = {
      additionalEntries: { test: 'test' },
    }

    it('should create action', () => expectActionToBeCorrect(
      openNativeRoute({ ...properties, analytics }),
      'openNativeRoute',
      properties,
      analytics,
    ))
  })

  describe('popStack and navigation context', () => {
    const analytics: AnalyticsConfig<PopStackParams> = {
      additionalEntries: { test: 'test' },
      attributes: { navigationContext: true },
    }

    it('should create action without properties', () => expectActionToBeCorrect(popStack(), 'popStack'))

    it('should create action with simple navigation context', () => {
      const properties: PopStackParams = {
        navigationContext: { test: 'test-value' },
      }
      const processed = {
        navigationContext: {
          path: 'test',
          value: 'test-value',
        },
      }
      expectActionToBeCorrect(
        popStack({ ...properties, analytics }),
        'popStack',
        processed,
        analytics,
      )
    })

    it('should create action with complex navigation context', () => {
      const properties: PopStackParams = {
        navigationContext: { user: { address: { position: { lat: 58.8, lng: -136.5 } } } },
      }
      const processed = {
        navigationContext: {
          path: 'user.address.position',
          value: { lat: 58.8, lng: -136.5 },
        },
      }
      expectActionToBeCorrect(
        popStack({ ...properties, analytics }),
        'popStack',
        processed,
        analytics,
      )
    })

    it('should create action with a navigation context without path if the context data is invalid', () => {
      const properties: PopStackParams = {
        navigationContext: { user: 'Mary', age: 30 },
      }
      const processed = {
        navigationContext: { value: properties.navigationContext },
      }
      expectActionToBeCorrect(
        popStack({ ...properties, analytics }),
        'popStack',
        processed,
        analytics,
      )
    })
  })

  describe('popToView', () => {
    const properties: PopToViewParams = {
      route: 'test',
      navigationContext: { test: 'test' },
    }

    const analytics: AnalyticsConfig<PopToViewParams> = {
      additionalEntries: { test: 'test' },
      attributes: { route: true },
    }

    it('should create action', () => expectActionToBeCorrect(
      popToView({ ...properties, analytics }),
      'popToView',
      { ...properties, navigationContext: expect.any(Object) },
      analytics,
    ))

    it('should create action with only route', () => expectActionToBeCorrect(
      popToView('test'),
      'popToView',
      { route: 'test' },
    ))
  })

  describe('popView', () => {
    const properties: PopViewParams = {
      navigationContext: { test: 'test' },
    }

    it('should create action', () => expectActionToBeCorrect(
      popView(properties),
      'popView',
      { ...properties, navigationContext: expect.any(Object) },
    ))

    it('should create action without properties', () => expectActionToBeCorrect(popView(), 'popView'))
  })

  describe('pushStack', () => {
    const properties: PushStackParams = {
      route: {
        url: new ContextNode<string>(''),
        fallback: new Component({ name: 'fallback' }),
        httpAdditionalData: { headers: { test: 'test' } },
        shouldPrefetch: false,
      },
      navigationContext: { test: 'test' },
      controllerId: 'my-controller',
    }

    const analytics: AnalyticsConfig<PushStackParams> = {
      additionalEntries: { test: 'test' },
      attributes: { route: true },
    }

    it('should create action', () => expectActionToBeCorrect(
      pushStack({ ...properties, analytics }),
      'pushStack',
      { ...properties, navigationContext: expect.any(Object) },
      analytics,
    ))

    it('should create action with local route', () => {
      const localRouteProps = { route: { screen: new Component({ id: 'test-screen', name: 'screen' }) } }
      expectActionToBeCorrect(pushStack(localRouteProps), 'pushStack', localRouteProps)
    })

    it('should create action with only route', () => expectActionToBeCorrect(
      pushStack('test'),
      'pushStack',
      { route: { url: 'test' } },
    ))
  })

  describe('pushView', () => {
    const properties: PushViewParams = {
      route: {
        url: new ContextNode<string>(''),
        fallback: new Component({ name: 'fallback' }),
        httpAdditionalData: { headers: { test: 'test' } },
        shouldPrefetch: false,
      },
      navigationContext: { test: 'test' },
    }

    const analytics: AnalyticsConfig<PushViewParams> = {
      additionalEntries: { test: 'test' },
      attributes: { route: true },
    }

    it('should create action', () => expectActionToBeCorrect(
      pushView({ ...properties, analytics }),
      'pushView',
      { ...properties, navigationContext: expect.any(Object) },
      analytics,
    ))

    it('should create action with local route', () => {
      const localRouteProps = { route: { screen: new Component({ id: 'test-screen', name: 'screen' }) } }
      expectActionToBeCorrect(pushView(localRouteProps), 'pushView', localRouteProps)
    })

    it('should create action with only route', () => expectActionToBeCorrect(
      pushView('test'),
      'pushView',
      { route: { url: 'test' } },
    ))
  })

  describe('resetApplication', () => {
    const properties: ResetApplicationParams = {
      route: {
        url: new ContextNode<string>(''),
        fallback: new Component({ name: 'fallback' }),
        httpAdditionalData: { headers: { test: 'test' } },
        shouldPrefetch: false,
      },
      controllerId: 'controller',
      navigationContext: { test: 'test' },
    }

    const analytics: AnalyticsConfig<ResetApplicationParams> = {
      additionalEntries: { test: 'test' },
      attributes: { controllerId: true },
    }

    it('should create action', () => expectActionToBeCorrect(
      resetApplication({ ...properties, analytics }),
      'resetApplication',
      { ...properties, navigationContext: expect.any(Object) },
      analytics,
    ))

    it('should create action with local route', () => {
      const localRouteProps = { route: { screen: new Component({ id: 'test-screen', name: 'screen' }) } }
      expectActionToBeCorrect(resetApplication(localRouteProps), 'resetApplication', localRouteProps)
    })

    it('should create action with only route', () => expectActionToBeCorrect(
      resetApplication('test'),
      'resetApplication',
      { route: { url: 'test' } },
    ))
  })

  describe('resetStack', () => {
    const properties: ResetStackParams = {
      route: {
        url: new ContextNode<string>(''),
        fallback: new Component({ name: 'fallback' }),
        httpAdditionalData: { headers: { test: 'test' } },
        shouldPrefetch: false,
      },
      controllerId: 'controller',
      navigationContext: { test: 'test' },
    }

    const analytics: AnalyticsConfig<ResetStackParams> = {
      additionalEntries: { test: 'test' },
      attributes: { controllerId: true },
    }

    it('should create action', () => expectActionToBeCorrect(
      resetStack({ ...properties, analytics }),
      'resetStack',
      { ...properties, navigationContext: expect.any(Object) },
      analytics,
    ))

    it('should create action with local route', () => {
      const localRouteProps = { route: { screen: new Component({ id: 'test-screen', name: 'screen' }) } }
      expectActionToBeCorrect(resetStack(localRouteProps), 'resetStack', localRouteProps)
    })

    it('should create action with only route', () => expectActionToBeCorrect(
      resetStack('test'),
      'resetStack',
      { route: { url: 'test' } },
    ))
  })
})
