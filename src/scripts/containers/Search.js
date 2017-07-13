import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import FeedSources from '../components/FeedSources';

import {updateSearchTerm} from '../actions/SearchActions';

import styles from '../../assets/styles/search.css';

const mapStateToProps = (state, ownProps) => ({
  term: state.search.term
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateSearchTerm: term => dispatch(updateSearchTerm(term))
});


class Search extends Component {

  isLocationChanged = (props, prevProps) => !(props.history.location == prevProps.history.location);
  isTermChanged = (props, nextProps) => !(props.term === nextProps.term);
  setInput = str => this.refs.input.value = str;

  onInputKeyUp = e => e.keyCode == 13 ? this.props.updateSearchTerm(e.target.value) : false;
  onInputFocus = () => this.setState({resultsVisibility: true});
  hideResults = () => Promise.resolve(this.setState({resultsVisibility: false})).then(this.setInput(''));
  clear = () => this.hideResults().then(this.props.updateSearchTerm(''));


  state = {resultsVisibility: false};

  render(){
    return (
      <div className={styles.root}>

        <div className={styles.searchBox}>
          <input type='text' ref='input' className={styles.input} placeholder='Search Genre, Mood'
            onFocus={this.onInputFocus}
            onKeyUp={this.onInputKeyUp}
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Search));
