import React from 'react';
import { connect } from 'react-redux';
import Banner from './Banner/Banner';
import MainView from './MainView';
import Sidebar from './Sidebar/Sidebar';
import agent from '../../agent';
import {
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED,
  APPLY_TAG_FILTER,
} from '../../constants/actionTypes';
import styles from './index.module.css';

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
      <div>
        <Banner token={token} appName={appName} />

        <main className={styles.container}>
          <MainView />

          <Sidebar tags={tags} onClickTag={onClickTag} />
        </main>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
