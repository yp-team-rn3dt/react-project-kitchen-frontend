import { Link } from 'react-router-dom';
import React from 'react';
import { connect } from 'react-redux';
import ListErrors from '../../ListErrors';
import agent from '../../../agent';
import {
  UPDATE_FIELD_AUTH,
  LOGIN,
  LOGIN_PAGE_UNLOADED,
} from '../../../constants/actionTypes';

const mapStateToProps = (state) => ({ ...state.auth });

const mapDispatchToProps = (dispatch) => ({
  onChangeEmail: (value) =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'email', value }),
  onChangePassword: (value) =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'password', value }),
  onSubmit: (email, password) =>
    dispatch({ type: LOGIN, payload: agent.Auth.login(email, password) }),
  onUnload: () => dispatch({ type: LOGIN_PAGE_UNLOADED }),
});

const Login = ({
  email,
  password,
  errors,
  inProgress,
  onSubmit,
  onChangeEmail,
  onChangePassword,
}) => {
  const changeEmail = (ev) => {
    onChangeEmail(ev.target.value);
  };

  const changePassword = (ev) => {
    onChangePassword(ev.target.value);
  };

  const submitForm = (email, password) => (ev) => {
    ev.preventDefault();
    onSubmit(email, password);
  };

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Войти</h1>
            <p className="text-xs-center">
              <Link to="/register">Хотите создать аккаунт?</Link>
            </p>

            <ListErrors errors={errors} />

            <form onSubmit={submitForm(email, password)}>
              <fieldset>
                <fieldset className="form-group">
                  <label htmlFor="email">
                    Email
                    <input
                      id="email"
                      className="form-control form-control-lg"
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={changeEmail}
                    />
                  </label>
                </fieldset>

                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={changePassword}
                  />
                </fieldset>

                <button
                  className="btn btn-lg btn-primary pull-xs-right"
                  type="submit"
                  disabled={inProgress}
                >
                  Sign in
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
