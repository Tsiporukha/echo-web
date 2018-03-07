import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {updateSearchTerm} from '../actions/SearchActions';

import styles from '../../assets/styles/search.css';


const mapStateToProps = state => ({
  history: state.search.history,
});

const mapDispatchToProps = dispatch => ({
  updateSearchTerm: term => () => dispatch(updateSearchTerm(term)),
});


const SearchHistory = props => (
  <div className={styles.history}>
    <div className={styles.item}>RECENTLY SEARCHED:</div>
    {props.history.map(term => <div className={styles.item}><a onClick={props.updateSearchTerm(term)}>{term}</a></div>)}
  </div>
);

SearchHistory.propTypes = {
  history: PropTypes.array,
  updateSearchTerm: PropTypes.func,
};


export default connect(mapStateToProps, mapDispatchToProps)(SearchHistory);
