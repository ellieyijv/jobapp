import axios from "axios";
import {getRedirectPath} from '../util'



const ERROR_MSG = 'ERROR_MSG'
const LOAD_DATA = 'LOAD_DATA'
const AUTH_SUCCESS = 'AUTH_SUCCESS'
const LOG_OUT = 'LOG_OUT'
const initState={
    isAuth: false,
    user:'',
    type:'',
    msg:'',
    redirectTo: ''
}

//reducer
export function user(state=initState, action){
    switch (action.type) {
        case LOAD_DATA:
            return {...state, ...action.payload}
        case ERROR_MSG:
            return {...state, isAuth:false, msg:action.msg}
        case AUTH_SUCCESS:
            return {...state, msg:'', redirectTo:getRedirectPath(action.payload), ...action.payload}
        case LOG_OUT:
            return {...initState, redirectTo:'/login'}
        default:
            return state
    }
}
function authSuccess(data) {
    return {type:AUTH_SUCCESS, payload:data}
}


function errorMsg(msg) {
    return {msg, type:ERROR_MSG}
}

export function loadData(userInfo) {
    return {type: LOAD_DATA, payload: userInfo}

}
export function register({user, pwd, repeatpwd, type}){
    if(!user||!pwd||!type){
        return errorMsg('User Name and Password can not be empty')
    }
    if(pwd !==repeatpwd){
        return errorMsg('password is different with re-enter password')
    }
    return dispatch=>{
        axios.post('/user/register', {user, type, pwd})
            .then(res=>{
                if(res.status === 200 && res.data.code ===0){
                    dispatch(authSuccess({user,type}))
                }else{
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }
}
export  function update(data) {
    return dispatch=> {
        axios.post('/user/update', data)
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(authSuccess(res.data.data))
                } else {
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }
}
export function login({user,pwd}) {
    if(!user||!pwd){
        return errorMsg('User Name and Password can not be empty')
    }
    return dispatch=>{
        axios.post('/user/login', {user,pwd})
            .then(res=>{
                if(res.status ===200 && res.data.code ===0){
                    dispatch(authSuccess(res.data.data))
                }else{
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }    
}

export function logoutSubmit(){
    return {type: LOG_OUT}
}