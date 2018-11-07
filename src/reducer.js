import React from 'react'

const ADD_APPLE = 'add apple'
const REMOVE_APPLE = 'remove apple'

export function counter(state=0, action) {
    switch (action.type) {
        case ADD_APPLE:
            return state+1
        case  REMOVE_APPLE:
            return state-1
        default:
            return 10

    }
}

export function addApple(){
    return {type: ADD_APPLE}
}

export function removeApple(){
    return {type: REMOVE_APPLE}
}

export  function addAppleAsync() {
    return dispatchPara=>{
        setTimeout(()=>{
            dispatchPara(addApple())
        }, 2000)
    }
}