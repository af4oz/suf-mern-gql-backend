import tw ,{styled} from 'twin.macro' // eslint-disable-line no-unused-vars

const Button = styled.button(({variant}) => [
  tw` inline-block cursor-pointer no-underline rounded-none transition-colors border-0 rounded-l-none px-3 py-2 outline-color[salmon]`,
  variant === "contained" ? tw`bg-purple-800 hover:bg-black text-white`: tw`bg-white hover:bg-gray-lightest text-purple-900 `
])

const ButtonGroup = styled.div`
  border-width: 1px;
  ${tw`rounded-sm border-solid border-gray-600`}
  > button + button {
    border-left-width: 1px; 
    ${tw` border-l-gray-600`}
  }
`
const SortQuesBar = ({ isMobile, sortBy, setSortBy }) => {

  const handleSortChange = e => {
    setSortBy(e.target.innerText.toUpperCase())
  }

  return (
    <div tw="flex justify-end my-4">
      <ButtonGroup
        color="secondary"
        disableElevation
        size={isMobile ? 'small' : 'medium'}
        fullWidth={isMobile}
      >
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
