import React from 'react'
import {NavBar} from 'antd-mobile'
import {connect} from 'react-redux'
import NavLinkBar from '../navlink/Navlink'
import {Switch, Route} from 'react-router-dom'
import Boss from '../boss/Boss'
import Seeker from '../seeker/Seeker'
import UserSetting from "../user/UserSetting";



function Message(){
    return <h2>massage page</h2>

}




@connect(
    state=>state
)
class DashBoard extends React.Component{


    render(){
        const {pathname} = this.props.location
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
               <NavLinkBar data={navList}></NavLinkBar>
           </div>
        );
    }
}

export default DashBoard