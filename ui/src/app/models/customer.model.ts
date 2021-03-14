import { CustomerType } from "./customer-type.enum";

export interface CustomerModel{
  customerId:number
  name:string
  type:CustomerType
}
