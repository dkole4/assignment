export const setFilter = (value) => {
  return async dispatch => {
    console.log(value)
    dispatch({
      type: 'SET_FILTER',
      data: value
    })
  }
}

export const clearFilter = () => {
  return async dispatch => {
    dispatch({
      type: 'CLEAR_FILTER'
    })
  }
}