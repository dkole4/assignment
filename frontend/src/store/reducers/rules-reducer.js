const reducer = (state = null, action) => {
  switch (action.type) {
  case 'SET_FILTER':
    return {
      ...state,
      filtered: {
        chapters: state.original.chapters,
        entries: state.original.entries.filter(a => 
          a.map(a => typeof a === 'string' ? a : a.key)
            .join('')
            .toLowerCase()
            .includes(action.data)
        )
      }
    }
  case 'CLEAR_FILTER':
    return {
      ...state,
      filtered: null
    }
  case 'SET_CHAPTER':
    return {
      ...state,
      filtered: {
        chapters: state.original.chapters.filter(a => action.data.test(a)),
        entries: state.original.entries.filter(a => action.data.test(a))
      }
    }
  case 'INIT':
    return action.data
  default:
    return state
  }
}


export default reducer