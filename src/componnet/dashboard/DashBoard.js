import React from 'react'
import {NavBar} from 'antd-mobile'
import {connect} from 'react-redux'
import NavLinkBar from '../navlink/Navlink'
import {Switch, Route} from 'react-router-dom'
import Boss from '../boss/Boss'
import Seeker from '../seeker/Seeker'
import UserSetting from "../user/UserSetting";
import Message from "../msg/msg"
import { getMsgList, recvMsg } from "../../redux/chat.redux"
import Redirect from 'react-router/es/Redirect';



@connect(
    state=>state,
    {getMsgList, recvMsg}
)
class DashBoard extends React.Component{
    componentDidMount(){
        if(!this.props.chat.chatmsg.length){
            this.props.getMsgList()
            this.props.recvMsg()
            console.log('dashboard recv')
        }
        
    }

    
    render(){
        const pathname = this.props.location.pathname
        if(pathname === '/'){
            return <Redirect to="/login"></Redirect> 
        }
        const user = this.props.user
        const navList = [
            {path: '/boss',
                text:'people you might interested',
                icon:'boss',
                title:'People List',
                component: Boss,
                hide:user.type==='seeker'
                },
            {path: '/seeker',
                text:'Job',
                icon:'job',
                title:'Job List',
                component: Seeker,
                hide:user.type==='boss'
            },
            {path: '/msg',
                text:'messages',
                icon:'msg',
                title:'Message List',
                component: Message
            },
            {path: '/me',
                text:'Me',
                icon:'user',
                title:'Personal Setting',
                component: UserSetting
            }]
       
        return (
          
           <div>
               <NavBar className='fixed-header' mode='dark'>{navList.find(v=>v.path===pathname).title}</NavBar>
                <div style={{marginTop:45}}>
                    <Switch>
                        {navList.map(v=>(
                            <Route key={v.path} path={v.path} component={v.component}></Route>
                        ))}
                    </Switch>
                </div>
               <NavLinkBar  data={navList}></NavLinkBar>
           </div>
        );
    }
}

export default DashBoard