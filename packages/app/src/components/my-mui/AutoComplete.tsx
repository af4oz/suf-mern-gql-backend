import tw from 'twin.macro'
import React, { SyntheticEvent, HTMLProps, useState, ReactNode } from 'react'
import { MdClear as ClearIcon } from 'react-icons/md'
import InputAdornment from './InputAdornment'
import { TextFieldProps } from './TextField'
import { ChipWithClose, ChipWithCloseProps } from './Chips'

interface AutoCompleteProps {
  disabled?: boolean
  value: any
  inputValue: any
  renderInput: (params: TextFieldProps<'input'>) => JSX.Element
  onInputChange?: (
    event: SyntheticEvent,
    newValue: any,
    reason?: string,
    details?: any
  ) => void
  onChange?: (
    event: SyntheticEvent,
    newValue: any,
    reason?: string,
    details?: any
  ) => void
  renderTags?: (
    value: any,
    getTagProps: (params: {
      index: number
    }) => Partial<ChipWithCloseProps> & HTMLProps<HTMLElement>
  ) => ReactNode
  fullWidth?: boolean
  ChipProps?: any
}
const Autocomplete = React.forwardRef<HTMLInputElement, AutoCompleteProps>(
  function Autocomplete(
    {
      disabled,
      value: valueProp,
      inputValue: inputValueProp,
      onInputChange,
      onChange,
      renderInput,
      renderTags,
      fullWidth,
      ChipProps,
      ...rest
    },
    ref
  ) {
    const hasClearIcon = !disabled && (inputValueProp || valueProp.length > 0)
    const [value, setValue] = useState(valueProp)
    const [inputValue, setInputValue] = useState(inputValueProp || '')

    const handleValue = (
      event: SyntheticEvent,
      newValue: any,
      reason: string,
      details?: any
    ) => {
      if (value === newValue) return

      if (onChange) {
        onChange(event, newValue, reason, details)
      }
      setValue(newValue)
    }
    const handleTagDelete = (index: number) => (event: SyntheticEvent) => {
      const newValue = value.slice()
      newValue.splice(index, 1)
      handleValue(event, newValue, 'removeOption', {
        option: value[index],
      })
    }
    const handleClear = (e: React.SyntheticEvent) => {
      setInputValue('')

      if (onInputChange) {
        onInputChange(e, '', 'clear')
      }

      handleValue(e, [], 'clear')
    }
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value

      if (inputValue !== newValue) {
        setInputValue(newValue)

        if (onInputChange) {
          onInputChange(event, newValue, 'input')
        }
      }
    }
    const resetInputValue = React.useCallback(
      (event: any, newValue: any) => {
        let newInputValue
        if (!newValue) {
          newInputValue = ''
        } else {
          newInputValue = newValue
        }

        setInputValue(newInputValue)

        if (onInputChange) onInputChange(event, newValue, 'reset')
      },
      [setInputValue, onInputChange]
    )

    const selectNewValue = (
      event: SyntheticEvent,
      option: any,
      reason = 'selectOption'
    ) => {
      let newValue = Array.isArray(value) ? value.slice() : []

      const itemIndex = value.findIndex((val: any) => val === option)

      if (itemIndex === -1) {
        newValue.push(option)
        handleValue(event, newValue, reason, { option })
      }
      resetInputValue(event, '')
    }
    const handleKeyDown = (event: React.KeyboardEvent) => {
      switch (event.key) {
        case 'Enter':
          // Avoid early form validation
          event.preventDefault()

          if (disabled) return

          if (!inputValue) return

          selectNewValue(event, inputValue, 'selectOption')
          break
        default:
          return
      }
    }

    const getTagProps = ({ index }: { index: number }) => ({
      key: index,
      'data-tag-index': index,
      tabIndex: -1,
      onDelete: handleTagDelete(index),
    })
    const getClearProps = () => ({
      tabIndex: -1,
      onClick: handleClear,
    })

    let startAdornment
    if (value.length > 0) {
      if (renderTags) {
        startAdornment = renderTags(value, getTagProps)
      } else {
        startAdornment = value.map((option: string, index: number) => (
          <ChipWithClose
            label={option}
            {...getTagProps({ index })}
            {...ChipProps}
          />
        ))
      }
    }
    return (
      <>
        <div onKeyDown={handleKeyDown}>
          {renderInput({
            tag: 'input',
            disabled,
            fullWidth: true,
            ref,
            value: inputValue,
            onChange: handleInputChange,
            // tw: "flex-grow[1]",
            InputProps: {
              startAdornment,
              endAdornment: hasClearIcon ? (
                <InputAdornment
                  {...getClearProps()}
                  tw="cursor-pointer font-size[1.5em]"
                >
                  <ClearIcon />
                </InputAdornment>
              ) : null,
            },
            styles: {
              input: tw`flex-grow-default w-0 min-w-[8em] `,
              inputRoot: tw`flex-wrap`,
            },
            ...rest,
          })}
        </div>
      </>
    )
  }
)

export default Autocomplete
