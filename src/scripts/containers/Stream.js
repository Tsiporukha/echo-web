import React, {Component} from 'react';
import {connect} from 'react-redux';

import StreamDescription from '../components/StreamDescription';
import StreamTabs from '../components/StreamTabs';

import {getStreamAndNestedEntities} from '../lib/stream';

import styles from '../../assets/styles/stream.css';

const mapStateToProps = (state, ownProps) => getStreamAndNestedEntities(state, ownProps.id || ownProps.match.params.id);

const mapDispatchToProps = dispatch => ({
});

class Stream extends Component {

  render() {
    const separated = !!this.props.match;
    return(
      <div className={`${styles.root} ${separated ? styles.full : ''}`}>
        <div className={separated ? styles.fullStream : ''}>
          <StreamDescription {...this.props} />
          {separated && <StreamTabs {...this.props} />}
        </div>
      </div>
    )
  }
}

export default  connect(mapStateToProps, mapDispatchToProps)(Stream);
