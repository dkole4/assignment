import { parseRules } from "../../utils/fileProcessing"

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