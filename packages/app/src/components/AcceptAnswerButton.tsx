import AcceptedIcon from '../svg/accepted.svg'

import { Checkbox, SvgIcon } from './CompStore'
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
