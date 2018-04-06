import App from '../components/App';

import FeedSources from '../components/FeedSources';
import NotFound from '../components/NotFound';
import Genre from '../containers/Genre';
import Room from '../containers/Room';
import Stream from '../containers/Stream';
import Profile from '../containers/Profile';

import {getSubPath} from '../lib/url';
import {fetchUser, fetchStream} from '../actions/EntitiesAUDActions';


const routes = [
  {
    component: App,
    routes: [
      {
        path: '/',
        exact: true,
        component: FeedSources,
      },
      {
        path: '/feed/:id',
        exact: true,
        component: Stream,
        fetchData: (store, {url, token}) =>
          store.dispatch(fetchStream(getSubPath(url, -1), token)),
      },
      {
        path: '/profile/:id',
        exact: true,
        component: Profile,
        fetchData: (store, {url, token}) =>
          store.dispatch(fetchUser(getSubPath(url, -1), token)),
      },
      {
        path: '/genres/:title',
        exact: true,
        component: Genre,
      },
      {
        path: '/genres/:genre/rooms/:id',
        exact: true,
        component: Room,
      },
      {
        path: '*',
        component: NotFound,
      },
    ],
  },
];

export default routes;
