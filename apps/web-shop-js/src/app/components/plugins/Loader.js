import React, { Component, PropTypes } from 'react';


class Loader extends Component {


  render() {
    return (
      <div className="loader">
      	<div className="loader-image"></div>
      	<div className="loader-label">Загрузка</div>
      </div>
    );
  }
}

export default Loader;
