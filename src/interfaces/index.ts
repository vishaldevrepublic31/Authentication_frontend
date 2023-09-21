import { ReactNode } from "react";

export interface ILogin {
  email: string;
  password: string;
}

export interface IRegister {
  first_name: string
  last_name: string
  email: string
  password: string
  cpassword: string
  gender: string
  age: string
  phone: string
  answer:string
}

export interface ICard {
  [x: string]: ReactNode;
  first_name: string
  last_name: string
  _id:string
  post:[]
}

export interface IAddPost {
  title:string
  description:string
  avatar:string
}

export interface INavigation {
  name:string
  to:string
}

export interface IForgotePassword {
  email:string
  password:string
  answer:string
}

export interface IUpdateProfile{
  first_name:string
  last_name:string
  phone:string
  age:string
  gender:string
  answer:string
}