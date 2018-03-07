import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import FeedSources from '../components/FeedSources';

import {updateSearchTerm} from '../actions/SearchActions';

import styles from '../../assets/styles/search.css';

const mapStateToProps = state => ({
  term: state.search.term,
});

const mapDispatchToProps = dispatch => ({
  updateSearchTerm: term => dispatch(updateSearchTerm(term)),
});


class Search extends Component {
  static propTypes = {
    term: PropTypes.string,
    updateSearchTerm: PropTypes.func,
  };

  setInput = input => this.setState({input});
  onInputChange = event => this.setInput(event.target.value);

  showResults = () => this.setState({resultsVisibility: true});
  hideResults = () => this.setState({resultsVisibility: false});


  getKeyCodeAction = (keyCode, target) => {
    switch (keyCode) {
      case 13: return this.props.updateSearchTerm(target.value);
      case 27: return this.clear().then(target.blur());
      default: false;
    }
    return false;
  };

  onInputKeyUp = e => this.getKeyCodeAction(e.keyCode, e.target);

  clear = () => Promise.resolve(this.hideResults()).then(this.props.updateSearchTerm(''));

  onMaybePathChange = (nextProps, props) =>
    nextProps.location.pathname === props.location.pathname || this.hideResults();

  onMaybeTermChange = (nextProps, props = this.props) =>
    nextProps.term === props.term || this.setInput(nextProps.term);


  state = {
    input: this.props.term,
    resultsVisibility: false,
  };

  componentWillReceiveProps = nextProps => {
    this.onMaybeTermChange(nextProps, this.props);
    return this.onMaybePathChange(nextProps, this.props);
  };

  render() {
    return (
      <div className={styles.root}>

        <div className={styles.searchBox}>
          <input type='text' id='searchInput' placeholder='Search Genre, Mood'
            className={styles.input}
            onFocus={this.showResults}
            value={this.state.input}
            onKeyUp={this.onInputKeyUp}
            onChange={this.onInputChange}
          />

          <span className={styles.inputAddon}>
            {this.state.resultsVisibility && <i className={styles.clearIcon} onClick={this.clear}>clear</i>}
          </span>
        </div>


        {this.state.resultsVisibility && <div>
          <div className={styles.results} onFocus={this.showResults}>
            <FeedSources search />
          </div>

          <i className={styles.backIcon} onClick={this.hideResults}>arrow_back</i>
        </div>}

      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search));

export const getSearchInput = () => document.getElementById('searchInput');
