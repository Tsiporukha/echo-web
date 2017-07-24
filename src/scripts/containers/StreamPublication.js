import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Button, Input, Autocomplete} from 'react-toolbox';

import {getQueueSongs} from '../actions/PlayerActions';

import styles from '../../assets/styles/streamPublication.css';

import tags from '../../assets/tags.json';


const mapStateToProps = (state, ownProps) => ({
  songs: getQueueSongs(state),
});

const mapDispatchToProps = dispatch => ({

});


class StreamPublication extends Component {

  setTitle = title => this.setState({title});
  setDescription = description => this.setState({description});

  setArtworkUrl = artwork_url => () => this.setState({artwork_url})
  setUploadedArtworkUrl = uploadedArtworkUrl => this.setState({uploadedArtworkUrl});
  rmUploadedArtworkUrl = () => this.setUploadedArtworkUrl('');

  getSourceForTagsAutocomplete = (primaryTags = Object.keys(tags), addedPrimaryTags = this.state.tags.filter(tag => primaryTags.includes(tag))) =>
    addedPrimaryTags.length ? addedPrimaryTags.reduce((ftags, ptag) => ftags.concat(tags[ptag]), []) : primaryTags;
  getTagsSuggestion = () => this.getSourceForTagsAutocomplete().filter(tag => !this.state.tags.includes(tag));

  handleTagsChange = tags => this.setState({tags});
  addTag = tag => () => this.setState({tags: [tag, ...this.state.tags]});
  removeTag = tag => () => this.setState({tags: this.state.tags.filter(t => t !== tag)});


  state = {
    title: '',
    description: '',
    artwork_url: (this.props.songs[0]||{}).artwork_url,
    tags: [],

    uploadedArtworkUrl: '',
  };

  render() {
    return(
      <div className={styles.root}>
        <div className={styles.header}>
          <div className={styles.leftReg}>
            <div className={styles.title}>
              <span>Save To New Room</span>
            </div>
          </div>
          <div className={styles.rightReg}>
            <div className={styles.buttons}>
              <Button theme={styles} icon='save' label='Save' raised />
              <Button theme={styles} label='Cancel' flat onClick={this.props.onCancel} />
            </div>
          </div>
        </div>

        <div className={styles.body}>
          <div className={styles.leftReg}>
            <div className={styles.bodyLeftReg}>

              <div>
                <Input type='text' name='title' label='Room Name'
                  className={styles.pName} theme={styles} value={this.state.title} onChange={this.setTitle} />
                <Input type='text' multiline name='description' label='Room Description'
                  className={styles.pDescription} theme={styles} maxLength={1000} value={this.state.description} onChange={this.setDescription} />

                <div className={styles.actionTitle}>Choose Artwork:</div>
                <div className={styles.artworks}>
                  {this.props.songs.map(song =>
                    <a key={song.id}>
                      <img src={song.artwork_url} alt='artwork'
                        className={this.state.artwork_url == song.artwork_url ? styles.selected : ''}
                        onClick={this.setArtworkUrl(song.artwork_url)} />
                      {this.state.artwork_url == song.artwork_url && <i className={styles.selectedIcon}>check_circle</i>}
                    </a>
                  )}
                </div>
              </div>

              <div className={styles.actionTitle}>Choose Tags:</div>
              <div className={styles.tagsArea}>
                {this.state.tags.slice(0).reverse().map(tag =>
                  <span key={tag} className={styles.tag}>
                    {tag}<i onClick={this.removeTag(tag)} className={styles.closeIcon}>close</i>
                  </span>
                )}
                <Autocomplete
                  allowCreate
                  multiple
                  source={[...this.getSourceForTagsAutocomplete(),  ...this.state.tags]}
                  onChange={this.handleTagsChange}
                  value={this.state.tags}
                  theme={styles}
                  direction={'down'}
                />
                {this.getTagsSuggestion().slice(0,10).map(tag =>
                  <span key={tag} onClick={this.addTag(tag)} className={styles.atag}>{tag}</span>
                )}
              </div>


            </div>
          </div>

        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StreamPublication);
