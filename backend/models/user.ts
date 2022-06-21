export interface Iuser{
     email:string,
     password:string
}

export interface IuserSignup{
    name:string,
    email:string,
    address:string,
    password:string
    token?:string
}

export interface IupdateUser{
    name:string,
    email:string,
    address:string
}