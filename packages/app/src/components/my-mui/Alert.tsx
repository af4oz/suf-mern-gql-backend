import tw from 'twin.macro'
import React, { ComponentProps, ReactNode } from 'react'
import { AiOutlineWarning as WarningIcon } from 'react-icons/ai'
import { IoMdCheckmarkCircleOutline as SuccessIcon } from 'react-icons/io'
import {
  MdClear as ClearIcon,
  MdErrorOutline as ErrorIcon,
} from 'react-icons/md'
import { RiInformationLine as InfoIcon } from 'react-icons/ri'
import IconButton from './IconButton'

interface AlertProps extends ComponentProps<'div'> {
  severity?: 'error' | 'info' | 'warning' | 'success'
  onClose?: React.MouseEventHandler
  title?: string
  children?: ReactNode
  styles?: {
    alertRoot: any
    alertTitle: any
    alertBody: any
    alertStartIcon: any
    alertEndIcon: any
  }
}
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  const { severity, onClose, title, children, styles, ...rest } = props
  let icon, bgStyles
  if (severity === 'error') {
    icon = <ErrorIcon />
    bgStyles = tw`bg-red-600`
  } else if (severity === 'info') {
    icon = <InfoIcon />
    bgStyles = tw`bg-blue-600`
  } else if (severity === 'warning') {
    icon = <WarningIcon />
    bgStyles = tw`bg-orange-600`
  } else {
    icon = <SuccessIcon />
    bgStyles = tw`bg-green-600`
  }
  return (
    <div
      css={[
        tw`text-xs sm:text-sm flex items-center justify-between min-width[240px] p-1 md:px-2 md:py-1 text-white bg-gray-900 bg-opacity-75 shadow-sm rounded-md  font-bold leading-5 tracking-wide `,
        bgStyles && bgStyles,
        styles && styles.alertRoot,
      ]}
    >
      <div>
        {title ? (
          <div css={[tw`font-bold`, styles && styles.alertTitle]}>{title}</div>
        ) : null}
        <div
          css={[
            tw`flex items-center font[inherit]`,
            styles && styles.alertBody,
          ]}
          ref={ref}
          {...rest}
        >
          <div
            css={[
              tw`flex mr-2 py-1 color[inherit] font-size[1.2em]`,
              styles && styles.alertStartIcon,
            ]}
          >
            {icon}
          </div>
          <div css={[tw`py-1`]}>{children}</div>
        </div>
      </div>
      {onClose ? (
        <IconButton
          tag="button"
          css={[
            tw`font-size[1.2em] color[inherit]`,
            styles && styles.alertEndIcon,
          ]}
          onClick={onClose}
        >
          <ClearIcon />
        </IconButton>
      ) : null}
    </div>
  )
})

export default Alert
