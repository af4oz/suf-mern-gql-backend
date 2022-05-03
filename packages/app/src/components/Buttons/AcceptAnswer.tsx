import AcceptedIcon from '~~/svg/accepted.svg?component'

import { SvgIcon } from '../my-mui/Misc'
import Checkbox from '../my-mui/Checkbox'
import 'twin.macro'

interface Props {
  checked: boolean
  handleAcceptAns: () => void
}

const AcceptAnswerButton = ({ checked, handleAcceptAns }: Props) => {
  return (
    <Checkbox
      checked={checked}
      icon={
        <SvgIcon tw="text-gray-400 ">
          <AcceptedIcon />
        </SvgIcon>
      }
      checkedIcon={
        <SvgIcon tw="text-green-600 ">
          <AcceptedIcon />
        </SvgIcon>
      }
      onClick={handleAcceptAns}
    />
  )
}

export default AcceptAnswerButton
