import { VButton as Button, VButtonGroup as ButtonGroup } from './CompStore'

const SortAnsBar = ({ sortBy, setSortBy }) => {
  const handleSortChange = e => {
    setSortBy(e.target.innerText.toUpperCase())
  }

  return (
    <ButtonGroup
    >
      <Button
        variant={sortBy === 'VOTES' ? 'contained' : 'outlined'}
        onClick={handleSortChange}
      >
        Votes
      </Button>
      <Button
        variant={sortBy === 'NEWEST' ? 'contained' : 'outlined'}
        onClick={handleSortChange}
      >
        Newest
      </Button>
      <Button
        variant={sortBy === 'OLDEST' ? 'contained' : 'outlined'}
        onClick={handleSortChange}
      >
        Oldest
      </Button>
    </ButtonGroup>
  )
}

export default SortAnsBar
