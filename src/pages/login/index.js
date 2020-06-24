import React, { Component } from 'react';
import { connect } from 'react-redux'
import { request } from '../../api/http'
import * as actionCreators from './store/actionCreators'
import { Button } from 'antd'
import './login.scss'
class Login extends Component {
  render() { 
    return ( 
      <div className="login-page">
        <h1>Login page</h1>
        <p>login: myData = {this.props.myData}</p>
        <Button onClick={() => {this.props.setData('123456')}}>更改login的myData</Button>
        <Button onClick={this.getData.bind(this)}>ajax请求</Button>
        <Button onClick={this.gotoHome.bind(this)}>跳转Home页</Button>
      </div>
     );
     
  }

  gotoHome() {
    this.props.history.push('/home')
  }

  getData () {
    request.get('/api/getData').then(res => {
      alert(res.data.data)
    })
  }
}

// 把store中的数据映射到组件的props
const mapStateToProps = (state) => ({
  myData: state.getIn(['login', 'myData'])
})

// 把store的Dispatch映射到组件的props
const mapDispatchToProps = (dispatch) => ({
  setData(data) {
    const action = actionCreators.setData(data)
    dispatch(action)
  }
})
 
export default connect(mapStateToProps, mapDispatchToProps)(Login);