import tw from 'twin.macro';

export const Button = tw.button`outline-none bg-purple-600 text-white`;

export const SvgIcon = tw.svg`fill-current width[1em] height[1em] inline-block transition-colors flex-shrink-0 user-select[none]`;

export const Checkbox = ({
	checkedIcon,
	checked,
	icon,
	onChange,
	...otherProps
}) => {
	return (
		<button
			tw="padding[9px] bg-transparent border-none text-decoration[none] user-select[none] items-center justify-center vertical-align[middle] border-radius[50%] hover:bg-gray-200  focus:bg-gray-200 cursor-pointer outline-none transition-colors "
			onClick={onChange}
			{...otherProps}
		>
			{checked ? checkedIcon : icon}
		</button>
	);
};
