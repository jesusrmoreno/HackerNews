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

const Post = (props) => {
  return (
    <div key={props.id} className="post">
      <div className="post__meta-index">
        {props.index}
      </div>
      <div className="post__meta-score">
        {props.score}
      </div>
      <div className="post__meta-title">
        <a href={props.url}>{props.title}</a>
      </div>
      <div className="post__meta-timestamp">
        {moment.unix(props.time).fromNow()}
      </div>
    </div>
  );
};

const Container = (props) => {
  return (
    <div className="container" style={{ maxWidth: props.width }}>
      {props.children}
    </div>
  );
}

const PostList = (props) => {
  if (props.loaded) {
    return (
      <div>
        {props.posts.map((post, index) => {
          if (!_.isUndefined(post.url) && index < props.limit) {
            return (
              <Post
                key={post.id}
                id={post.id}
                index={index += 1}
                url={post.url}
                score={post.score}
                title={post.title}
                time={post.time}
              />
            );
          }
        })}
      </div>
    );
  } else {
    return (
      <div className="loader">
        Loading...
      </div>
    )
  }
};

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
          <Container width={900}>
            <ul className="nav-items">
              <li className="nav__title">Hacker News</li>
            </ul>
          </Container>
        </div>
        <Container width={900}>
          <div className="post-list__header">
            <h1>News</h1>
          </div>
          <PostList
            posts={posts}
            limit={this.state.feed.limit}
            loaded={posts.length > 30}
          />
          <div className="more">
            <button onClick={this.loadMore} style={{
              display: posts.length > 30 ? 'inline-block': 'none'
            }}>
              {(this.state.feed.limit > posts.length) && posts.length > 30 ? 'END' : 'LOAD MORE'}
            </button>
          </div>
        </Container>
      </div>
    );
  }
});

ReactDOM.render(
  <App />,
  document.querySelector('#root')
);
