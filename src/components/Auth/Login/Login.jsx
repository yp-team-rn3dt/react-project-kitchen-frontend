import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import ListErrors from '../../ListErrors/ListErrors';
import agent from '../../../agent';
import {
  UPDATE_FIELD_AUTH,
  LOGIN,
  LOGIN_PAGE_UNLOADED,
} from '../../../constants/actionTypes';
import styles from './Login.module.css';
import IconAlert from '../../Icons/IconAlert';
import IconEye from '../../Icons/IconEye';
import IconEyeOff from '../../Icons/IconEyeOff';

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
      <IconEye onClick={handleShowPassword} className={styles.iconEye} />
    ) : (
      <IconEyeOff onClick={handleShowPassword} className={styles.iconEye} />
    );

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className={styles.heading}>Войти</h1>
            <p className={styles.textXsCenter}>
              <Link className={styles.text} to="/register">
                Хотите создать аккаунт?
              </Link>
            </p>

            <form
              className={styles.form}
              onSubmit={submitForm(email, password)}
            >
              <label className={styles.label} htmlFor="email">
                E-mail
                <div className={styles.inputWrapper}>
                  <input
                    className={cn(styles.input, errors?.email && styles.error)}
                    id="email"
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={changeEmail}
                  />
                  {errors?.email && <IconAlert className={styles.icon} />}
                </div>
                {errors?.email && <ListErrors errors={errors} />}
              </label>
              <label className={styles.label} htmlFor="password">
                Пароль
                <div className={styles.inputWrapper}>
                  <input
                    className={cn(
                      styles.input,
                      errors?.password && styles.error,
                    )}
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Пароль"
                    value={password}
                    onChange={changePassword}
                  />
                  {errors?.password ? (
                    <IconAlert className={styles.icon} />
                  ) : (
                    showIconEye()
                  )}
                </div>
                {errors?.password && <ListErrors errors={errors} />}
              </label>
              <button
                className={styles.button}
                type="submit"
                disabled={inProgress}
              >
                Войти
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
