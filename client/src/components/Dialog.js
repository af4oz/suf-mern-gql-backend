// This code has been developed using below ref:
//https://www.w3.org/TR/wai-aria-practices-1.1/examples/dialog-modal/js/dialog.js
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import useDialog from "../hooks/useDialog";
import { IconButton } from './CompStore'
import CloseIcon from '@material-ui/icons/Close'
import tw, { styled } from 'twin.macro' // eslint-disable-line no-unused-vars


const DialogBackDrop = styled.div(({ isMounted }) => [
  tw`fixed flex justify-center items-center inset-0 bg-black bg-opacity-50 z-index[-1] -webkit-tap-highlight-color[transparent] opacity-0 transition-opacity`,
  isMounted && tw`opacity-100 transition-opacity`
])

const DialogChildrenContainer = styled.div(({ maxWidth }) => [
  tw`relative max-height[calc(100% - 2rem)] rounded-sm overflow-y-auto flex flex-col max-w-2xl bg-white color[rgba(0, 0, 0, .87)] m-8`,
  maxWidth && `max-width: ${maxWidth};`
])


const Dialog = (
  { focusFirst, focusAfterClosed, onClose, children, maxWidth }
) => {

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true)
    return () => {
      setIsMounted(false)
    }
  }, [isMounted])

  useEffect(() => {
    function handleOutsideClick(e) {
      if (!ref.current) {
        return
      }
      if (!ref.current.contains(e.target)) {
        onClose();
      }
    }

    document.body.addEventListener('click', handleOutsideClick, { capture: true });

    return () => {
      document.body.removeEventListener('click', handleOutsideClick, { capture: true });
    }
  })

  const { ref, modalRoot } = useDialog({ focusFirst, focusAfterClosed });

  const modal = (
    <div role="presentation" tw="fixed z-index[1300] inset-0">
      <DialogBackDrop isMounted={isMounted}>
        <div tabIndex={0}></div>
        <div
          role="presentation"
          tabIndex={-1}
          tw="h-full outline-none flex justify-center items-center"
        >
          <DialogChildrenContainer
            ref={ref}
            role="dialog"
            maxWidth={maxWidth}
          >
            {children}
          </DialogChildrenContainer>
        </div>
        <div tabIndex={0}></div>
      </DialogBackDrop>
    </div>
  );

  return ReactDOM.createPortal(modal, modalRoot);
};
export const DialogTitle = ({ onClose, children, styles, ...rest }) => {
  return (
    <div tw="px-6 py-4 m-0 flex[0 0 auto]" {...rest} css={[styles && styles.root]}>
      <h3 tw="m-0">
        {children}
      </h3>
      {
        onClose ? (
          <IconButton
            aria-label="close"
            tw="absolute right[8px] top[8px]"
            css={[styles && styles.closeBtn]}
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        ) : null
      }
    </div>
  )
}
export const DialogContent = (props) => {
  return (
    <div tw="flex-auto py-2 px-6 overflow-y-auto" {...props}>
      {props.children}
    </div>
  )
}
export default Dialog;