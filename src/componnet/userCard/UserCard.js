import React from 'react'
import PropTypes from 'prop-types'
import {Card, WhiteSpace, WingBlank} from "antd-mobile";
import {withRouter} from 'react-router-dom'
import style from './style.sass'

@withRouter
class UserCard extends React.Component{
    static propTypes={
        userlist: PropTypes.array.isRequired

     }

    

     handleClick(v){
         
        this.props.history.push(`/chat/${v._id}`)
    }

    render(){
        const Body = Card.Body
        const Header = Card.Header

        return(
            <WingBlank>
                {this.props.userlist.map(v=>(
                    
                    v.avatar?(<Card key={v._id} onClick={() => this.handleClick(v)} >
                        <Header
                            title={v.user}
                            thumb={require(`../img/${v.avatar}.png`)}
                            extra={<div>{v.title}</div>}
                           
                        ></Header>
                        
                        <Body>
                        {v.type === 'boss'?<div>Company: {v.company}</div> :null}
                        {v.desc.split('\n').map (v=>
                            (<div key={v}>{v}</div>))
                        }
                        {v.type === 'boss'?<div>Salary: {v.money}</div> :null}
                        </Body>
                    </Card>):null
                ))}
                <WhiteSpace/>
            </WingBlank>
        );
    }


}


export default UserCard