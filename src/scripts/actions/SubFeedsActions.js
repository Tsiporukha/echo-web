import {
  SET_GLOBAL, ADD_TO_GLOBAL, DELETE_FROM_GLOBAL
} from '../constants/ActionTypes';

import {createSubFeedActions} from './actionsCreators';

import {addNormalizedStreamsData} from './EntitiesAUDActions';

import {get as getStreams} from '../lib/ebApi/streams';
import {reduceToNormalized as reduceStreamsToNormalized} from '../lib/stream';


// items
export const setOrAddItems = (setItemsCondition, setItemsAction, addItemsAction, items) => dispatch =>
  dispatch((setItemsCondition ? setItemsAction : addItemsAction)(items));


// streams
export const fetchAndReceiveStreams = (setItemsAction, addItemsAction) => (filters, setItemsCondition = filters.offset === 0) => dispatch =>
  getStreams(filters).then(data => Promise.resolve(addNormalizedStreamsData(reduceStreamsToNormalized(data.streams))(dispatch))
    .then(_ => setOrAddItems(setItemsCondition, setItemsAction, addItemsAction, data.streams.map(s => s.id))(dispatch))
);


// Sub Feeds

export const {setGlobal, addToGlobal, removeFromGlobal} = createSubFeedActions('Global')(SET_GLOBAL, ADD_TO_GLOBAL, DELETE_FROM_GLOBAL);
export const fetchAndReceiveGlobalStreams = fetchAndReceiveStreams(setGlobal, addToGlobal);
