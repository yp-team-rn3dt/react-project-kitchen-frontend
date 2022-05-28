import { Link } from 'react-router-dom';
import React from 'react';
import { connect } from 'react-redux';
import ListErrors from './ListErrors';
import agent from '../agent';
import {
  UPDATE_FIELD_AUTH,
  REGISTER,
  REGISTER_PAGE_UNLOADED,
} from '../constants/actionTypes';

const mapStateToProps = (state) => ({ ...state.auth });

const mapDispatchToProps = (dispatch) => ({
  onChangeEmail: (value) =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'email', value }),
  onChangePassword: (value) =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'password', value }),
  onChangeUsername: (value) =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'username', value }),
  onSubmit: (username, email, password) => {
    const payload = agent.Auth.register(username, email, password);
    dispatch({ type: REGISTER, payload });
  },
  onUnload: () => dispatch({ type: REGISTER_PAGE_UNLOADED }),
});

class Register extends React.Component {
  constructor() {
    super();

    // eslint-disable-next-line react/destructuring-assignment
    this.changeEmail = (ev) => this.props.onChangeEmail(ev.target.value);

    // eslint-disable-next-line react/destructuring-assignment
    this.changePassword = (ev) => this.props.onChangePassword(ev.target.value);

    // eslint-disable-next-line react/destructuring-assignment
    this.changeUsername = (ev) => this.props.onChangeUsername(ev.target.value);

    this.submitForm = (username, email, password) => (ev) => {
      ev.preventDefault();
      // eslint-disable-next-line react/destructuring-assignment
      this.props.onSubmit(username, email, password);
    };
  }

  componentWillUnmount() {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.onUnload();
  }

  render() {
    const { email, password, username, errors, inProgress } = this.props;

    return (
      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign Up</h1>
              <p className="text-xs-center">
                <Link to="/login">Have an account?</Link>
              </p>

              <ListErrors errors={errors} />

              <form onSubmit={this.submitForm(username, email, password)}>
                <fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Username"
                      value={username}
                      onChange={this.changeUsername}
                    />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={this.changeEmail}
                    />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={this.changePassword}
                    />
                  </fieldset>

                  <button
                    className="btn btn-lg btn-primary pull-xs-right"
                    type="submit"
                    disabled={inProgress}
                  >
                    Sign up
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);