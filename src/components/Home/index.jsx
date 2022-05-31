import React from 'react';
import { connect } from 'react-redux';
import Banner from './Banner/Banner';
import MainView from './MainView';
import Tags from './Tags/Tags';
import agent from '../../agent';
import {
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED,
  APPLY_TAG_FILTER,
} from '../../constants/actionTypes';

const { Promise } = global;

const mapStateToProps = (state) => ({
  ...state.home,
  appName: state.common.appName,
  token: state.common.token,
});

const mapDispatchToProps = (dispatch) => ({
  onClickTag: (tag, pager, payload) =>
    dispatch({
      type: APPLY_TAG_FILTER,
      tag,
      pager,
      payload,
    }),
  onLoad: (tab, pager, payload) =>
    dispatch({
      type: HOME_PAGE_LOADED,
      tab,
      pager,
      payload,
    }),
  onUnload: () => dispatch({ type: HOME_PAGE_UNLOADED }),
});

class Home extends React.Component {
  UNSAFE_componentWillMount() {
    const { token, onLoad } = this.props;
    const tab = token ? 'feed' : 'all';
    const articlesPromise = token ? agent.Articles.feed : agent.Articles.all;

    onLoad(
      tab,
      articlesPromise,
      Promise.all([agent.Tags.getAll(), articlesPromise()]),
    );
  }

  componentWillUnmount() {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.onUnload();
  }

  render() {
    const { token, appName, tags, onClickTag } = this.props;
    return (
      <div className="home-page">
        <Banner token={token} appName={appName} />
        <div className="container page">
          <div className="row">
            <MainView />

            <div className="col-md-3">
              <div className="sidebar">
                <p>Popular Tags</p>

                <Tags tags={tags} onClickTag={onClickTag} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
