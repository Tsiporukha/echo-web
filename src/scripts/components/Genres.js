import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import {genresNames} from '../lib/genres';


const GenreCard = props => (
  <Link to={`/genres/${props.title}`}>
    <div>
      {props.title}
    </div>
  </Link>
)

const Genres = props => (
  <div>
    {genresNames.map(genreName => <GenreCard key={genreName} title={genreName} />)}
  </div>
)

export default Genres;
