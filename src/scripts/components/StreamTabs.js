import React, {Component} from 'react';
import {Tab, Tabs, Button} from 'react-toolbox';

import Song from '../containers/Song';
import Comment from '../containers/Comment';
import CommentPublication from '../containers/CommentPublication';

import tabsTheme from '../../assets/styles/tabsTheme.css';

const commentsLoadLimit = 5;

export default class StreamDetails extends Component {
  handleTabChange = index => this.setState({index});


  state = {index: 0}

  render() {
    return (
      <section>
        <Tabs theme={tabsTheme} index={this.state.index} onChange={this.handleTabChange}>
          <Tab label={`TRACKLIST(${this.props.playlist.songs.length})`}>
            <div>
              {this.props.playlist.songs.map(id => (<Song key={id} id={id} />))}
            </div>
          </Tab>
          <Tab label={`COMMENTS(${this.props.stream.comments_count})`}>
            <CommentPublication stream={this.props.stream} />
            {this.props.stream.comments.length < this.props.stream.comments_count &&
              <Button label='Load more comments' style={{backgroundColor: '#e8e8e8'}}
                onClick={this.props.fetchComments(this.props.stream, commentsLoadLimit, this.props.stream.comments.length)} />}
            {[...this.props.stream.comments].map(commentId => <Comment id={commentId} key={commentId} />)}
          </Tab>
        </Tabs>
      </section>
    );
  }
}
