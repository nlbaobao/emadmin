import React, { Component } from "react";
import { Input, Button,Divider,message} from 'antd';
import {ajax } from "../../utils/index";
import './index.less'

export class Login extends Component {

  constructor(props) {
    super(props)
    this.state = {
      userName: '',
      password: ''
    }

  }
  componentDidMount(){
    
  }
  login=()=>{
    const {userName,password} = this.state
    ajax({
      method:'post',
      data:{
        username:userName,
        password:password
      },
      api:'login'
    }).then(res=>{
      console.log(res)
      if(res.code === 200){
        const {msg} = res
        message.success('登录失败')
        window.location.hash='/home/list'
        //把登录信息存进lcoalstorage
        localStorage.setItem(msg,'token')
      }
      else{
        message.error('登录失败')
      }
    })
  }
  render() {
    const { userName, password } = this.state;
    return (<div className='login'>
      <div className='middle'>
        <h3>妆小样后台管理系统</h3>
        <Divider />
        <Input value={userName} onChange={(e) => {
          const { value } = e.target;
          this.setState({
            userName: value
          })
        }} placeholder="请输入账号" />
        <Input.Password style={{marginTop:20}}
          onChange={(e) => {
            const { value } = e.target;
            this.setState({
              password: value
            })
          }} value={password} placeholder="请输入密码" />
        <Button onClick={this.login} style={{width:'100%',marginTop:20}} type='primary'>登录</Button>
      </div>

    </div>)
  }
}
export default Login;
