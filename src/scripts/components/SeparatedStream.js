import React, {Component} from 'react';

import StreamCard from '../components/StreamCard';
import StreamOpenGraph from '../components/StreamOpenGraph';
import StreamTabs from '../components/StreamTabs';

import styles from '../../assets/styles/stream.css';


export default class SeparatedStream extends Component {
  componentDidMount = () => this.props.fetchStream(this.props.match.params.id, this.props.token);

  render() {
    return (
      !!this.props.stream &&
      <div className={styles.separated}>
        <StreamOpenGraph stream={this.props.stream} playlist={this.props.playlist} />
        <StreamCard {...this.props} />
        <StreamTabs {...this.props} />
      </div>
    );
  }
}
