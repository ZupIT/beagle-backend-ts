export interface Rating {
  rate: number,
  count: number,
}

export interface Product {
  id: number,
  title: string,
  price: number,
  description: string,
  category: string,
  image: string,
  rating: Rating,
}

export interface Address {
  cep: string,
  street: string,
  number: string,
  city: string,
  state: string,
}
