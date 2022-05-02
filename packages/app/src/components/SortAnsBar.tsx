import { AnsSortBy } from '../types'
import { VButton as Button, VButtonGroup as ButtonGroup } from './CompStore'

interface SortAnsBarProps {
  sortBy: AnsSortBy
  setSortBy: (...args: any) => void
}

const SortAnsBar = ({ sortBy, setSortBy }: SortAnsBarProps) => {
  const handleSortChange = (e: React.MouseEvent) => {
    setSortBy((e.target as HTMLButtonElement).innerText.toUpperCase())
  }

  return (
    <ButtonGroup>
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
