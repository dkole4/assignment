import { useDispatch } from "react-redux"
import { Input, Button, Container } from "semantic-ui-react"
import { clearFilter, setFilter } from "../reducer-filter"
import { useField } from "../utils"


export const Filter = () => {
	const [inputValue, resetValue] = useField()

	const dispatch = useDispatch()

	const filter = () => {
		dispatch(setFilter(inputValue.value))
    removeFilter()
  }
  
  const removeFilter = () => 
    dispatch(clearFilter())

	return (
		<Container>
			<Input {...inputValue} />
			<Button
				onClick={filter}
				content="Filter" />
			<Button
        icon="plus"
				onClick={removeFilter} />
		</Container>
	)
}