import React from 'react'
import {Radio, List, InputItem, WhiteSpace, Button} from 'antd-mobile'
import Logo from "../../componnet/logo/Logo";
import {connect} from 'react-redux'
import {register} from '../../redux/user.redux'
import {Redirect} from 'react-router-dom'
import form from '../../componnet/wrapperForm/wrapForm'

@connect(
    state=>state.user,
    {register}
)
@form
class Register extends React.Component{
    constructor(props){
        super(props);
        this.handleRegister = this.handleRegister.bind(this)
    }

   componentDidMount(){
        this.props.handleChange('type', 'boss')
   }

    handleRegister()
    {
        this.props.register(this.props.state, {'pwd':0})
    }

    render(){
        const RadioItem = Radio.RadioItem
        return (
            <div>
                {this.props.redirectTo? <Redirect to={this.props.redirectTo} />: null}
                <Logo/>
                <List>
                    {this.props.msg?<p className="errMsg">{this.props.msg} </p>:null}
                    <InputItem
                    onChange={v=>{this.props.handleChange('user', v)}}>User Name</InputItem>
                    <WhiteSpace/>
                    <InputItem
                        onChange={v=>{this.props.handleChange('pwd', v)}} type="password">Password</InputItem>
                    <WhiteSpace/>
                    <InputItem onChange={v=>{this.props.handleChange('repeatpwd', v)}} type="password">Re-enter Password</InputItem>
                    <WhiteSpace/>
                </List>
                <RadioItem checked={this.props.state.type === 'seeker'}
                onClick={()=>this.props.handleChange('type', 'seeker')}>Job Seeker</RadioItem>
                <RadioItem checked={this.props.state.type === 'boss'}
                           onClick={()=>this.props.handleChange('type', 'boss')}> Companay </RadioItem>
                <WhiteSpace/>
                <Button type="primary" onClick={this.handleRegister}>OK</Button>
            </div>
        );
    }
}

export default Register