import React from 'react';
import { Link } from 'react-router-dom';

import './NotFound.css';

export class NotFound extends React.PureComponent {
  render() {
    return (
      <div className="NotFound" style={{ visibility: 'hidden' }}>
        <h2 className="NotFound_title">
          Oops, you might have the wrong URL!
        </h2>
        <p className="NotFound_text">
          The URL you are requesting does not exist or has been moved.
        </p>
        <p className="NotFound_text">
          Please check the link you followed and try again.
        </p>
        <p className="NotFound_exitWrapper">
          <Link to="/" className="NotFound_exitBtn">
            Get me outta here!
          </Link>
        </p>
      </div>
    );
  }
}

NotFound.propTypes = {};

export default NotFound;
