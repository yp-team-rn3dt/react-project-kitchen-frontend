import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';

import ListErrors from '../../ListErrors/ListErrors';
import Rn3dtButton from '../../UI/Button/Button';

import agent from '../../../agent';
import {
  UPDATE_FIELD_AUTH,
  LOGIN,
  LOGIN_PAGE_UNLOADED,
} from '../../../constants/actionTypes';

import IconAlert from '../../Icons/IconAlert';
import IconEye from '../../Icons/IconEye';
import IconEyeOff from '../../Icons/IconEyeOff';

import authStyles from '../Auth.module.scss';

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
  const [showPassword, setShowPassword] = useState(false);
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

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const showIconEye = () =>
    showPassword ? (
      <IconEye onClick={handleShowPassword} className={authStyles.iconEye} />
    ) : (
      <IconEyeOff onClick={handleShowPassword} className={authStyles.iconEye} />
    );

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className={cn(authStyles.heading, 'ta-center')}>Войти</h1>
            <p className="ta-center">
              <Link className={authStyles.text} to="/register">
                Хотите создать аккаунт?
              </Link>
            </p>

            <form
              className={authStyles.form}
              onSubmit={submitForm(email, password)}
            >
              <label className={authStyles.label} htmlFor="email">
                E-mail
                <div className={authStyles.inputWrapper}>
                  <input
                    className={cn(
                      authStyles.input,
                      errors?.email && authStyles.error,
                    )}
                    id="email"
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={changeEmail}
                  />
                  {errors?.email && <IconAlert className={authStyles.icon} />}
                </div>
                {errors?.email && (
                  <ListErrors errors={{ email: errors.email }} />
                )}
              </label>
              <label className={authStyles.label} htmlFor="password">
                Пароль
                <div className={authStyles.inputWrapper}>
                  <input
                    className={cn(
                      authStyles.input,
                      errors?.password && authStyles.error,
                    )}
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Пароль"
                    value={password}
                    onChange={changePassword}
                  />
                  {errors?.password ? (
                    <IconAlert className={authStyles.icon} />
                  ) : (
                    showIconEye()
                  )}
                </div>
                {errors?.password && (
                  <ListErrors errors={{ password: errors.password }} />
                )}
              </label>
              <Rn3dtButton
                isDisabled={inProgress}
                text="Войти"
                onClick={() => {}}
                type="submit"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);