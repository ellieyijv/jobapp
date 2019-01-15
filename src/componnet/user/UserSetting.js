
import React from 'react'
import {connect} from 'react-redux'
import {Result, List, WhiteSpace} from 'antd-mobile'
//import browserCookie from 'browser-cookies'
/*import {logoutSubmit} from '../../redux/user.redux'*/


/*function hello(){
    console.log("hello")
}

function wraphello(fn){
    return function(){
        console.log("before hello")
        fn()
        console.log("after hello")
    }
}

const helloFn = wraphello(hello)
helloFn()*/


/*
function wrapperHellofn(Comp){
    class wrapperHello extends React.Component{
        render(){
            return(
                <div>
                    <p>hello</p>
                    <Comp {...this.props}></Comp>
                </div>
            )
        }
    }
    return wrapperHello
}

@wrapperHellofn
class Hello extends React.Component{
    render(){
        return <h2>THis is original Hello</h2>
    }
}
*/


@connect(
    state=>state.user,
    null
)
class UserSetting extends React.Component{

    logout=()=>{

        console.log("logout")
       /*  const alert = Modal.alert

         alert('LogOut', 'Are you sure???', [
             { text: 'Cancel', onPress: () => console.log('cancel') },
             { text: 'Ok', onPress: () => {
                     browserCookie.erase('userid')

                 }}

         ])*/
    }

     render(){
         const props = this.props
         const Item = List.Item
         const Brief = Item.Brief

         return  props.user? (

                 <div>

                    <Result
                         img={<img src={require(`../img/${props.avatar}.png`)} style={{width:70}} alt="avatar" />}
                         title={props.user}
                         message={props.type==='boss'?props.company:null}
                     />
                     <List renderHeader={()=>'Summary'}>
                         <Item multipleLine>
                             {props.title}
                             {props.desc.split('\n').map(v=><Brief key={v}>{v}</Brief>)}
                             {props.money?<Brief>Salary:{props.money}</Brief>:null}
                         </Item>
                     </List>
                     <WhiteSpace></WhiteSpace>
                     <List>
                         <Item onClick={()=>this.logout()}>LogOut</Item>
                     </List>

                 </div>
             ):null
     }
}


export default UserSetting
