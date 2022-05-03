import tw, { styled, css } from 'twin.macro'
import { ReactNode, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import useModal from '~~/hooks/useModal'

const MenuContainer = styled.div(({ open }: { open: boolean }) => [
  tw`fixed z-index[1300] inset-0 invisible`,
  open && tw`visible`,
])
const MenuBackDrop = styled.div(() => [
  tw`fixed inset-0 z-index[-1] bg-transparent`,
  css`
    -webkit-tap-highlight-color: transparent;
  `,
])

const MenuChildrenContainer = styled.div(({ open }: { open: boolean }) => [
  tw`absolute rounded-sm overflow-x-hidden overflow-y-auto outline-none shadow-default bg-white text-gray-900 opacity-0 transition-default invisible transform scale-x-75 scale-y-50 border-[1px] border-gray-300`,
  open && tw`visible transform-none opacity-100`,
])

interface MenuProps {
  open: boolean
  anchorEl: HTMLElement | undefined
  anchorOrigin: {
    vertical: 'top' | 'bottom'
    horizontal: 'left' | 'right'
  }
  transformOrigin: {
    vertical: 'top' | 'center' | 'bottom'
    horizontal: 'left' | 'center' | 'right'
  }
  onClose: () => void
  children?: ReactNode
}
const Menu = ({
  open,
  anchorEl,
  anchorOrigin,
  transformOrigin,
  onClose,
  children,
  ...rest
}: MenuProps) => {
  const [anchorPos, setAnchorPos] = useState<DOMRect | null>(null)

  useEffect(() => {
    if (anchorEl) {
      setAnchorPos(anchorEl.getBoundingClientRect())
    }
  }, [anchorEl])

  const { ref, modalRoot } = useModal<HTMLDivElement>({
    onClose,
    focusAfterClosed: anchorEl,
    overlayModal: false,
  })

  const getAnchorOriginPos = () => {
    let pos: any = {}
    if (anchorPos) {
      pos.top =
        anchorOrigin.vertical === 'top'
          ? `calc(${anchorPos.top}px + 10px)`
          : `calc(${anchorPos.bottom}px + 10px)`
      if (anchorOrigin.horizontal === 'left') {
        pos.left = `calc(${anchorPos.left}px + 5px)`
      } else {
        pos.right = `calc(100vw - ${anchorPos.right - 10}px)`
      }
      return pos
    }
  }
  const menu = (
    <MenuContainer role="presentation" open={open}>
      {open && <MenuBackDrop></MenuBackDrop>}
      <div tabIndex={0}></div>
      <MenuChildrenContainer
        ref={ref}
        tabIndex={-1}
        {...rest}
        css={
          anchorPos && {
            ...getAnchorOriginPos(),
            transformOrigin: `${transformOrigin.horizontal || '0px'} ${
              transformOrigin.vertical || '0px'
            }`,
          }
        }
        open={open}
      >
        {children}
      </MenuChildrenContainer>
      <div tabIndex={0}></div>
    </MenuContainer>
  )
  return ReactDOM.createPortal(menu, modalRoot)
}

export default Menu
