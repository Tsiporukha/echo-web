import React, {Component} from 'react';
import {Tab, Tabs} from 'react-toolbox';

import Song from '../containers/Song';
import Comment from '../containers/Comment';
import CommentPublication from '../containers/CommentPublication';

import styles from '../../assets/styles/stream.css';
import tabsTheme from '../../assets/styles/tabsTheme.css';

export default class StreamDetails extends Component {

  handleTabChange = index => this.setState({index});


  state = {index: 0}

  render(){
    return (
      <section>
        <Tabs theme={tabsTheme} index={this.state.index} onChange={this.handleTabChange}>
          <Tab label={`TRACKLIST(${this.props.playlist.songs.length})`}>
            <div>
              {this.props.playlist.songs.map(id => (<Song key={id} id={id} />))}
            </div>
          </Tab>
          <Tab label={`COMMENTS(${this.props.stream.comments_count})`}>
            {[...this.props.stream.comments].map(commentId => <Comment id={commentId} key={commentId} />)}
            <CommentPublication stream={this.props.stream} />
          </Tab>
        </Tabs>
      </section>
    );
  }
}
