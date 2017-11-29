import React, {Component} from 'react';

import {Button, Input, Autocomplete, Dropdown} from 'react-toolbox';
import {arrayMove} from 'react-sortable-hoc';

import UploadArtwork from '../components/UploadArtwork';
import QueueSong from '../containers/QueueSong';
import SortableQueueItems from '../components/SortableQueueItems';

import {uploadArtwork} from '../lib/ebApi/streams';
import {playlistDuration, duration} from '../lib/duration';

import {genresNames, getGenreTags} from '../lib/genres';

import styles from '../../assets/styles/roomEditing.css';
import streamEditingStyles from '../../assets/styles/streamPublication.css';


class ArtworkUpdate extends Component{

  onIconClick = e => this.refs.input.click();

  uploadAndSet = () => this.props.uploadArtwork(this.refs.input.files[0]).then(({artwork_url}) => this.props.setUploadedArtworkUrl(artwork_url));

  render(){
    return(
      <span className={styles.editIconArea}>
        <input type='file' accept='image/*' ref='input' style={{display: 'none'}} onChange={this.uploadAndSet} />
        <i onClick={this.onIconClick} className={styles.editIcon}>mode_edit</i>
      </span>
    )
  }
}


const getRoomData = (room, playlist) => room ?
  {...room, ...playlist} :
  {
    title: '',
    description: '',
    artwork_url: '',
    background_artwork_url: '',
    genre: genresNames[0],
    tags: [],
  };


export default class RoomEditing extends Component {

/// Text data
  setTitle = title => this.setState({title});
  setDescription = description => this.setState({description});
  setGenre = genre => this.setState({genre});
/// end Text data


/// Artworks
  uploadArtwork = file => uploadArtwork(file, this.props.token);

  setArtworkUrl = artwork_url => this.setState({artwork_url});
  removeArtworkUrl = () => this.setUploadedArtworkUrl('');

  setBackgroundArtworkUrl = background_artwork_url => this.setState({background_artwork_url});
  removeBackgroundArtworkUrl = () => this.setBackgroundArtworkUrl('');
/// end Artworks


/// Genre
  genres = genresNames.map(genreName => ({value: genreName, label: genreName}));
  handleGenreChange = genre => this.setState({genre, tags: []});
/// end Genre


/// Tags
  getTags = () => getGenreTags(this.state.genre)
  getTagsSuggestion = () => this.getTags().filter(tag => !this.state.tags.includes(tag));

  handleTagsChange = tags => this.setState({tags});
  addTag = tag => () => this.setState({tags: [tag, ...this.state.tags]});
  removeTag = tag => () => this.setState({tags: this.state.tags.filter(t => t !== tag)});
/// end Tags


/// Validation and Saving
  isAllFielsFilled = () =>
    this.state.title && this.state.description &&
    this.state.genre && this.state.tags.length &&
    this.state.artwork_url && this.state.background_artwork_url;

  save = () => this.props.save(this.state.artwork_url, this.state.background_artwork_url, this.state.title,
    this.state.description, this.state.genre, this.state.tags, this.state.songs, this.props.token)
      .then(this.props.onCancel);

  maybeSave = () => console.log(this.isAllFielsFilled()) ||( this.isAllFielsFilled() ? this.save() : this.setState({triedSave: true}));
  maybeError = (filled, errMssg) => (this.state.triedSave && !filled) ? errMssg : false;
/// end Validation and Saving


/// Sorting
  onSortEnd = ({oldIndex, newIndex}) => this.setState({songs: arrayMove(this.state.songs, oldIndex, newIndex)});
/// end Sorting


  state = {
    ...getRoomData(this.props.room, this.props.playlist),

    songs: this.props.songs.map(song => ({...song, type: 'song'})),

    triedSave: false,
  };

  render() {
    return(
      <div className={styles.root}>

        <div className={styles.header}>
          <div className={styles.title}>
            <span>Save Room</span>
          </div>
          <div className={styles.buttons}>
            <Button theme={streamEditingStyles} icon='save' label='Save' raised onClick={this.maybeSave} />
            <Button theme={streamEditingStyles} label='Cancel' flat onClick={this.props.onCancel} />
          </div>
        </div>

        <div className={styles.body}>

          <div className={styles.left}>
            <div className={styles.coverArea} style={this.state.background_artwork_url ? {backgroundImage: `url(${this.state.background_artwork_url})`} : {}}>

              <div className={styles.bgArtworkUpdateArea}>
                <ArtworkUpdate uploadArtwork={this.uploadArtwork} setUploadedArtworkUrl={this.setBackgroundArtworkUrl} />
                <span className={styles.errMssg}>{this.maybeError(this.state.background_artwork_url, 'Cover is required')}</span>
              </div>

              <div className={styles.card}>
                <div className={styles.artworkHolder} style={{backgroundImage: `url(${this.state.artwork_url})`}}>
                  <ArtworkUpdate uploadArtwork={this.uploadArtwork} setUploadedArtworkUrl={this.setArtworkUrl} />
                  <span className={styles.errMssg}>{this.maybeError(this.state.artwork_url, 'Artwork is required')}</span>
                </div>

                <div className={styles.inputs}>
                  <Input type='text' name='title' label='Room Name'
                    className={styles.title} theme={{...streamEditingStyles, ...styles}} value={this.state.title}
                    onChange={this.setTitle} error={this.maybeError(this.state.title, 'Room title is required')} />
                  <Input type='text' multiline name='description' label='Room Description'
                    className={styles.description} theme={{...streamEditingStyles, ...styles}} maxLength={1000} value={this.state.description}
                    onChange={this.setDescription} error={this.maybeError(this.state.description, 'Room description is required')} />
                </div>
              </div>
            </div>

            <div className={styles.afterCover}>

              <div className={styles.genreArea}>
                <div>Choose Genre:</div>
                <Dropdown
                  source={this.genres}
                  onChange={this.handleGenreChange}
                  value={this.state.genre}
                />
              </div>

              <div className={streamEditingStyles.tagsArea}>
                <div className={streamEditingStyles.actionTitle}>Add Tags:</div>

                {this.state.tags.slice(0).reverse().map(tag =>
                  <span key={tag} className={streamEditingStyles.tag}>
                    {tag}<i onClick={this.removeTag(tag)} className={streamEditingStyles.closeIcon}>close</i>
                  </span>
                )}
                <Autocomplete
                  allowCreate
                  multiple
                  source={[...this.getTags(), ...this.state.tags]}
                  onChange={this.handleTagsChange}
                  value={this.state.tags}
                  theme={streamEditingStyles}
                  direction={'down'}
                  error={this.maybeError(this.state.tags.length, 'Tags are required')}
                />
                <div>
                  {this.getTagsSuggestion().slice(0,20).map(tag =>
                    <span key={tag} onClick={this.addTag(tag)} className={streamEditingStyles.atag}>{tag}</span>
                  )}
                </div>
              </div>

            </div>

          </div>

          <div className={styles.right}>
            <div className={styles.tracklistInfo}>
              <b>Tracklist:</b> <span>{this.props.songs.length} songs, {duration(playlistDuration(this.props.songs))}</span>
            </div>

            <div>
              <SortableQueueItems items={this.state.songs} onSortEnd={this.onSortEnd} useDragHandle />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
