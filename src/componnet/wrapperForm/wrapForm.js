import React from 'react'

export default function wrapForm(Comp){
    return class form extends React.Component{
       constructor(props){
           super(props)
           this.state={}
    }

        handleChange=(key, value)=>{

           this.setState({
                [key]: value
            })
            
        }
        render(){
            return(
                <Comp state={this.state} handleChange={this.handleChange}{...this.props}></Comp>
            )}
    }
}