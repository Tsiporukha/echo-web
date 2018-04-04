import React, {Component} from 'react';

import StreamCard from '../components/StreamCard';
import OpenGraph from '../components/OpenGraph';
import StreamTabs from '../components/StreamTabs';

import {getClientUrl} from '../lib/url';

import styles from '../../assets/styles/stream.css';


export default class SeparatedStream extends Component {
  componentDidMount = () => this.props.fetchStream(this.props.match.params.id, this.props.token);

  render() {
    return (
      !!this.props.stream &&
      <div className={styles.separated}>
        <StreamCard {...this.props} />
        <StreamTabs {...this.props} />

        <OpenGraph title={this.props.playlist.title} description={this.props.playlist.description}
          image={this.props.stream.artwork_url} url={getClientUrl(`/feed/${this.props.stream.id}`)} />
      </div>
    );
  }
}
