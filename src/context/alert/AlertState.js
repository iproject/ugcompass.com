import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import AlertContext from './alertContext';
import alertReducer from './alertReducer';
import { SET_ALERT, REMOVE_ALERT } from '../types';

const AlertState = (props) => {
  // Initial State
  const initialState = [];

  // Reducer
  const [state, dispatch] = useReducer(alertReducer, initialState);

  /*===========
    Actions
  ============*/

  // Set Alert
  const setAlert = (msg, type, icon = '', subMessage = '', timeout = 5000) => {
    const id = uuidv4();

    dispatch({
      type: SET_ALERT,
      payload: { msg, subMessage, type, icon, id },
    });

    setTimeout(() => {
      dispatch({
        type: REMOVE_ALERT,
        payload: id,
      });
    }, timeout);
  };

  return (
    <AlertContext.Provider
      value={{
        alerts: state,
        setAlert,
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
