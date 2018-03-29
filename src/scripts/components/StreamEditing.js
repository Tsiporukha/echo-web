import React, {Component} from 'react';

import Button from 'react-toolbox/lib/button';
import Input from 'react-toolbox/lib/input';
import {arrayMove} from 'react-sortable-hoc';

import UploadArtwork from './UploadArtwork';
import TagsAutocomplete from './TagsAutocomplete';
import SortableItems from '../components/SortableItems';

import {uploadArtwork} from '../lib/ebApi/streams';
import {playlistDuration, duration} from '../lib/duration';
import {addSongsType} from '../lib/song';
import {primaryTags, getSecondaryTagsOf, getPrimaryTagsFrom} from '../lib/genres';

import styles from '../../assets/styles/streamPublication.css';


const getNewStreamData = artwork_url => ({
  title: '',
  description: '',
  artwork_url,
  tags: [],
});


export default class StreamEditing extends Component {
  setAttr = name => val => this.setState({[name]: val});


  uploadArtwork = file => uploadArtwork(file, this.props.token);
  setArtworkUrl = artwork_url => () => this.setState({artwork_url});
  rmUploadedArtworkUrl = () => this.setAttr('setUploadedArtworkUrl')('');

  getTags = () => {
    const addedPrimaryTags = getPrimaryTagsFrom(this.state.tags);
    return addedPrimaryTags.length ? getSecondaryTagsOf(addedPrimaryTags) : primaryTags;
  };
  addTag = tag => () => this.setState({tags: [tag, ...this.state.tags]});
  removeTag = tag => () => this.setState({tags: this.state.tags.filter(t => t !== tag)});

  save = () => this.props.save(
    this.state.title, this.state.description,
    this.state.tags, this.state.artwork_url, this.state.songs, this.props.token
  ).then(this.props.onCancel);

  isAllFielsFilled = () => this.state.title
    && this.state.description
    && this.state.tags.length
    && this.state.artwork_url
  ;
  maybeSave = () => this.isAllFielsFilled() ? this.save() : this.setState({triedSave: true});
  maybeError = (filled, errMssg) => (this.state.triedSave && !filled) ? errMssg : false;

  onSortEnd = ({oldIndex, newIndex}) => this.setState({songs: arrayMove(this.state.songs, oldIndex, newIndex)});

  maybeGetStreamData = () => this.props.stream ?
    {...this.props.playlist, tags: this.props.stream.all_tags, artwork_url: this.props.stream.artwork_url} :
    getNewStreamData(this.props.songs[0].artwork_url);


  state = {
    ...this.maybeGetStreamData(),

    uploadedArtworkUrl: '',
    songs: addSongsType(this.props.songs),

    triedSave: false,
  };

  componentWillReceiveProps = nextProps => this.setState({songs: addSongsType(nextProps.songs)});

  render() {
    return (
      <div className={styles.root}>
        <div className={styles.header}>
          <div className={styles.title}>
            Save Stream
          </div>
          <div className={styles.buttons}>
            <Button theme={styles} icon='save' label='Save' raised
              disabled={!this.state.songs.length} onClick={this.maybeSave} />
            <Button theme={styles} label='Cancel' flat onClick={this.props.onCancel} />
          </div>
        </div>

        <div className={styles.body}>
          <div className={styles.left}>
            <div className={styles.textData}>
              <Input type='text' name='title' label='Room Name'
                className={styles.sTitle} theme={styles} value={this.state.title}
                onChange={this.setAttr('title')}
                error={this.maybeError(this.state.title, 'Room title is required')} />
              <Input type='text' multiline name='description' label='Room Description'
                className={styles.sDescription} theme={styles} maxLength={1000} value={this.state.description}
                onChange={this.setAttr('description')}
                error={this.maybeError(this.state.description, 'Room description is required')} />
            </div>

            <div className={styles.artworksArea}>
              <div className={styles.actionTitle}>Choose Artwork:</div>

              <div className={styles.artworks}>
                <UploadArtwork
                  uploadedArtworkUrl={this.state.uploadedArtworkUrl}
                  rmUploadedArtworkUrl={this.rmUploadedArtworkUrl}
                  selectedArtworkUrl={this.state.artwork_url}
                  setArtworkUrl={this.setArtworkUrl}
                  uploadArtwork={this.uploadArtwork}
                  setUploadedArtworkUrl={this.setAttr('uploadedArtworkUrl')}
                  styles={styles} />

                {this.props.songs.map(song =>
                  (<a onClick={this.setArtworkUrl(song.artwork_url)} key={song.id}>
                    <img src={song.artwork_url} alt='artwork'
                      className={this.state.artwork_url === song.artwork_url ? styles.selected : ''}
                    />
                    {this.state.artwork_url === song.artwork_url && <i className={styles.selectedIcon}>check_circle</i>}
                  </a>)
                )}
              </div>
            </div>

            <div className={styles.tagsArea}>
              <div className={styles.actionTitle}>Choose Tags:</div>
              <div className={styles.tags}>
                <TagsAutocomplete
                  allTags={this.getTags()}
                  addedTags={this.state.tags}
                  setTags={this.setAttr('tags')}
                  theme={styles}
                  errorHandler={this.maybeError(this.state.tags.length, 'Tags are required')}
                />
              </div>
            </div>
          </div>

          <div className={styles.right}>
            <div className={styles.tracklist}>
              <b>Tracklist:</b> <span>{this.props.songs.length} songs, {duration(playlistDuration(this.props.songs))}</span>
              <SortableItems playlist={this.props.playlist} items={this.state.songs} onSortEnd={this.onSortEnd} useDragHandle />
            </div>

          </div>
        </div>
      </div>
    );
  }
}
