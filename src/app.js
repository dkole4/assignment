import React from 'react'
import { useSelector } from 'react-redux'
import { 
  Route, BrowserRouter as Router, Switch
} from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

import { Rulebook } from './components/Rulebook'
import { FileUpload } from './components/FileUpload'


export const App = () => {
  const rules = useSelector(state => state.rules)

  const unlockedRoutes = [
    <Route key='rulebook_id' path='/rulebook/:id'>
      <Rulebook />
    </Route>,
    <Route key='rulebook' path='/rulebook'>
      <Rulebook />
    </Route>,
    <Route key='initial' path='/'>
      <FileUpload /> 
    </Route>
  ]

  return (
    <Router>
      <Container>
        <Switch>
          { rules 
            ? unlockedRoutes : (
              <Route path='/'>
                <FileUpload /> 
              </Route>
            )
          }
        </Switch>
      </Container>
    </Router>
  )
}