import React from 'react'
import {Grid, List} from 'antd-mobile'
//import PropTypes from 'prop-types'

class AvatarSelector extends React.Component{
  /*  static  propTypes = {
        selectAvatar: PropTypes.func.isRequired
    }*/
    constructor(props) {
        super(props);
        this.state={}
    }


    render(){
        const avatarList = `boy,man,girl,woman,bear,bird,manone,womanone,millions`
                           .split(',')
                           .map(v=>({
                               icon:require(`../../componnet/img/${v}.png`),
                               text:v
                           }))

        const gridHeader=()=> {
            if(this.state.icon===null){
                return 'please choose an image'
            }else{
                return (<div>
                    <span>Please choose an image</span>
                    <img style={{width:20}} src={this.state.icon} alt="boss img"></img>
                </div>)
            }
        }

        return (
            <div>
                <List renderHeader={gridHeader} >
                     <Grid data={avatarList}
                           columnNum={3}
                           onClick={elm=>{
                               this.setState(elm)
                               this.props.selectAvatar(elm.text)
                           }}
                     />
                </List>

            </div>

        );
    }
}

export default AvatarSelector