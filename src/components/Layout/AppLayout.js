import React from 'react';
import PropTypes from 'prop-types';

export default class AppLayout extends React.PureComponent {

  static propTypes = {
    children: PropTypes.object,
  };

  render() {
    const { children } = this.props;

    return (
      <div className="app-container">
        <div className="gradient" >
          <div className="stars-large" />
          <div className="stars-medium" />
          <div className="stars" />
        </div>
        <div className="page-content">
          {children}
        </div>
      </div>
    );
  }

}
