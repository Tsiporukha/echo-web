import React, {Component} from 'react';

import Button from 'react-toolbox/lib/button';
import Input from 'react-toolbox/lib/input';
import Dropdown from 'react-toolbox/lib/dropdown';
import {arrayMove} from 'react-sortable-hoc';

import TagsAutocomplete from './TagsAutocomplete';
import ImageUploaderPenIcon from './ImageUploaderPenIcon';
import SortableItems from '../components/SortableItems';

import {uploadArtwork} from '../lib/ebApi/streams';
import {playlistDuration, duration} from '../lib/duration';
import {addSongsType} from '../lib/song';
import {genresNames, getGenreTags} from '../lib/genres';

import styles from '../../assets/styles/roomEditing.css';
import streamEditingStyles from '../../assets/styles/streamPublication.css';


const getRoomData = (room, playlist) => room ?
  { ...playlist, ...room} :
  {
    title: '',
    description: '',
    artwork_url: '',
    background_url: '',
    genre: genresNames[0],
    tags: [],
  };


export default class RoomEditing extends Component {
  setAttr = name => val => this.setState({[name]: val});


  uploadArtwork = file => uploadArtwork(file, this.props.token);

  genres = genresNames.map(genreName => ({value: genreName, label: genreName}));
  handleGenreChange = genre => this.setState({genre, tags: []});

  getTags = () => getGenreTags(this.state.genre);

  onSortEnd = ({oldIndex, newIndex}) => this.setState({songs: arrayMove(this.state.songs, oldIndex, newIndex)});


  // Validation and Saving
  isAllFielsFilled = () =>
    this.state.title && this.state.description &&
    this.state.genre && this.state.tags.length &&
    this.state.artwork_url && this.state.background_url;

    save = () => this.props.save(
      this.state.artwork_url, this.state.background_url,
      this.state.title, this.state.description, this.state.genre, this.state.tags,
      this.state.songs, this.props.token
    ).then(this.props.onCancel);

  maybeSave = () => this.isAllFielsFilled() ? this.save() : this.setState({triedSave: true});
  maybeError = (filled, errMssg) => (this.state.triedSave && !filled) ? errMssg : false;
  // end Validation and Saving


  state = {
    ...getRoomData(this.props.room, this.props.playlist),

    songs: addSongsType(this.props.songs),

    triedSave: false,
  };

  componentWillReceiveProps = nextProps => this.setState({songs: addSongsType(nextProps.songs)});

  render() {
    return (
      <div className={styles.root}>

        <div className={styles.header}>
          <div className={styles.title}>
            Save Room
          </div>
          <div className={styles.buttons}>
            <Button theme={streamEditingStyles} icon='save' label='Save' raised
              disabled={!this.state.songs.length} onClick={this.maybeSave} />
            <Button theme={streamEditingStyles} label='Cancel' flat onClick={this.props.onCancel} />
          </div>
        </div>

        <div className={styles.body}>

          <div className={styles.left}>
            <div className={styles.coverArea} style={this.state.background_url ? {backgroundImage: `url(${this.state.background_url})`} : {}}>
              <div className={styles.bgArtworkUpdateArea}>
                <ImageUploaderPenIcon upload={this.uploadArtwork} setUploadedImageUrl={this.setAttr('background_url')} />
                <span className={styles.errMssg}>{this.maybeError(this.state.background_url, 'Cover is required')}</span>
              </div>

              <div className={styles.card}>
                <div className={styles.artworkHolder} style={{backgroundImage: `url(${this.state.artwork_url})`}}>
                  <ImageUploaderPenIcon upload={this.uploadArtwork} setUploadedImageUrl={this.setAttr('artwork_url')} />
                  <span className={styles.errMssg}>{this.maybeError(this.state.artwork_url, 'Artwork is required')}</span>
                </div>
                <div className={styles.inputs}>
                  <Input type='text' name='title' label='Room Name'
                    className={styles.title} theme={{...streamEditingStyles, ...styles}} value={this.state.title}
                    onChange={this.setAttr('title')} error={this.maybeError(this.state.title, 'Room title is required')} />
                  <Input type='text' multiline name='description' label='Room Description'
                    className={styles.description} theme={{...streamEditingStyles, ...styles}} maxLength={1000} value={this.state.description}
                    onChange={this.setAttr('description')} error={this.maybeError(this.state.description, 'Room description is required')} />
                </div>
              </div>
            </div>

            <div className={styles.genreArea}>
              <div>Choose Genre:</div>
              <Dropdown
                source={this.genres}
                onChange={this.handleGenreChange}
                value={this.state.genre}
              />

              <div className={streamEditingStyles.tags}>
                <div className={streamEditingStyles.actionTitle}>Add Tags:</div>
                <TagsAutocomplete
                  allTags={this.getTags()}
                  addedTags={this.state.tags}
                  setTags={this.setAttr('tags')}
                  theme={streamEditingStyles}
                  errorHandler={this.maybeError(this.state.tags.length, 'Tags are required')}
                />
              </div>
            </div>

          </div>

          <div className={styles.right}>
            <div className={styles.tracklist}>
              <b>Tracklist:</b> <span>{this.props.songs.length} songs, {duration(playlistDuration(this.props.songs))}</span>
            </div>
            <SortableItems playlist={this.props.playlist} items={this.state.songs} onSortEnd={this.onSortEnd} useDragHandle />
          </div>
        </div>
      </div>
    );
  }
}
