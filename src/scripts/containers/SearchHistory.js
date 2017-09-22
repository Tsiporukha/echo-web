import React, {Component} from 'react';
import {connect} from 'react-redux';

import {updateSearchTerm} from '../actions/SearchActions';

import styles from '../../assets/styles/search.css';


const mapStateToProps = state => ({
  history: state.search.history,
});

const mapDispatchToProps = dispatch => ({
  updateSearchTerm: term => () => dispatch(updateSearchTerm(term)),
});


const SearchHistory = ({history, updateSearchTerm}) => (
  <div className={styles.history}>
    <div className={styles.item}>RECENTLY SEARCHED:</div>
    {history.map(term => <div className={styles.item}><a onClick={updateSearchTerm(term)}>{term}</a></div>)}
  </div>
);


export default connect(mapStateToProps, mapDispatchToProps)(SearchHistory);
