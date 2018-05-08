import React from 'react';
import PropTypes from 'prop-types';

import './StickyContent.css';

export class StickyContent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onScroll = this.onScroll.bind(this);
    this.state = {
      startingY: 0,
      stickyClass: 'StickyContent'
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll);
    this.setState({ startingY: this.sticky.offsetTop });
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  }

  onScroll() {
    const scrollPos =
      document.documentElement.scrollTop || document.body.scrollTop;
    if (scrollPos >= this.state.startingY) {
      const stickyClass = 'StickyContent StickyContent--stick';
      this.setState({ stickyClass });
    } else {
      const stickyClass = 'StickyContent';
      this.setState({ stickyClass });
    }
  }

  render() {
    return (
      <div
        ref={el => (this.sticky = el)}
        className={this.state.stickyClass}>
        {this.props.children}
      </div>
    );
  }
}

StickyContent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array
  ])
};

export default StickyContent;
