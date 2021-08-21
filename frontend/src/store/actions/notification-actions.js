export const setFileErrorMessage = () => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: 'An error occurer while fetching file, please try again or check given URL'
    })
    setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION'
      })
    }, 5000)
  }
}