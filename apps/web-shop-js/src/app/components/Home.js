import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom'

class Home extends Component {


  render() {
  	console.log(this.props.match.params)
    return (
      <div>
        <h1>Home page</h1>
        <Link to="/products">Products</Link>
      </div>
    );
  }
}

export default Home;
