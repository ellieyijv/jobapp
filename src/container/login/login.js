import React from 'react'
import Logo from '../../componnet/logo/Logo'
import {Button, WingBlank, WhiteSpace, List, InputItem} from 'antd-mobile';
import {connect} from 'react-redux'
import {login} from '../../redux/user.redux'
import {Redirect} from "react-router-dom";
import form from '../../componnet/wrapperForm/wrapForm'


@connect(
    state=>state.user,
    {login}
)
@form
class Login extends React.Component{
    constructor(props){
        super(props)
        this.goRegister = this.goRegister.bind(this)
        this.handleLogin = this.handleLogin.bind(this)

    }

    goRegister(){
        this.props.history.push('/register')
    }


    handleLogin(){
        this.props.login(this.props.state)
    }


    render(){
        return (
            <div>
                
                {(this.props.redirectTo&&this.props.redirectTo !=='/login')? <Redirect to={this.props.redirectTo} />: null}
                <Logo/>

                    <WhiteSpace/>
                <WingBlank>

                    <List>
                        {this.props.msg?<p className="errMsg">{this.props.msg} </p>:null}
                        <InputItem
                            onChange={v=>this.props.handleChange('user', v)}>User Name</InputItem>
                        <WhiteSpace/>
                        <InputItem type="password"
                                   onChange={v=>this.props.handleChange('pwd', v)}>Password</InputItem>
                    </List>
                    <Button
                        onClick={this.handleLogin} type="primary">Login</Button>
                    <WhiteSpace />
                    <Button onClick={this.goRegister} type="primary" >Register</Button>

                </WingBlank>

</div>
);
}
}

export default Login