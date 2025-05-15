import { createSlice } from "@reduxjs/toolkit";


export const registerSlice=createSlice({
    name:'register',
    initialState:{
        firstName:'',
        lastName:'',
        email:'',
        password:''
    },
    reducers:{
        setFirstName:(state,action)=>{
            state.firstName=action.payload
        },
        setLastName:(state,action)=>{
            state.lastName=action.payload
        },
        setEmail:(state,action)=>{
            state.email=action.payload
        },
        setPassword:(state,action)=>{
            state.password=action.payload
        }
    }
})

export const {setFirstName,setLastName,setEmail,setPassword}=registerSlice.actions

export const selectFirstName=(state)=>state.register.firstName
export const selectLastName=(state)=>state.register.lastName
export const selectEmail=(state)=>state.register.email
export const selectPassword=(state)=>state.register.password

export default registerSlice.reducer

