const reducer = (state = "", action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.data
    case 'CLEAR_FILTER':
      return ""
    default:
      return state
  }
}

export const setFilter = (value) => {
  return async dispatch => {
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

export default reducer

