import React, {Component} from 'react';
import {Tab, Tabs} from 'react-toolbox';

import Song from './Song';

import styles from '../../assets/styles/stream.css';
import tabsTheme from '../../assets/styles/tabsTheme.css';

export default class StreamDetails extends Component {

  state = {index: 0}

  handleTabChange = index => this.setState({index});

  render(){
    return (
      <section>
        <Tabs theme={tabsTheme} index={this.state.index} onChange={this.handleTabChange}>
          <Tab label={`TRACKLIST(${this.props.songs.length})`}>
            <div>
              {this.props.songs.map(song => (<Song key={song.id} song={song} />))}
            </div>
          </Tab>
          <Tab disabled label={`COMMENTS(${this.props.stream.comments.length})`}><small>comments</small></Tab>
        </Tabs>
      </section>
    );
  }
}
