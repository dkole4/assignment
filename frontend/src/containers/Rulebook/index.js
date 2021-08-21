import React, { useEffect } from 'react'
import { useSelector } from "react-redux"
import { useLocation, useParams } from "react-router-dom"
import { Container, Grid, Header, Segment } from "semantic-ui-react"
import { Loading } from '../../components/Loading'

import { ChapterMenu } from "../ChapterMenu"
import { Filter } from "../Filter"


const findRule = (ruleId, state) => {
  const regex = new RegExp("^" + ruleId + "(\\.|\\s)")
  return {
    chapters: state.rules.original.chapters,
    entries: state.rules.original.entries.filter(rule => regex.test(rule))
  }
}

export const Rulebook = () => {
  const ruleId = useParams().id
  const { pathname } = useLocation()

  const rules = useSelector(state => 
    state.rules
      ? ({
          ...state.rules,
          filtered: ruleId ? findRule(ruleId, state) : state.rules.filtered
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
    rule[0].split(" ", 2)[0]
  
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

const Rule = ({ rule }) => <Segment>{rule}</Segment>