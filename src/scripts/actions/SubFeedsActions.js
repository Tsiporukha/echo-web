import {
  SET_LATEST, ADD_TO_LATEST, REMOVE_FROM_LATEST,
  SET_POPULAR, ADD_TO_POPULAR, REMOVE_FROM_POPULAR,
  SET_LONGEST, ADD_TO_LONGEST, REMOVE_FROM_LONGEST
} from '../constants/ActionTypes';

import {Latest, Popular, Longest} from '../constants/creatorsArgs';

import {createSubFeedActions} from './actionsCreators';

import {addNormalizedStreamsData} from './EntitiesAUDActions';

import {get as getStreams} from '../lib/ebApi/streams';
import {reduceToNormalized as reduceStreamsToNormalized} from '../lib/stream';


// items
export const setOrAddItems = (setItemsCondition, setItemsAction, addItemsAction, items) => dispatch =>
  dispatch((setItemsCondition ? setItemsAction : addItemsAction)(items));


// streams
export const fetchAndReceiveStreams = (fetchAction, setItemsAction, addItemsAction) => (filters, setItemsCondition = filters.offset === 0) => dispatch =>
  fetchAction(filters).then(data => Promise.resolve(addNormalizedStreamsData(reduceStreamsToNormalized(data.streams))(dispatch))
    .then(_ => setOrAddItems(setItemsCondition, setItemsAction, addItemsAction, data.streams.map(s => s.id))(dispatch))
);


/// Sub Feeds


//Global
export const {setLatest, addToLatest, removeFromLatest} = createSubFeedActions(Latest)(SET_LATEST, ADD_TO_LATEST, REMOVE_FROM_LATEST);
export const fetchAndReceiveLatestStreams = fetchAndReceiveStreams(getStreams, setLatest, addToLatest);

export const {setPopular, addToPopular, removeFromPopular} = createSubFeedActions(Popular)(SET_POPULAR, ADD_TO_POPULAR, REMOVE_FROM_POPULAR);
export const fetchAndReceivePopularStreams = fetchAndReceiveStreams(getStreams, setPopular, addToPopular);

export const {setLongest, addToLongest, removeFromLongest} = createSubFeedActions(Longest)(SET_LONGEST, ADD_TO_LONGEST, REMOVE_FROM_LONGEST);
export const fetchAndReceiveLongestStreams = fetchAndReceiveStreams(getStreams, setLongest, addToLongest);
