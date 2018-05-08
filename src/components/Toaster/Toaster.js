import React from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import './Toaster.css';
import SVGIcon from '../SVGIcon/SVGIcon';

export class Toaster extends React.PureComponent {
  render() {
    const { notifications, dismiss } = this.props;

    return (
      <div className="Toaster" style={{ visibility: 'hidden' }}>
        <ReactCSSTransitionGroup
          transitionName="Toaster_transition"
          transitionEnterTimeout={200}
          transitionLeaveTimeout={1000}>
          {notifications
            .filter(slice => slice.section === 'global')
            .map((slice, i) => {
              const sliceClass = ['Toaster_slice'];
              sliceClass.push(`Toaster_slice--${slice.type}`);

              // this is a little sloppy. if there are more than a
              // couple of consecutive messages, each one causes
              // the render to set more timeouts. So with 3 messages
              // the first message will get 3 timeouts armed to kill.
              // Since the the first kill changes the indexing in the array
              // the second of those 3 killers will kill the second
              // message before its time should be up. But that triggers
              // a re-render which creates more killers. It's overkill.
              // Maybe some kind of ID or 'hit-list' can help manage it.
              if (slice.duration) {
                setTimeout(dismiss, slice.duration, i);
              }

              let iconId = 'info-lg';
              if (slice.type === 'error') {
                iconId = 'cancel';
              }
              if (slice.type === 'success') {
                iconId = 'check-lg';
              }

              return (
                <div key={i} className={sliceClass.join(' ')}>
                  <SVGIcon iconId={iconId} className="Toaster_icon" />
                  <p className="Toaster_sliceText">{slice.text}</p>
                  <button
                    className="Toaster_closeBtn"
                    onClick={() => dismiss()}>
                    <SVGIcon
                      iconId="x-dot"
                      className="Toaster_closeIcon"
                    />
                  </button>
                </div>
              );
            })}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

Toaster.propTypes = {
  notifications: PropTypes.array,
  dismiss: PropTypes.func
};

export default Toaster;
