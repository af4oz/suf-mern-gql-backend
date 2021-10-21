import { ReactComponent as UpvoteIcon } from '../svg/upvote.svg'
import { ReactComponent as DownvoteIcon } from '../svg/downvote.svg'

import { Checkbox, SvgIcon } from './CompStore'
import 'twin.macro'; // eslint-disable-line no-unused-vars

interface UpVoteButtonProps {
  checked: boolean;
  handleUpvote: () => void;
}
export const UpvoteButton = ({ checked, handleUpvote }: UpVoteButtonProps) => {

  return (
    <Checkbox
      checked={checked}
      icon={
        <SvgIcon tw="text-gray-400 font-size[32px]">
          <UpvoteIcon />
        </SvgIcon>
      }
      checkedIcon={
        <SvgIcon tw="text-green-600 font-size[32px]">
          <UpvoteIcon />
        </SvgIcon>
      }
      onChange={handleUpvote}
    />
  )
}

interface DownVoteButtonProps {
  checked: boolean;
  handleDownvote: () => void;
}

export const DownvoteButton = ({ checked, handleDownvote }: DownVoteButtonProps) => {

  return (
    <Checkbox
      checked={checked}
      icon={
        <SvgIcon tw="text-gray-400 font-size[32px]">
          <DownvoteIcon />
        </SvgIcon>
      }
      checkedIcon={
        <SvgIcon tw="text-green-600 font-size[32px]">
          <DownvoteIcon />
        </SvgIcon>
      }
      onChange={handleDownvote}
    />
  )
}
