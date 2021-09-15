/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {
  FaHome,
  FaSignInAlt,
  FaUserAlt,
  FaCircle,
  FaPowerOff,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as N from './styles';
import * as actions from '../../store/modules/auth/actions';
import history from '../../services/history';

export default function Header() {
  const isLogged = useSelector((state) => state.auth.isLogged);
  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(actions.loginFailure());

    history.push('/');
  };
  return (
    <>
      <N.Nav>
        <Link to='/alunos'>
          <FaHome size={24} />
        </Link>

        <Link to='/register'>
          <FaUserAlt size={24} />
        </Link>
        {isLogged ? (
          <Link onClick={handleLogout} to='/logout'>
            <FaPowerOff size={24} />
          </Link>
        ) : (
          <Link to='/login'>
            <FaSignInAlt size={24} />
          </Link>
        )}

        {isLogged && <FaCircle size={24} color='#66ff33' />}
      </N.Nav>
    </>
  );
}
