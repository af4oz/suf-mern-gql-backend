import React from 'react'
import 'twin.macro'
import { VButton as Button, VButtonGroup as ButtonGroup } from '../CompStore'

interface SortQuesBarProps {
  sortBy: 'HOT' | 'VOTES' | 'VIEWS' | 'NEWEST' | 'OLDEST'
  setSortBy: (...args: any) => void
}

const SortQuesBar = ({ sortBy, setSortBy }: SortQuesBarProps) => {
  const handleSortChange = (e: React.MouseEvent) => {
    setSortBy((e.target as HTMLButtonElement).innerText.toUpperCase())
  }

  return (
    <div tw="flex justify-end my-4 text-sm sm:text-base">
      <ButtonGroup>
        <Button
          variant={sortBy === 'HOT' ? 'contained' : 'outlined'}
          onClick={handleSortChange}
        >
          Hot
        </Button>
        <Button
          variant={sortBy === 'VOTES' ? 'contained' : 'outlined'}
          onClick={handleSortChange}
        >
          Votes
        </Button>
        <Button
          variant={sortBy === 'VIEWS' ? 'contained' : 'outlined'}
          onClick={handleSortChange}
        >
          Views
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
    </div>
  )
}

export default SortQuesBar
