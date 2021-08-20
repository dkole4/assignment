const reducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.data
    case 'CLEAR_FILTER':
      return ''
    default:
      return state
  }
}

export default reducer

