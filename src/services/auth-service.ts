
import axios from "axios";
import { ILogin, IRegister, IUpdateProfile } from "../interfaces";

const PORT = 'http://localhost:5000/api/v1/user/'

export const RegisteredUser =async (formData: IRegister) => {
    return await axios.post(`${PORT}register`,formData)
}

export const LoginUser = async (formData:ILogin)=>{
    return axios.post(`${PORT}login`,formData)
}

export const Profile = async(token: any)=>{
    return axios.get(`${PORT}me` ,
     {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }})
}

export const UpdateProfileApi =async (token: string | null,data: IUpdateProfile) => {
    console.log("data->",data);
    console.log("token->",token);
    
    return axios.put(`${PORT}update-profile`,data,
     {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
    },
    )

}

export const ForgetPassword =async (data: any) => {
   return axios.post(`${PORT}forget-password`,data)

}

export const AllUsers =async (params: { search: string; }) => {
    return axios.get(`${PORT}users`, { params })
 
 }


