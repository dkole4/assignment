import React from 'react'
import { useDispatch } from "react-redux"
import { useHistory } from 'react-router-dom'
import { 
  Input, Button, Segment, Grid, Icon
} from "semantic-ui-react"
import { clearFilter, setFilter } from "../reducer-filter"
import { useField } from "../utils"


export const Filter = () => {
	const [inputValue, resetValue] = useField()

	const dispatch = useDispatch()
  const history = useHistory()

	const filter = async () => {
		dispatch(setFilter(inputValue.value))
    history.push('/rulebook/search')
  }
  
  const removeFilter = async () => {
		resetValue()
    dispatch(clearFilter())
	}

	return (
		<Segment>
			<Grid>
				<Grid.Column width={14}>
					<Input
            placeholder='Search rules...'
						fluid
						{...inputValue} 
						icon={<Icon name='cancel' link onClick={removeFilter} />}/>
				</Grid.Column>
				<Grid.Column width={2}>
					<Button
						positive
						fluid
						onClick={filter}
						content="Search" />
				</Grid.Column>
			</Grid>
		</Segment>
	)
}