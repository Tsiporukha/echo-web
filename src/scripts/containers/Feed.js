import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button} from 'react-toolbox/lib/button';

import Stream from './Stream';

import {fetchAndReceiveGlobalStreams} from '../actions/SubFeedsActions';

import styles from '../../assets/styles/feed.css';

const mapStateToProps = store => ({
  global: store.feedSources.feed.global,
});

const mapDispatchToProps = dispatch => ({
  fetchAndReceiveGlobalStreams: filters => dispatch(fetchAndReceiveGlobalStreams(filters))
});

class Feed extends Component {

  state = {
    filters: {
      limit: 5,
      offset: 0
    },
    fetchedAll: false
  }

  incrementOffsetFilter = (n = 5) => this.setState({filters:{...this.state.filters, offset: this.state.filters.offset + n}});
  loadMoreStreams = () => this.props.fetchAndReceiveGlobalStreams(this.state.filters).then(_ => this.incrementOffsetFilter(5));

  componentDidMount(){
    return this.loadMoreStreams();
  }

  render(){
    return (
      <div className={styles.streams}>
        {this.props.global.map(s => <Stream id={s} key={s} />)}
        <Button label='load more' raised primary onClick={this.loadMoreStreams} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
