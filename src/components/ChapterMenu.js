import { useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { Menu } from "semantic-ui-react"
import { setChapter } from "../reducer-rules"


export const ChapterMenu = ({ chapters }) => {
  const [activeItem, setActiveItem] = useState('')

  const dispatch = useDispatch()
  const history = useHistory()

  const getKey = (chapter) =>
    chapter.split(' ', 2)[0]
  
  const setActive = (chapter) => {
    setActiveItem(chapter)
    dispatch(setChapter(chapter))
    history.push('/rulebook')
  }

  return (
    <Menu vertical>
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