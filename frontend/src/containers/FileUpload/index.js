import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { 
  Button, Divider, Form, Grid, Header, Segment
} from 'semantic-ui-react'

import { Loading } from '../../components/Loading'
import { initializeRules } from '../../store/actions/rules-actions'
import { useField } from '../../utils'


const { REACT_APP_PROXY } = process.env

export const FileUpload = () => {
  const [loading, setLoading] = useState(false)

  return (
    <Segment placeholder textAlign='center'>
      { !loading
        ? 
          <>
            <Grid columns={2} relaxed='very' stackable>
              <Grid.Column>
                <Header>
                  Upload rules file:
                </Header>
                <FileUploadForm setLoading={setLoading} />
              </Grid.Column>
        
              <Grid.Column verticalAlign='middle'>
                <Header>
                  Give a URL to the file:
                </Header>
                <URLUploadForm setLoading={setLoading} />
              </Grid.Column>
            </Grid>
        
            <Divider vertical>Or</Divider>
          </>
        : <Loading />}
    </Segment>
  )
}

const URLUploadForm = ({ setLoading }) => {
  const [url, resetUrl] = useField('text')
  const dispatch = useDispatch()
  const history = useHistory()
  
  const handleRequest = async (e) => {
    e.preventDefault()
    
    fetch(REACT_APP_PROXY + url.value)
      .then((response) => {
        dispatch(initializeRules(response.body))
      })

    history.push('/')
    setLoading(true)
    resetUrl()
  }

  return (
    <Form>
      <Form.Field>
        <label>URL</label>
        <input placeholder='Rules file URL' {...url} />
      </Form.Field>
      <Button
        positive
        fluid
        onClick={handleRequest}
      >
        Request
      </Button>
    </Form>
  )
}


const FileUploadForm = ({ setLoading }) => {
  const [file, setFile] = useState(null)
  const dispatch = useDispatch()
  const history = useHistory()

  const updateFile = (e) => 
    setFile(e.target.files[0])
  
  const handleUpload = async (e) => {
    if (!file)
      return
    e.preventDefault()
    dispatch(initializeRules(file.stream()))
    history.push('/')
    setLoading(true)
  }

  return (
    <Form>
      <Form.Field>
        <label>File</label>
        <input 
          placeholder='File containing rules'
          type='file'
          onChange={updateFile}/>
      </Form.Field>
      <Button
        positive
        fluid
        onClick={handleUpload}
      >
        Upload
      </Button>
    </Form>
  )
}