import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
import { Container, Grid, Header, Segment } from 'semantic-ui-react'
import { Loading } from '../../components/Loading'
import PropTypes from 'prop-types'

import { ChapterMenu } from '../ChapterMenu'
import { Filter } from '../Filter'


const findRule = (ruleId, original) => {
  const regex = new RegExp('^' + ruleId + '(\\.|\\s)')
  return {
    chapters: original.chapters,
    entries: original.entries.filter(rule => regex.test(rule.join('')))
  }
}

export const Rulebook = () => {
  const ruleId = useParams().id
  const { pathname } = useLocation()

  const rules = useSelector(state => 
    state.rules
      ? ({
        ...state.rules,
        filtered: ruleId ? findRule(ruleId, state.rules.original) : state.rules.filtered
      })
      : null
  )

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  if (!rules) return <Loading />

  return (
    <Grid>
      <Grid.Column width={4}>
        <ChapterMenu chapters={rules.original.chapters}/>
      </Grid.Column>
      <Grid.Column width={12}>
        <Filter />
        <RuleList rules={rules.filtered}/>
      </Grid.Column>
    </Grid>
  )
}

export const RuleList = ({ rules }) => {
  const getKey = (rule) =>
    rule[0].split(' ', 2)[0]
  
  if (!rules) {
    return (
      <Segment placeholder textAlign='center'>
        <Header>
          Select a chapter or enter a filter.
        </Header>
      </Segment>
    )
  }

  return (
    <Container>
      { rules.entries.map(rule => 
        <Rule key={getKey(rule)} rule={rule} />
      )}
    </Container>
  )
}

RuleList.propTypes = {
  rules: PropTypes.object
}

const Rule = ({ rule }) => <Segment>{rule}</Segment>

Rule.propTypes = {
  rule: PropTypes.array.isRequired
}