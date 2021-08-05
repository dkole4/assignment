import { fetchService } from "./services"
import { parseRules } from "./utils"

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return {
        ...state,
        filtered: state.rules.filter(a => a.contains(action.data))
      }
    case 'INIT':
      return action.data
    default:
      return state
  }
}

export const initializeRules = () => {
  return async dispatch => {
    const data = await fetchService.getRules()

    console.log(data)

    const rules = parseRules(data)

    dispatch({
      type: 'INIT',
      data: { rules, filtered: rules }
    })
  }
}

export default reducer