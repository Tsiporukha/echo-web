import {
  SET_GLOBAL, SET_GLOBAL_ITEMS, ADD_TO_GLOBAL_ITEMS, DELETE_FROM_GLOBAL_ITEMS, SET_GLOBAL_FILTERS
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

export const {setGlobal, setGlobalItems, addItemsToGlobal, deleteFromGlobalItems, setGlobalFilters} = createSubFeedActions('Global')(SET_GLOBAL,
  SET_GLOBAL_ITEMS, ADD_TO_GLOBAL_ITEMS, DELETE_FROM_GLOBAL_ITEMS, SET_GLOBAL_FILTERS);
export const fetchAndReceiveGlobalStreams = fetchAndReceiveStreams(setGlobalItems, addItemsToGlobal);
