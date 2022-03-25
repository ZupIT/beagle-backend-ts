import { BeagleJSX, coreNamespace, createContext, createContextNode } from '@zup-it/beagle-backend-core'
import { sum } from '@zup-it/beagle-backend-core/operations'
import { omit } from 'lodash'
import { UnitValue } from 'src/style/full-styles'
import { CornerRadius, EachCornerRadius, Margin, Padding, Position, Size, Style } from 'src/style/simple-styles'
import { StyledComponent, StyledDefaultComponent } from 'src/style/styled'
import { validateColor } from 'src/validations'

jest.mock('src/validations', () => ({
    __esModule: true,
    validateColor: jest.fn(),
}))

describe('Style', () => {
  describe('StyleValue (UnitValue)', () => {
    it('should create a UnitValue (real) from number', () => {
      const component = <StyledComponent name='test' style={{ flexBasis: 1.2 }} />
      expect(component.properties?.style).toEqual({
        flex: {
          basis: { type: 'REAL', value: 1.2 },
        },
      })
    })

    it('should create a UnitValue (real) from an expression', () => {
      const context = createContextNode<number>('ctx')
      const basis = sum(context, 1)
      const component = <StyledComponent name='test' style={{ flexBasis: basis }} />
      expect(component.properties?.style).toEqual({
        flex: {
          basis: { type: 'REAL', value: basis },
        },
      })
    })

    it('should create a UnitValue (percent) from a string', () => {
      const component = <StyledComponent name='test' style={{ flexBasis: '15%' }} />
      expect(component.properties?.style).toEqual({
        flex: {
          basis: { type: 'PERCENT', value: 15 },
        },
      })
    })

    it('should return the UnitValue if it was already a UnitValue', () => {
      const basis: UnitValue = { type: 'PERCENT', value: 20 }
      const component = <StyledComponent name='test' style={{ flexBasis: basis }} />
      expect(component.properties?.style).toEqual({ flex: { basis } })
    })
  })

  describe('Flex', () => {
    it('should create style with every flex property', () => {
      const style: Style = {
        alignContent: 'CENTER',
        alignItems: 'BASELINE',
        alignSelf: 'AUTO',
        flex: 1,
        flexBasis: 2,
        flexDirection: 'COLUMN',
        flexGrow: 3,
        flexShrink: 4,
        flexWrap: 'NO_WRAP',
        justifyContent: 'CENTER',
      }
      const component = <StyledComponent name='test' style={style} />
      expect(component.properties?.style).toEqual({
        flex: {
          ...omit(style, ['flexBasis', 'flexGrow', 'flexShrink']),
          basis: { type: 'REAL', value: 2 },
          grow: 3,
          shrink: 4,
        },
      })
    })
  })

  describe('Corner radius', () => {
    it('should create style with the same value for all corners', () => {
      const component = <StyledComponent name='test' style={{ cornerRadius: 10 }} />
      expect(component.properties?.style).toEqual({ cornerRadius: { radius: 10 } })
    })

    it('should create style with the same value for all corners (expression)', () => {
      const ctx = createContextNode<number>('ctx')
      const component = <StyledComponent name='test' style={{ cornerRadius: ctx }} />
      expect(component.properties?.style).toEqual({ cornerRadius: { radius: ctx } })
    })

    it('should create style with the one value for each corner', () => {
      const cornerRadius: CornerRadius = {
        bottomLeft: 1,
        bottomRight: 2,
        topLeft: 3,
        topRight: 4,
      }
      const component = <StyledComponent name='test' style={{ cornerRadius }} />
      expect(component.properties?.style).toEqual({ cornerRadius })
    })

    it('should create style with the one value for each corner (expression)', () => {
      const ctx = createContextNode<{ [k in keyof EachCornerRadius]: number }>('ctx')
      const cornerRadius: CornerRadius = {
        bottomLeft: ctx.get('bottomLeft'),
        bottomRight: ctx.get('bottomRight'),
        topLeft: ctx.get('topLeft'),
        topRight: ctx.get('topRight'),
      }
      const component = <StyledComponent name='test' style={{ cornerRadius }} />
      expect(component.properties?.style).toEqual({ cornerRadius })
    })
  })

  describe('Position', () => {
    it('should create style with positions', () => {
      const position: Position = {
        top: 10,
        left: 11,
        right: 12,
        bottom: 13,
      }
      const component = <StyledComponent name='test' style={{ ...position }} />
      expect(component.properties?.style).toEqual({
        position: {
          top: { type: 'REAL', value: 10 },
          left: { type: 'REAL', value: 11 },
          right: { type: 'REAL', value: 12 },
          bottom:{ type: 'REAL', value: 13 },
        },
      })
    })
  })

  describe('Padding', () => {
    it('should create style with one padding value for all sides', () => {
      const component = <StyledComponent name='test' style={{ padding: 10 }} />
      expect(component.properties?.style).toEqual({
        padding: { all: { type: 'REAL', value: 10 } },
      })
    })

    it('should create style with padding values for each side', () => {
      const padding: Padding = {
        paddingBottom: 1,
        paddingEnd: 2,
        paddingHorizontal: 3,
        paddingLeft: 4,
        paddingRight: 5,
        paddingStart: 6,
        paddingTop: 7,
        paddingVertical: 8,
      }
      const component = <StyledComponent name='test' style={{ ...padding }} />
      expect(component.properties?.style).toEqual({
        padding: {
          bottom: { type: 'REAL', value: 1 },
          end: { type: 'REAL', value: 2 },
          horizontal: { type: 'REAL', value: 3 },
          left: { type: 'REAL', value: 4 },
          right: { type: 'REAL', value: 5 },
          start: { type: 'REAL', value: 6 },
          top: { type: 'REAL', value: 7 },
          vertical: { type: 'REAL', value: 8 },
        },
      })
    })
  })

  describe('Margin', () => {
    it('should create style with one margin value for all sides', () => {
      const component = <StyledComponent name='test' style={{ margin: 10 }} />
      expect(component.properties?.style).toEqual({
        margin: { all: { type: 'REAL', value: 10 } },
      })
    })

    it('should create style with margin values for each side', () => {
      const margin: Margin = {
        marginBottom: 1,
        marginEnd: 2,
        marginHorizontal: 3,
        marginLeft: 4,
        marginRight: 5,
        marginStart: 6,
        marginTop: 7,
        marginVertical: 8,
      }
      const component = <StyledComponent name='test' style={{ ...margin }} />
      expect(component.properties?.style).toEqual({
        margin: {
          bottom: { type: 'REAL', value: 1 },
          end: { type: 'REAL', value: 2 },
          horizontal: { type: 'REAL', value: 3 },
          left: { type: 'REAL', value: 4 },
          right: { type: 'REAL', value: 5 },
          start: { type: 'REAL', value: 6 },
          top: { type: 'REAL', value: 7 },
          vertical: { type: 'REAL', value: 8 },
        },
      })
    })
  })

  describe('Size', () => {
    it('should create style with size', () => {
      const size: Size = {
        aspectRatio: 1,
        height: 2,
        maxHeight: 3,
        maxWidth: 4,
        minHeight: 5,
        minWidth: 6,
        width: 7,
      }
      const component = <StyledComponent name='test' style={{ ...size }} />
      expect(component.properties?.style).toEqual({
        size: {
          aspectRatio: 1,
          height: { type: 'REAL', value: 2 },
          maxHeight: { type: 'REAL', value: 3 },
          maxWidth: { type: 'REAL', value: 4 },
          minHeight: { type: 'REAL', value: 5 },
          minWidth: { type: 'REAL', value: 6 },
          width: { type: 'REAL', value: 7 },
        },
      })
    })
  })

  describe('Background', () => {
    it('should create style with background-color', () => {
      const component = <StyledComponent name='test' style={{ backgroundColor: '#000' }} />
      expect(component.properties?.style).toEqual({ backgroundColor: '#000' })
    })

    it('should create style with background-color (expression)', () => {
      const ctx = createContextNode<string>('ctx')
      const component = <StyledComponent name='test' style={{ backgroundColor: ctx }} />
      expect(component.properties?.style).toEqual({ backgroundColor: ctx })
    })

    it('should validate background-color', () => {
      (validateColor as jest.Mock).mockClear()
      (<StyledComponent name='test' style={{ backgroundColor: '#000' }} />)
      expect(validateColor).toHaveBeenCalledWith('#000')
    })
  })

  describe('Border', () => {
    it('should create style with border-color', () => {
      const component = <StyledComponent name='test' style={{ borderColor: '#000' }} />
      expect(component.properties?.style).toEqual({ borderColor: '#000' })
    })

    it('should create style with border-color (expression)', () => {
      const ctx = createContextNode<string>('ctx')
      const component = <StyledComponent name='test' style={{ borderColor: ctx }} />
      expect(component.properties?.style).toEqual({ borderColor: ctx })
    })

    it('should validate border-color', () => {
      (validateColor as jest.Mock).mockClear()
      (<StyledComponent name='test' style={{ borderColor: '#000' }} />)
      expect(validateColor).toHaveBeenCalledWith('#000')
    })

    it('should create style with border-width', () => {
      const component = <StyledComponent name='test' style={{ borderWidth: 5 }} />
      expect(component.properties?.style).toEqual({ borderWidth: 5 })
    })

    it('should create style with border-width (expression)', () => {
      const ctx = createContextNode<number>('ctx')
      const component = <StyledComponent name='test' style={{ borderWidth: ctx }} />
      expect(component.properties?.style).toEqual({ borderWidth: ctx })
    })
  })

  describe('Display', () => {
    it('should create style with display', () => {
      const component = <StyledComponent name='test' style={{ display: 'NONE' }} />
      expect(component.properties?.style).toEqual({ display: 'NONE' })
    })

    it('should create style with display (expression)', () => {
      const ctx = createContextNode<'FLEX' | 'NONE'>('ctx')
      const component = <StyledComponent name='test' style={{ display: ctx }} />
      expect(component.properties?.style).toEqual({ display: ctx })
    })
  })

  describe('Other', () => {
    it('should have empty style', () => {
      const component = <StyledComponent name='test' style={{}} />
      expect(component.properties?.style).toEqual({})
    })

    it('should create StyledComponent', () => {
      const ctx = createContext('ctx', 'test')
      const props = { a: 1, b: '2' }
      const child = <component name="child" />
      const style: Style = { display: 'FLEX' }
      const component = (
        <StyledComponent name="test" namespace="namespace" context={ctx} id="id" properties={props} style={style}>
          {child}
        </StyledComponent>
      )
      expect(component).toEqual((
        <component name="test" namespace="namespace" context={ctx} id="id" properties={{ ...props, style }}>
          {child}
        </component>
      ))
    })

    it('should create DefaultStyledComponent', () => {
      const ctx = createContext('ctx', 'test')
      const props = { a: 1, b: '2' }
      const child = <component name="child" />
      const style: Style = { display: 'FLEX' }
      const component = (
        <StyledDefaultComponent name="test" context={ctx} id="id" properties={props} style={style}>
          {child}
        </StyledDefaultComponent>
      )
      expect(component).toEqual((
        <component name="test" namespace={coreNamespace} context={ctx} id="id" properties={{ ...props, style }}>
          {child}
        </component>
      ))
    })
  })
})
