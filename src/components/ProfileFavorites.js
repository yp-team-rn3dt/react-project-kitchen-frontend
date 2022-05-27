import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import agent from '../agent';
import { Profile, mapStateToProps } from './Profile';
import {
  PROFILE_PAGE_LOADED,
  PROFILE_PAGE_UNLOADED,
} from '../constants/actionTypes';

const mapDispatchToProps = (dispatch) => ({
  onLoad: (pager, payload) =>
    dispatch({ type: PROFILE_PAGE_LOADED, pager, payload }),
  onUnload: () => dispatch({ type: PROFILE_PAGE_UNLOADED }),
});

class ProfileFavorites extends Profile {
  componentWillMount() {
    this.props.onLoad(
      (page) =>
        agent.Articles.favoritedBy(this.props.match.params.username, page),
      Promise.all([
        agent.Profile.get(this.props.match.params.username),
        agent.Articles.favoritedBy(this.props.match.params.username),
      ]),
    );
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  renderTabs() {
    const { profile } = this.props;
    return (
      <ul className="nav nav-pills outline-active">
        <li className="nav-item">
          <Link className="nav-link" to={`/@${profile.username}`}>
            My Articles
          </Link>
        </li>

        <li className="nav-item">
          <Link
            className="nav-link active"
            to={`/@${profile.username}/favorites`}
          >
            Favorited Articles
          </Link>
        </li>
      </ul>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileFavorites);
