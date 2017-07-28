import {
  SET_LATEST, ADD_TO_LATEST, REMOVE_FROM_LATEST,
  SET_POPULAR, ADD_TO_POPULAR, REMOVE_FROM_POPULAR,
  SET_LONGEST, ADD_TO_LONGEST, REMOVE_FROM_LONGEST
} from '../constants/ActionTypes';

import {Latest, Popular, Longest} from '../constants/creatorsArgs';

import {createSubFeedActions} from './actionsCreators';

import {addNormalizedStreamsData, updateStreams} from './EntitiesAUDActions';

import {get as getStreams, getPopular, getLongest, like, unlike} from '../lib/ebApi/streams';
import {reduceToNormalized as reduceStreamsToNormalized} from '../lib/stream';


// items
export const setOrAddItems = (setItemsCondition, setItemsAction, addItemsAction, items) => dispatch =>
  dispatch((setItemsCondition ? setItemsAction : addItemsAction)(items));


// streams
export const fetchAndReceiveStreams =
  (fetchAction, setItemsAction, addItemsAction) => (filters, token, setItemsCondition = filters.offset === 0) => dispatch =>
    fetchAction(filters, token).then(data => Promise.resolve(addNormalizedStreamsData(reduceStreamsToNormalized(data.streams))(dispatch))
      .then(_ => setOrAddItems(setItemsCondition, setItemsAction, addItemsAction, data.streams.map(s => s.id))(dispatch))
    );


const updateLikedStreamData = stream => ({[stream.id]: {...stream, likes_count: stream.likes_count + 1, your_likes: 1}});
const updateUnlikedStreamData = stream => ({[stream.id]: {...stream, likes_count: stream.likes_count - 1, your_likes: 0}});

const updateStreamAfterLikeAction = (updateStreamFunc, stream) => dispatch =>
  resp => resp.status === 200 ? dispatch(updateStreams(updateStreamFunc(stream))) : false;

export const likeStream = (stream, token) => dispatch =>
  like(stream.id, token).then(updateStreamAfterLikeAction(updateLikedStreamData, stream)(dispatch));
export const unlikeStream = (stream, token) => dispatch =>
  unlike(stream.id, token).then(updateStreamAfterLikeAction(updateUnlikedStreamData, stream)(dispatch));



// SubFeeds
export const {setLatest, addToLatest, removeFromLatest} = createSubFeedActions(Latest)(SET_LATEST, ADD_TO_LATEST, REMOVE_FROM_LATEST);
export const fetchAndReceiveLatestStreams = fetchAndReceiveStreams(getStreams, setLatest, addToLatest);

export const {setPopular, addToPopular, removeFromPopular} = createSubFeedActions(Popular)(SET_POPULAR, ADD_TO_POPULAR, REMOVE_FROM_POPULAR);
export const fetchAndReceivePopularStreams = fetchAndReceiveStreams(getPopular, setPopular, addToPopular);

export const {setLongest, addToLongest, removeFromLongest} = createSubFeedActions(Longest)(SET_LONGEST, ADD_TO_LONGEST, REMOVE_FROM_LONGEST);
export const fetchAndReceiveLongestStreams = fetchAndReceiveStreams(getLongest, setLongest, addToLongest);
