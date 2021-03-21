import { ReactComponent as AcceptedIcon } from '../svg/accepted.svg'

import { useQuesPageStyles } from '../styles/muiStyles'
import { Checkbox, SvgIcon } from './CompStore'
import tw from 'twin.macro'

const AcceptAnswerButton = ({ checked, handleAcceptAns }) => {
  const classes = useQuesPageStyles()

  return (
    <Checkbox
      checked={checked}
      icon={
        <SvgIcon tw="text-gray-400 font-size[32px]">
          <AcceptedIcon />
        </SvgIcon>
      }
      checkedIcon={
        <SvgIcon tw="text-green-600 font-size[32px]">
          <AcceptedIcon />
        </SvgIcon>
      }
      onChange={handleAcceptAns}
    />
  )
}

export default AcceptAnswerButton
