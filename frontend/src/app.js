import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { 
  Route, BrowserRouter as Router, Switch
} from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

import { Rulebook } from './containers/Rulebook'
import { FileUpload } from './containers/FileUpload'
import ruleFile from './assets/rules.txt'
import { initializeRules } from './store/actions/rules-actions'


const { 
  REACT_APP_DL_DEFAULT,
  REACT_APP_PROXY
} = process.env

export const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    if (REACT_APP_DL_DEFAULT === 'file') {
      fetch(ruleFile)
        .then(response => {
          dispatch(initializeRules(response.body))
        })
    } else if (REACT_APP_PROXY) {
      fetch(REACT_APP_PROXY.concat(REACT_APP_DL_DEFAULT))
        .then((response) => {
          dispatch(initializeRules(response.body))
        })
    }
  }, [dispatch])

  return (
    <Router>
      <Container>
        <Switch>
          <Route path='/upload'>
            <FileUpload /> 
          </Route>
          <Route path='/:id'>
            <Rulebook />
          </Route>
          <Route path='/'>
            <Rulebook />
          </Route>
        </Switch>
      </Container>
    </Router>
  )
}