import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Container } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

import { initializeRules } from './reducer-rules'
import { Filter } from './components/Filter'
import { Rulebook } from './components/Rulebook'


export const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeRules())
  }, [dispatch])

  return (
    <Container>
      <Filter />
      <Rulebook />
    </Container>
  )
}