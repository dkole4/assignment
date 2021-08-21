import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Button, Menu } from 'semantic-ui-react'
import PropTypes from 'prop-types'

import { setChapter } from '../../store/actions/rules-actions'


export const ChapterMenu = ({ chapters }) => {
  const [activeItem, setActiveItem] = useState('')

  const dispatch = useDispatch()
  const history = useHistory()

  const getKey = (chapter) =>
    chapter.split(' ', 2)[0]
  
  const setActive = (chapter) => {
    setActiveItem(chapter)
    dispatch(setChapter(chapter))
    history.push('/')
  }

  const redirectToUpload = () =>
    history.push('/upload')

  return (
    <Menu vertical>
      <Menu.Item>
        <Button
          primary
          onClick={redirectToUpload}
        >
          Upload another file
        </Button>
      </Menu.Item>
      
      { chapters.map(chapter => {
        const key = getKey(chapter)

        return (
          <Menu.Item
            key={key}
            name={key}
            active={activeItem === key}
            onClick={() => setActive(key)}
          >
            {chapter}
          </Menu.Item>
        )
      })}
    </Menu>
  )
}

ChapterMenu.propTypes = {
  chapters: PropTypes.array.isRequired
}