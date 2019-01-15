import  React from 'react'
import {NavBar, InputItem, TextareaItem, Button} from 'antd-mobile'
import  AvatarSelector from '../../componnet/avatar-selector/avatar-selector'
import {connect} from 'react-redux'
import {update} from '../../redux/user.redux'
import Redirect from "react-router-dom/es/Redirect";

@connect(
    state=>state.user,
    {update}
)
class BossInfo extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            title: '',
            company: '',
            wage:'',
            desc:''

        }
    }
    onChange(key, value){
        this.setState({
            [key]:  value
        })
    }



    render(){
        const path = this.props.location.pathname
        const redirect = this.props.redirectTo
        return(
            <div>
                {(redirect&&redirect!==path)? <Redirect to={this.props.redirectTo}/> :null}

                <NavBar mode="dark">Company information page</NavBar>

                <AvatarSelector
                 selectAvatar={(image)=>{
                     this.setState({
                         avatar:image
                     })
                 }}>
                </AvatarSelector>
                <InputItem onChange={(v)=>this.onChange('title', v)}>Position</InputItem>
                <InputItem onChange={(v)=>this.onChange('company', v)}>Company Name</InputItem>
                <InputItem onChange={(v)=>this.onChange('money', v)}>Salary</InputItem>
                <TextareaItem
                    onChange={(v)=>this.onChange('desc', v)}
                    rows={3}
                    autoHeight
                    title='Job Description'>
                </TextareaItem>
                <Button type="primary" onClick={()=>{
                    this.props.update(this.state)
                }}>Save</Button>

            </div>

        );
    }
}

export default BossInfo