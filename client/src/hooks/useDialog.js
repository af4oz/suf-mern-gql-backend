import { useEffect, useRef } from "react";


const getDOMRef = (value) => {
  if (typeof value == "string") {
    return document.querySelector(value);
  } else if (typeof value == "object") {
    return value.current;
  } else {
    return null;
  }
};

/**
 * 
 * @param {Object} props  
 * @param {string | HTMLElement} props.focusFirst ref/html element to focus first when dialog opens
 * @param {string | HTMLElement} props.focusAfterClosed ref/html element to focus when dialog closes
 * @returns 
 */
const useDialog = (props) => {
  let modalRoot = document.getElementById("modal-root");
  if (!modalRoot) {
    modalRoot = document.createElement("div");
    modalRoot.setAttribute("id", "modal-root");
    document.body.appendChild(modalRoot);
  }
  const ref = useRef(null);

  let focusFirst = props?.focusFirst ? getDOMRef(props.focusFirst) : null;
  let focusAfterClosed = props?.focusAfterClosed ? getDOMRef(props.focusAfterClosed) : null;

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

      // user clicks Shift + Tab when activeElement is first focusable descendant inside dialog
      // then focus last descendant
      if (lastFocus === document.activeElement) {
        focusLastDescendant(ref.current);
      }

      lastFocus = document.activeElement;
    }
  };

  useEffect(() => {
    document.body.classList.add("has-dialog");
    document.addEventListener("focus", trapFocus, true);

    if (focusFirst) focusFirst.focus();
    else {
      if (ref.current) {
        focusFirstDescendant(ref.current);
      }
    }

    return () => {
      document.body.classList.remove("has-dialog");
      document.removeEventListener("focus", trapFocus, true);

      if (focusAfterClosed) {
        focusAfterClosed.focus()
      }
    };
    // eslint-disable-next-line
  }, [focusFirst]);

  return { ref, modalRoot };
};

export default useDialog;