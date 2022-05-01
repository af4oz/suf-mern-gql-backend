import UpvoteIcon from '../svg/upvote.svg';
import DownvoteIcon from '../svg/downvote.svg';

import { Checkbox, SvgIcon } from './CompStore';
import 'twin.macro'; // eslint-disable-line no-unused-vars
import { VoteType } from '../generated/graphql';

interface UpVoteButtonProps {
  checked: boolean;
  handleUpvote: (...args: any) => void;
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
      onClick={() => handleUpvote(VoteType.Upvote)}
    />
  );
};

interface DownVoteButtonProps {
  checked: boolean;
  handleDownvote: (...args: any) => void;
}

export const DownvoteButton = ({
  checked,
  handleDownvote,
}: DownVoteButtonProps) => {
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
      onClick={() => handleDownvote(VoteType.Downvote)}
    />
  );
};
