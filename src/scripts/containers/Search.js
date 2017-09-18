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

  keyCodeActions = (keyCode, target) => {
    switch (keyCode) {
      case 13: return this.props.updateSearchTerm(target.value);
      case 27: return this.clear().then(target.blur());
      default: return false;
    }
    return false
  };

  isPropChanged = (newProp, oldProp) => newProp !== oldProp;

  onMaybeLocationChange = (nextProps, props = this.props) =>
    this.isPropChanged(nextProps.location.pathname, props.location.pathname) ? this.hideResults() : false;

  setInput = str => this.refs.input.value = str;
  onMaybeTermChange = (nextProps, props = this.props) => this.isPropChanged(nextProps.term, props.term) ? this.setInput(nextProps.term) : false;

  showResults = () => this.setState({resultsVisibility: true});
  hideResults = () => this.setState({resultsVisibility: false});
  onInputKeyUp = e => this.keyCodeActions(e.keyCode, e.target);
  clear = () => Promise.resolve(this.hideResults()).then(this.setInput('')).then(this.props.updateSearchTerm(''));


  state = {resultsVisibility: false};

  componentWillReceiveProps = nextProps => this.onMaybeTermChange(nextProps, this.props) || this.onMaybeLocationChange(nextProps, this.props);

  render(){
    return (
      <div className={styles.root}>

        <div className={styles.searchBox}>
          <input type='text' ref='input' className={styles.input} placeholder='Search Genre, Mood'
            onFocus={this.showResults}
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

export default connect(mapStateToProps, mapDispatchToProps)(Search);
