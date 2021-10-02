import { formatDateAgo, formatDayTime } from '../utils/helperFuncs'
import tw from 'twin.macro'; //eslint-disable-line no-unused-vars

import {Avatar,Link} from './CompStore';

const AvatarDetails = tw.div`text-xs`

const ByUser = ({
  username,
  userId,
  createdAt,
  updatedAt,
  filledVariant,
  isAnswer,
}) => {
  return (
    <div tw="flex items-center float-right">
      <Avatar
        src={`https://secure.gravatar.com/avatar/${userId}?s=164&d=identicon`}
        alt={username}
        to={`/user/${username}`}
        tw="w-8 h-8"
      />
      <AvatarDetails>
        <span >
          {filledVariant
            ? `${isAnswer ? 'answered' : 'asked'} ${formatDayTime(createdAt)}`
            : `asked ${formatDateAgo(createdAt)} ago`}
        </span>
        <br />
        {filledVariant && createdAt !== updatedAt && (
          <span>
            {`updated ${formatDayTime(updatedAt)}`}
            <br />
          </span>
        )}
        <Link to={`/user/${username}`}>
          <span>{username}</span>
        </Link>
      </AvatarDetails>
    </div>
  )
}

export default ByUser
