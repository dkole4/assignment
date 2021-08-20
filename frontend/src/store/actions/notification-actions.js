export const setErrorMessage = (content) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: { content, type: 'error' }
    })
    setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION',
        data: { content }
      })
    }, 5000)
  }
}

export const setNotificationMessage = (content) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: { content, type: 'notification' }
    })
    setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION',
        data: { content }
      })
    }, 5000)
  }
}

export const clearNotification = () => {
  return async dispatch => {
    dispatch({
      type: 'CLEAR_NOTIFICATION'
    })
  }
}