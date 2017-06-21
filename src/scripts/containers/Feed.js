import React, { Component } from 'react';
import { connect } from 'react-redux';

import Stream from './Stream';

import {fetchAndReceiveGlobalStreams} from '../actions/SubFeedsActions';

import styles from '../../assets/styles/feed.css';

const mapStateToProps = store => ({
  global: store.feedSources.feed.global,
});

const mapDispatchToProps = dispatch => ({
  fetchAndReceiveGlobalStreams: filters => () => dispatch(fetchAndReceiveGlobalStreams(filters))
});

class Feed extends Component {

  componentDidMount(){
    return this.props.fetchAndReceiveGlobalStreams(this.props.global.filters)();
  }

  render(){
    return (
      <div className={styles.streams}>
        {this.props.global.items.map(s => <Stream id={s} key={s} />)}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
