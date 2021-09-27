import { ReactComponent as AcceptedIcon } from '../svg/accepted.svg'

import { Checkbox, SvgIcon } from './CompStore'
import tw from 'twin.macro'; // eslint-disable-line no-unused-vars

const AcceptAnswerButton = ({ checked, handleAcceptAns }) => {

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
      onChange={handleAcceptAns}
    />
  )
}

export default AcceptAnswerButton
