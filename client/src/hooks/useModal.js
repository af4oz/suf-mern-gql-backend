import { useEffect, useRef } from "react";


const getDOMRef = (value) => {
  if (typeof value == "string") {
    return document.querySelector(value);
  } else if (typeof value == "object") {
    if (value.current) return value.current;
    return value;
  } else {
    return null;
  }
};

/**
 * 
 * @param {Object} props  
 * @param {string | HTMLElement} props.focusFirst ref/html element to focus first when dialog opens
 * @param {string | HTMLElement} props.focusAfterClosed ref/html element to focus when dialog closes
 * @param {boolean} props.autoFocus if true,it tries to focus first descendants of modal children
 * @param {() =>  void} props.onClose 
 * @returns 
 */
const useModal = ({ focusFirst, onClose, focusAfterClosed, autoFocus }) => {
  let modalRoot = document.getElementById("modal-root");
  if (!modalRoot) {
    modalRoot = document.createElement("div");
    modalRoot.setAttribute("id", "modal-root");
    document.body.appendChild(modalRoot);
  }
  const ref = useRef(null);

  let _focusFirst = focusFirst ? getDOMRef(focusFirst) : null;
  let _focusAfterClosed = focusAfterClosed ? getDOMRef(focusAfterClosed) : null;



  useEffect(() => {
    function handleOutsideClick(e) {
      if (!ref.current) {
        return
      }
      if (!ref.current.contains(e.target)) {
        onClose();
        if (focusAfterClosed) focusAfterClosed.focus();
      }
    }

    function handleKeyPress(e) {
      if (e.key === 'Escape') {
        onClose()
        if (focusAfterClosed) focusAfterClosed.focus();
      }
    }
    document.body.addEventListener('keyup', handleKeyPress)
    document.body.addEventListener('click', handleOutsideClick, { capture: true });

    return () => {
      document.body.removeEventListener('click', handleOutsideClick, { capture: true });
      document.body.removeEventListener('keyup', handleKeyPress)
    }
  }, [onClose, focusAfterClosed])

  useEffect(() => {
    const isFocusable = (element) => {
      return typeof element.focus === "function";
    };

    // `focus` event can be triggered by keyboard(user input),javascript
    // we want to run some operations only when focus is triggered by keyboard
    let ignoreUntilFocusChanges = false;
    const attempFocus = (element) => {
      if (!isFocusable(element)) {
        return false;
      }
      ignoreUntilFocusChanges = true;

      try {
        element.focus();
      } catch (e) {
        console.error(e);
      }
      ignoreUntilFocusChanges = false;
      return document.activeElement === element;
    };
    const focusFirstDescendant = (element) => {
      for (var i = 0; i < element.childNodes.length; i++) {
        var child = element.childNodes[i];

        if (attempFocus(child) || focusFirstDescendant(child)) {
          return true;
        }
      }
      return false;
    };
    const focusLastDescendant = (element) => {
      for (var i = element.childNodes.length - 1; i >= 0; i--) {
        var child = element.childNodes[i];
        if (attempFocus(child) || focusLastDescendant(child)) {
          return true;
        }
      }
      return false;
    };

    if (_focusFirst) _focusFirst.focus();
    else {
      if (autoFocus && ref.current) {
        focusFirstDescendant(ref.current);
      }
    }

    let lastFocus;
    const trapFocus = (e) => {

      if (ignoreUntilFocusChanges) {
        return;
      }

      if (!ref.current) {
        console.error("dialog not found");
        return;
      }
      if (ref.current.contains(e.target)) {
        lastFocus = e.target;
      } else {

        focusFirstDescendant(ref.current);

        // user clicks Shift + Tab when activeElement is first focusable descendant inside dialog,in this case `focusFirstDescendant` won't change lastFocus
        // then focus last descendant, it goes round and round
        if (lastFocus === document.activeElement) {
          focusLastDescendant(ref.current);
        }

        lastFocus = document.activeElement;
      }
    };

    document.body.classList.add("has-dialog");
    document.addEventListener("focus", trapFocus, true);

    return () => {
      document.body.classList.remove("has-dialog");
      document.removeEventListener("focus", trapFocus, true);

      if (_focusAfterClosed) {
        _focusAfterClosed.focus()
      }
    };
  }, [_focusFirst, _focusAfterClosed, autoFocus]);

  return { ref, modalRoot };
};

export default useModal;