import React from 'react'
import io from 'socket.io-client'
import { List, InputItem, NavBar, Icon } from 'antd-mobile'
import { connect } from 'react-redux'
import {  sendMsg, getMsgList, recvMsg, readMsg  } from "../../redux/chat.redux"
// import ListItem from 'antd-mobile/lib/list/ListItem';
import { getChatId } from '../../util';

//const socket = io('http://localhost:9093');

@connect(
    state => state,
    { sendMsg, getMsgList, recvMsg, readMsg}
)
class Chat extends React.Component {
    constructor(props) {
        super(props)
        this.state = { text: '' }
    }
    componentDidMount() {
     if(!this.props.chat.chatmsg.length){
        this.props.getMsgList()
        // this.props.recvMsg()
     }
      
        // socket.on('recvmsg', (data)=>{
        //     this.setState({
        //         msg: [...this.state.msg, data.text]})
        // })
    }

    componentWillUnmount(){
        const to =this.props.match.params.user 
        this.props.readMsg(to)   
    }
    handleSubmit=()=> {
        //  socket.emit('sendmsg', {text: this.state.text})
        // console.log(this.state)
        // this.setState({text: ''})
        const from = this.props.user._id
        //match the url user id
        const to = this.props.match.params.user
        const msg = this.state.text
      
        this.props.sendMsg({ from, to, msg })
        this.setState({
            text: ''
        })
    }

    render() {
       

        const userid = this.props.match.params.user
        const Item = List.Item
        const users = this.props.chat.users
        if(!users[userid]){
            return null
        }
        const chatid = getChatId(userid, this.props.user._id)
        const chatMsgs = this.props.chat.chatmsg.filter(v=>v.chatid === chatid)
        return (
            <div id='chat-page'>
                <NavBar mode="dark"
                        icon={<Icon type="left"></Icon>}
                        onClick={()=>{
                            this.props.history.goBack()
                        }}>
                    {users[userid].name}
                </NavBar>

                {chatMsgs.map((v, index) => {
                    const avatar = require(`../img/${users[v.from].avatar}.png`)
                    return v.from === userid ? (
                        <List key={v._id}>
                            <Item
                              thumb = {avatar}
                            > {v.content}</Item>
                        </List>) :

                        <List key={v._id}>
                            {v.content ?
                                <Item
                                    extra={<img src={avatar} />}
                                    className='chat-me'>{v.content}
                                </Item> : ''}
                        </List>


                })}
                <div className="stick-footer">
                <List>
                    <InputItem
                        placeholder='Please Input'
                        value={this.state.text}
                        onChange={v => {
                            this.setState({ text: v })
                        }}
                        extra={<span onClick={this.handleSubmit}>Send</span>}
                    ></InputItem>
                </List>
                </div>
            </div>
            //it shows the url user parameter

        )
    }
}

export default Chat