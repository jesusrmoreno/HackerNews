require('./app.scss');

import {
  createStore,
  combineReducers,
} from 'redux';

import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import moment from 'moment';
import {
  selectFeed,
  requestPosts,
  receivePost,
  feedState,
  loadMore,
} from './state/actions.js'

let store = createStore(combineReducers({
  feed: feedState
}));

function getContentFromId(id) {
  let resource = 'https://hacker-news.firebaseio.com/v0/item/' + id + '.json';
  return fetch(resource)
    .then(res => {
      return res.json()
    });
}

function getFeed(feed) {
  store.dispatch(requestPosts(feed));
  let resource = 'https://hacker-news.firebaseio.com/v0/' + feed + '.json';
  fetch(resource)
    .then((res) => {
      return res.json()
    })
    .then((data) => {
      data.forEach((postId, index) => {
        getContentFromId(postId).then((content) => {
          store.dispatch(receivePost(feed, content));
        });
      });
    });
}

const App = React.createClass({
  getInitialState() {
    store.subscribe((state) => {
      this.setState(store.getState());
    });
    return store.getState();
  },
  componentDidMount() {
    getFeed('topstories');
  },
  loadMore() {
    store.dispatch(loadMore());
  },
  render() {
    let posts = this.state.feed.posts;
    return (
      <div className="app app--nightmode">
        <div className="navbar">
          <div className="nav-items">
          </div>
        </div>
        <div className="post-list">
          <div className="post-list__header">
            <h1>News</h1>
          </div>
          {posts.map((post, index) => {
            if (post.url !== undefined && index < this.state.feed.limit) {
              return (
                <div key={post.id} className="post">
                <div className="post__meta-score">
                  {post.score}
                </div>
                <div className="post__meta-title">
                  <a href={post.url}>{post.title}</a>
                </div>
                <div className="post__meta-timestamp">
                  {moment.unix(post.time).fromNow()}
                </div>
                </div>
              );
            }
          })}
          <div className="more">
            <button onClick={this.loadMore}>
              {(this.state.feed.limit > posts.length) && posts.length > 30 ? 'END' : 'LOAD MORE'}
            </button>
          </div>
        </div>
      </div>
    );
  }
});

ReactDOM.render(
  <App />,
  document.querySelector('#root')
);
