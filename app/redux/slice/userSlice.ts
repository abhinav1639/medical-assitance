"use client"
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name:"user",
    initialState :{
        userData:null,
        profileData:null,
        doctorSession:null,
        appointment:[],
        allNotifications:[],
        allSession:[]
    },
    reducers:{
        setUser :(state,action:PayloadAction<any>)=>{
             state.userData=action.payload 
        },
        setProfileData :(state,action:PayloadAction<any>)=>{
            state.profileData=action.payload
        },
        setDoctorSession :(state,action:PayloadAction<any>)=>{
            state.doctorSession=action.payload
        },
        setAppointment :(state,action:PayloadAction<any>)=>{
            state.appointment=action.payload
        },
        setAllNotifications :(state,action:PayloadAction<any>)=>{
            state.allNotifications=action.payload
        },
        setAllSession :(state,action:PayloadAction<any>)=>{
            state.allSession=action.payload
        },


    }
})

export const {setUser,setProfileData,setDoctorSession,setAppointment,setAllNotifications,setAllSession} = userSlice.actions

export default userSlice.reducer

