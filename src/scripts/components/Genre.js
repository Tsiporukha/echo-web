import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import ShareIconMenu from './ShareIconMenu';

import {getGenre, getSecondaryTags} from '../lib/genres';

import styles from '../../assets/styles/genre.css';


const RoomPreview = props => <div>
  room preview
</div>


class Genre extends Component {

  genre = getGenre(this.props.match.params.title);
  tags = getSecondaryTags(this.props.match.params.title);

  state = {
    rooms: [],
  }

  render(){
    return(
      <div className={styles.genre}>

        <div className={styles.genreHeader} style={{backgroundImage: `url(${this.genre.background_url})`}}>
          <div className={styles.genreData}>
            <img className={styles.artwork} src={this.genre.artwork_url} alt='' />
            <div className={styles.text}>
              <div className={styles.title}>
                <span className={styles.title}>{this.genre.title} Music</span>
                <span className={styles.request}>REQUEST TO ADD ROOM</span>
              </div>
              <div className={styles.description}>
                <i>{this.genre.description}</i>
              </div>
              <div className={styles.iconArea}>
                <ShareIconMenu path={`/genres/${this.genre.title}`} picture={this.genre.artwork_url}
                  title={this.genre.title} description={this.genre.description} />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.right}>
          SIMILAR ROOMS
        </div>


        <div className={styles.left}>
          <div className={styles.leftContent}>
            <div className={styles.tags}>
              <span className={styles.t}>Tags:</span>
              {this.tags.map(tag => (<span key={tag} className={styles.tag}>#{tag}</span>))}
            </div>

            {this.state.rooms.map(room => <RoomPreview room={room} />)}
          </div>
        </div>


      </div>
    )
  }

}

export default Genre;
