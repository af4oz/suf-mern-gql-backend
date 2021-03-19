import { Link } from 'react-router-dom';
import { formatDateAgo, formatDayTime } from '../utils/helperFuncs';
import tw from 'twin.macro';

const Avatar = ({ src, alt, ...otherProps }) => (
	<Link tw="w-6 h-6 mr-2 rounded-sm" {...otherProps}>
		<img
			tw="color[transparent] object-fit[cover] text-center h-full w-full"
			src={src}
			alt={alt}
		/>
	</Link>
);

const AvatarDetails = tw.div``;

const ByUser = ({
	username,
	userId,
	createdAt,
	updatedAt,
	filledVariant,
	isAnswer
}) => {
	return (
		<div tw="flex items-center float-right">
			<Avatar
				src={`https://secure.gravatar.com/avatar/${userId}?s=164&d=identicon`}
				alt={username}
				to={`/user/${username}`}
			/>
			<AvatarDetails>
				<span tw="text-xs">
					{filledVariant ? (
						`${isAnswer ? 'answered' : 'asked'} ${formatDayTime(
							createdAt
						)}`
					) : (
						`asked ${formatDateAgo(createdAt)} ago`
					)}
				</span>
				<br />
				{filledVariant &&
				createdAt !== updatedAt && (
					<span tw="text-xs">
						{`updated ${formatDayTime(updatedAt)}`}
						<br />
					</span>
				)}
				<Link to={`/user/${username}`} tw="no-underline">
					<span tw="text-xs">{username}</span>
				</Link>
			</AvatarDetails>
		</div>
	);
};

export default ByUser;
