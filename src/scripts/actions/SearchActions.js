import {
  SET_SEARCH_TERM, ADD_TO_SEARCH_HISTORY,
  SET_LATEST_SEARCH, ADD_TO_LATEST_SEARCH, REMOVE_FROM_LATEST_SEARCH,
  SET_POPULAR_SEARCH, ADD_TO_POPULAR_SEARCH, REMOVE_FROM_POPULAR_SEARCH,
  SET_LONGEST_SEARCH, ADD_TO_LONGEST_SEARCH, REMOVE_FROM_LONGEST_SEARCH,
  SET_YOUTUBE, ADD_TO_YOUTUBE, REMOVE_FROM_YOUTUBE,
  SET_SOUNDCLOUD, ADD_TO_SOUNDCLOUD, REMOVE_FROM_SOUNDCLOUD,
  SET_VIMEO, ADD_TO_VIMEO, REMOVE_FROM_VIMEO,
} from '../constants/ActionTypes';

import {LatestSearch, PopularSearch, LongestSearch, Youtube, Soundcloud, Vimeo} from '../constants/creatorsArgs';

import {createSubFeedActions} from './actionsCreators';
import {addSongs} from './EntitiesAUDActions';
import {fetchAndReceiveStreams, setOrAddItems} from './SubFeedsActions';

import {getLatest, getPopular, getLongest} from '../lib/ebApi/streams';
import {createIdKeyHash, addIdsAndReduceToObject} from '../lib/base';
import {searchOnYoutube} from '../lib/youtube';
import {search as searchOnSoundcloud} from '../lib/soundcloud';
import {search as searchOnVimeo} from '../lib/vimeo';


const fetchAndReceiveSongs = (fetchAction, setItemsAction, addItemsAction) => (filters, setItemsCondition = filters.offset === 0) => dispatch =>
  fetchAction(filters).then(addIdsAndReduceToObject)
    .then(songsObj => Promise.resolve(dispatch(addSongs(songsObj)))
      .then(_ => setOrAddItems(setItemsCondition, setItemsAction, addItemsAction, Object.keys(songsObj))(dispatch))
    );


const setSearchTerm = term => ({
  type: SET_SEARCH_TERM,
  payload: term,
});


// Echo
export const {setLatestSearch, addToLatestSearch, removeFromLatestSearch} =
  createSubFeedActions(LatestSearch)(SET_LATEST_SEARCH, ADD_TO_LATEST_SEARCH, REMOVE_FROM_LATEST_SEARCH);
export const fetchAndReceiveLatestStreamsSearch = fetchAndReceiveStreams(getLatest, setLatestSearch, addToLatestSearch);

export const {setPopularSearch, addToPopularSearch, removeFromPopularSearch} =
  createSubFeedActions(PopularSearch)(SET_POPULAR_SEARCH, ADD_TO_POPULAR_SEARCH, REMOVE_FROM_POPULAR_SEARCH);
export const fetchAndReceivePopularStreamsSearch = fetchAndReceiveStreams(getPopular, setPopularSearch, addToPopularSearch);

export const {setLongestSearch, addToLongestSearch, removeFromLongestSearch} =
  createSubFeedActions(LongestSearch)(SET_LONGEST_SEARCH, ADD_TO_LONGEST_SEARCH, REMOVE_FROM_LONGEST_SEARCH);
export const fetchAndReceiveLongestStreamsSearch = fetchAndReceiveStreams(getLongest, setLongestSearch, addToLongestSearch);


// Youtube
export const {setYoutube, addToYoutube, removeFromYoutube} = createSubFeedActions(Youtube)(SET_YOUTUBE, ADD_TO_YOUTUBE, REMOVE_FROM_YOUTUBE);
export const fetchAndReceiveYoutubeSongs = fetchAndReceiveSongs(searchOnYoutube, setYoutube, addToYoutube);


// Soundcloud
export const {setSoundcloud, addToSoundcloud, removeFromSoundcloud} =
  createSubFeedActions(Soundcloud)(SET_SOUNDCLOUD, ADD_TO_SOUNDCLOUD, REMOVE_FROM_SOUNDCLOUD);
export const fetchAndReceiveSoundcloudSongs = fetchAndReceiveSongs(searchOnSoundcloud, setSoundcloud, addToSoundcloud);


// Vimeo
export const {setVimeo, addToVimeo, removeFromVimeo} =
  createSubFeedActions(Vimeo)(SET_VIMEO, ADD_TO_VIMEO, REMOVE_FROM_VIMEO);
export const fetchAndReceiveVimeoSongs = fetchAndReceiveSongs(searchOnVimeo, setVimeo, addToVimeo);

const clearSearchResults = () => dispatch => {
  dispatch(setLatestSearch([]));
  dispatch(setPopularSearch([]));
  dispatch(setLongestSearch([]));
  return dispatch(setYoutube([]));
};

const addToSearchHistory = term => ({
  type: ADD_TO_SEARCH_HISTORY,
  payload: term,
});

export const updateSearchTerm = term => dispatch => Promise.resolve(clearSearchResults()(dispatch)).then(_ => dispatch(setSearchTerm(term)))
  .then(_ => dispatch(addToSearchHistory(term)));
