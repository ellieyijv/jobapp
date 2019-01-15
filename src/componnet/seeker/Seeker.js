import React from 'react'

import {connect} from 'react-redux'
import {getUserList} from '../../redux/chatUser.redux'
import UserCard from "../userCard/UserCard";

@connect(
    state=>state.chatUser,
    {getUserList}
)
class Seeker extends React.Component{

    componentDidMount(){
        this.props.getUserList('boss')
    }


    render(){

        return(

            <div>
                <UserCard userlist={this.props.userlist}></UserCard>
            </div>

        );
    }
}

export default Seeker