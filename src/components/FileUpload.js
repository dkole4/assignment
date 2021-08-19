import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Button, Divider, Form, Grid, Header, Icon, Input, Label, Segment } from 'semantic-ui-react'
import { initializeRules } from '../reducer-rules'
import { useField } from '../utils'

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
        : <Header as='h2' icon>
            <Icon loading name='circle notch' />
            Loading...
            <Header.Subheader>
              Setting up your personal rulebook...
            </Header.Subheader>
          </Header>}
    </Segment>
  )
}

const URLUploadForm = ({ setLoading }) => {
  const [url, resetUrl] = useField('text')
  const dispatch = useDispatch()
  const history = useHistory()
  
  const handleRequest = async (e) => {
    e.preventDefault()
    console.log(url)
    fetch(url.value)
      .then((response) => {
        dispatch(initializeRules(response.body))
      })
    history.push('/rulebook')
    setLoading(true)
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
    history.push('/rulebook')
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