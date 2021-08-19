import { parseRules } from "./utils"

const reducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return {
        ...state,
        filtered: {
          chapters: state.original.chapters,
          entries: state.original.entries.filter(a => a.includes(action.data))
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

export const initializeRules = (stream) => {
  return async dispatch => {
    const rules = await parseRules(stream)

    dispatch({
      type: 'INIT',
      data: { original: rules, filtered: null }
    })
  }
}

export const setChapter = (key) => {
  return async dispatch => {
    dispatch({
      type: 'SET_CHAPTER',
      data: new RegExp('^' + key)
    })
  }
}

export default reducer