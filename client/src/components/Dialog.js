// This code has been developed using below ref:
//https://www.w3.org/TR/wai-aria-practices-1.1/examples/dialog-modal/js/dialog.js
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { IconButton } from './CompStore'
import CloseIcon from '@material-ui/icons/Close'
import tw, { styled } from 'twin.macro' // eslint-disable-line no-unused-vars
import useModal from "../hooks/useModal";


const DialogBackDrop = styled.div(({ isMounted }) => [
  tw`fixed flex justify-center items-center inset-0 bg-black bg-opacity-50 z-index[-1] -webkit-tap-highlight-color[transparent] opacity-0 transition-opacity`,
  isMounted && tw`opacity-100 transition-opacity`
])

const DialogChildrenContainer = styled.div(({ maxWidth }) => [
  tw`relative max-height[calc(100% - 2rem)] rounded-sm overflow-y-auto flex flex-col max-w-2xl bg-white color[rgba(0, 0, 0, .87)] m-8 py-2 px-6`,
  maxWidth && `max-width: ${maxWidth};`
])


export const Dialog = (
  { focusFirst, focusAfterClosed, onClose, autoFocus, children, maxWidth, ...rest }
) => {

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true)
    return () => {
      setIsMounted(false)
    }
  }, [isMounted])

  useEffect(() => {
  })

  const { ref, modalRoot } = useModal({ autoFocus, focusFirst, focusAfterClosed, onClose });

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
            {...rest}
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
    <div tw="my-2 flex[0 0 auto]" {...rest} css={[styles && styles.root]}>
      <h3 tw="m-0 font-bold">
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
export const DialogContent = ({ children, ...rest }) => {
  return (
    <div tw="flex-auto overflow-y-auto" {...rest}>
      {children}
    </div>
  )
}
export const DialogActions = ({ children, ...rest }) => {
  return (
    <div tw="my-2 flex flex[0 0 auto] justify-end items-center" {...rest}>
      {children}
    </div>
  )
}