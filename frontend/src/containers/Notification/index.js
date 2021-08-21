import React from 'react'
import { useSelector } from 'react-redux'
import { Message } from 'semantic-ui-react'


export const Notification = () => {
  const message = useSelector(state => state.notification)

  if (message === '') return null

  return (
    <Message floating>
      {message}
    </Message>
  )
}