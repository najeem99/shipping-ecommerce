 
export interface GetUsers {
  user: User
}

export interface User {
  id:number,
  name: string
  phoneNumber: string
  email: string
  currency: string
  language: string
  image: string
  address: Address[]
  password: string
  orders: Order[]
}

export interface Address {
  id: number
  city: string
  country: string
  area: string
  building: string
  landmark: string
  isDefault: boolean
}

export interface Order {
  productId: string
  deliveryAddress: string
  paymentMethod: PaymentMethod
  baseAmount: string
  taxAmount: string
  totalAmount: string
  currency: string
}

export interface PaymentMethod {
  type: string
  currency: string
}
