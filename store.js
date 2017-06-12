const store = {
  searchTerm: 'some search phrase',
  feed: {
    active: 'global',
    global: {
      active: 'latest'
      latest: ['ssome1', 'ssome14'],
      mostPopular: ['ssome3', 'ssome34'],
      offset: 0,
      limit: 5,
      fetchedAll: false
    },
    youtube: {
      offset: 10,
      songs: ['fwqf-fwqf', 'qweqwr-saf']
    }
  },
  queue: {
    opened: true,
    items: {
      someId: 'stream',

    }
  },
  songs: {
    id1: {song: 'songId1'}
  },
  streams: {
    id1: {id: 'id1', someData: 'here it go', source: 'yt'}
  }
}
