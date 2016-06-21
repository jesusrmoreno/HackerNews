const SELECT_FEED = 'SELECT_FEED';
const REQUEST_POSTS = 'REQUEST_POSTS';
const RECEIVE_POST = 'RECEIVE_POST';
const INCREASE_LIMIT = 'INCREASE_LIMIT';

export function selectFeed(feed) {
  return {
    type: SELECT_FEED,
    feed
  };
}


export function requestPosts(feed) {
  return {
    type: REQUEST_POSTS,
    feed
  };
}

export function receivePost(feed, post) {
  return {
    type: RECEIVE_POST,
    feed,
    post,
  };
}

export function loadMore() {
  return {
    type: INCREASE_LIMIT
  };
}

let feed = {
  feed: 'top',
  posts: [],
  isFetching: true,
  limit: 30,
}

export function feedState(state = feed, action) {
  let newState = _.assign({}, state);
  switch (action.type) {
    case RECEIVE_POST:
      let current = newState.posts;
      current.push(action.post);
      newState.posts = current;
      return newState;
    case SELECT_FEED:
      newState.feed = action.feed;
      return newState;
    case REQUEST_POSTS:
      return newState;

    case INCREASE_LIMIT:
      newState.limit += 30;
      return newState;
    default:
      return state;
  }
}
