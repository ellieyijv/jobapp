import React from 'react'

class Chat extends React.Component{
    render(){
        console.log(this.props)
        return (
            //it shows the url user parameter
            <h2>chat with user:{this.props.match.params.user}</h2>
        )
    }
}

export default Chat