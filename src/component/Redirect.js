import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function Redirect ({ path, element }) {
  const token = useSelector(state => state.token) ?? '';
  if (path === '/App') {
    if (token.length > 0) {
      return <Navigate to={{ pathname: path }} />;
    } else {
      return element;
    }
  } else {
    if (token.length > 0) {
      return element;
    } else {
      return <Navigate to={{ pathname: path }} />;
    }
  }
}
