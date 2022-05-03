import tw from 'twin.macro'
import { ComponentProps } from 'react'
import { Link } from 'react-router-dom'

interface AvatarProps extends ComponentProps<typeof Link> {
  to: string
  src: string
  alt: string
  styles?: {
    avatarRoot?: any
    img?: any
  }
}
const Avatar = (props: AvatarProps) => {
  const { src, alt, to, styles, ...rest } = props
  return (
    <Link
      to={to}
      css={[tw`w-10 h-10 rounded-sm mr-2`, styles && styles.avatarRoot]}
      {...rest}
    >
      <img
        src={src}
        alt={alt}
        css={[
          tw`text-transparent w-full h-full object-cover text-center `,
          styles && styles.img,
        ]}
      ></img>
    </Link>
  )
}

export default Avatar
