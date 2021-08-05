import { useSelector } from "react-redux"
import { Container, Segment } from "semantic-ui-react"


export const Rulebook = () => {
  const rules = useSelector(state => state.rules.filtered)

  if (!rules) {
    return (
      <Segment>
        loading rules..
      </Segment>
    )
  }

  return (
    <Container>
      { rules.entries.map(rule => 
        <Rule rule={rule} />
      )}
    </Container>
  )
}

const Rule = ({ rule }) => {
  return (
    <Segment>
      {rule}
    </Segment>
  )
}