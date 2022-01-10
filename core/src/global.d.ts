declare namespace JSX {
  interface ElementChildrenAttribute {
    children: 'children',
  }

  interface IntrinsicElements {
    component: import('./model/component').ComponentInterface,
  }
}
