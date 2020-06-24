import React, { Component } from 'react'
import Header from '../../components/header'
import './home.scss'

class Home extends Component {
  render() {
    return (
      <div className="home-page">
        <Header 
          params1="传参1" 
          params2="传参2"
          func1={() => {console.log('func1')}}
        />
        <h1>Home page</h1>
      </div>
    )
  }
}

export default Home