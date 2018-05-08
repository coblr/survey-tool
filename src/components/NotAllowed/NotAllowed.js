import React from 'react';
import { Link } from 'react-router-dom';

import './NotAllowed.css';

export class NotAllowed extends React.PureComponent {
  render() {
    return (
      <div className="NotAllowed" style={{ visibility: 'hidden' }}>
        <h2 className="NotAllowed_title">
          Sorry, You're not authorized!
        </h2>
        <p className="NotAllowed_text">
          The content you are requesting is not available to you.
        </p>
        <p className="NotAllowed_text">
          Please check the link you followed and try again.
        </p>
        <p className="NotAllowed_exitWrapper">
          <Link to="/" className="NotAllowed_exitBtn">
            Get me outta here!
          </Link>
        </p>
      </div>
    );
  }
}

NotAllowed.propTypes = {};

export default NotAllowed;
