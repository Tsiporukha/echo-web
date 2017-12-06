import React, {Component} from 'react';
import {connect} from 'react-redux';

import RoomCard from '../components/RoomCard';

import {maybeGetWithNestedEntities} from '../lib/room';


const mapStateToProps = (state, ownProps) => ({
  ...maybeGetWithNestedEntities(state, ownProps.id),
  token: state.session.token,
  currentUserId: !!state.session.user && state.session.user.id,
});

const mapDispatchToProps = dispatch => ({
});


export default connect(mapStateToProps, mapDispatchToProps)(RoomCard);
