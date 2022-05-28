import React from 'react';
import { connect } from 'react-redux';
import ListErrors from './ListErrors';
import agent from '../agent';
import {
  SETTINGS_SAVED,
  SETTINGS_PAGE_UNLOADED,
  LOGOUT,
} from '../constants/actionTypes';

class SettingsForm extends React.Component {
  constructor() {
    super();
    this.state = {
      image: '',
      username: '',
      bio: '',
      email: '',
      password: '',
    };

    this.updateState = (field) => (ev) => {
      const { state } = this;
      const newState = { ...state, [field]: ev.target.value };
      this.setState(newState);
    };

    this.submitForm = (ev) => {
      ev.preventDefault();

      const user = { ...this.state };
      if (!user.password) {
        delete user.password;
      }

      // eslint-disable-next-line react/destructuring-assignment
      this.props.onSubmitForm(user);
    };
  }

  UNSAFE_componentWillMount() {
    const currentUser = this.props;
    if (currentUser) {
      Object.assign(this.state, {
        image: currentUser.image || '',
        username: currentUser.username,
        bio: currentUser.bio,
        email: currentUser.email,
      });
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser) {
      this.setState({
        image: nextProps.currentUser.image || '',
        username: nextProps.currentUser.username,
        bio: nextProps.currentUser.bio,
        email: nextProps.currentUser.email,
      });
    }
  }

  render() {
    const { image, username, bio, email, password, inProgress } = this.state;
    return (
      <form onSubmit={this.submitForm}>
        <fieldset>
          <fieldset className="form-group">
            <input
              className="form-control"
              type="text"
              placeholder="URL of profile picture"
              value={image}
              onChange={this.updateState('image')}
            />
          </fieldset>

          <fieldset className="form-group">
            <input
              className="form-control form-control-lg"
              type="text"
              placeholder="Username"
              value={username}
              onChange={this.updateState('username')}
            />
          </fieldset>

          <fieldset className="form-group">
            <textarea
              className="form-control form-control-lg"
              rows="8"
              placeholder="Short bio about you"
              value={bio}
              onChange={this.updateState('bio')}
            />
          </fieldset>

          <fieldset className="form-group">
            <input
              className="form-control form-control-lg"
              type="email"
              placeholder="Email"
              value={email}
              onChange={this.updateState('email')}
            />
          </fieldset>

          <fieldset className="form-group">
            <input
              className="form-control form-control-lg"
              type="password"
              placeholder="New Password"
              value={password}
              onChange={this.updateState('password')}
            />
          </fieldset>

          <button
            className="btn btn-lg btn-primary pull-xs-right"
            type="submit"
            disabled={inProgress}
          >
            Update Settings
          </button>
        </fieldset>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.settings,
  currentUser: state.common.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  onClickLogout: () => dispatch({ type: LOGOUT }),
  onSubmitForm: (user) =>
    dispatch({ type: SETTINGS_SAVED, payload: agent.Auth.save(user) }),
  onUnload: () => dispatch({ type: SETTINGS_PAGE_UNLOADED }),
});

function Settings({ errors, currentUser, onSubmitForm, onClickLogout }) {
  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Your Settings</h1>

            <ListErrors errors={errors} />

            <SettingsForm
              currentUser={currentUser}
              onSubmitForm={onSubmitForm}
            />

            <hr />

            <button
              className="btn btn-outline-danger"
              onClick={onClickLogout}
              type="button"
            >
              Or click here to logout.
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
