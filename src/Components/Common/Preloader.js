import React, { Component } from "react";
import noFilterImg from '../../Images/noFiltersImg.png';
import loading from '../../Images/inProgress.gif';
import PropTypes from 'prop-types';

class Preloader extends Component {
  render = () => {
    const { preLoaderStyle, isFilter } = this.props;
    const img = isFilter ? noFilterImg : loading;

    return (
      <img
        className={'mr-3 ' + preLoaderStyle}
        alt="poster"
        src={img}
      />
    );
  };
}

Preloader.propTypes = {
  preLoaderStyle: PropTypes.string,
  isFilter: PropTypes.bool.isRequired
};

export default Preloader;
