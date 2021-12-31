import React, {useState, useRef, useEffect} from 'react'

import Text from '../../atoms/Text'

interface SelectOption {
  label: string
  value: string
}

interface RenderOptionProps {
  isSelected: boolean
  option: SelectOption
  getOptionRecommendedProps: (overrideProps?: Object) => Object
}

interface SelectProps {
  onOptionSelected?: (option: SelectOption, optionIndex: number) => void
  options?: SelectOption[]
  label?: string,
  renderOption?: (props: RenderOptionProps) => React.ReactNode
}

const Select: React.FunctionComponent<SelectProps> = ({ options = [], label = 'Please select an option ...', onOptionSelected: handler, renderOption }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [selectedIndex, setSelectedIndex] = useState<null|number>(null)
  const labelRef = useRef<HTMLButtonElement>(null)
  const [overlayTop, setOverlayTop] = useState<number>(0)

  const onOptionSelected = (option: SelectOption, optionIndex: number) => {
    if (handler) {
      handler(option, optionIndex)
    }

    setSelectedIndex(optionIndex)
    setIsOpen(false)
  }

  const onLabelClick = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    setOverlayTop((labelRef.current?.offsetHeight || 0) + 10)
  }, [labelRef.current?.offsetHeight])

  let selectedOption = null
  if (selectedIndex !== null) selectedOption = options[selectedIndex]

  return (
    <div className='dse-select'>
      <button ref={labelRef} className='dse-select__label' onClick={() => onLabelClick()}>
        <Text>{selectedOption === null ? label : selectedOption.label}</Text>
        <div className={`h-5 w-5 dse-select__caret ${isOpen ? 'dse-select__caret--open' : 'dse-select__caret--closed'}`}>
          <svg width='1rem' height='1rem' xmlns="http://www.w3.org/2000/svg" 
          className='h-5 w-5' 
          viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          </div>
      </button>
      {isOpen ? (
        <ul style={{top: overlayTop}} className='dse-select__overlay'>
          {options.map((option, optionIndex) => {
            const isSelected = selectedIndex === optionIndex

            const renderOptionProps = {
              option,
              isSelected,
              getOptionRecommendedProps: (overrideProps = {}) => {return {
                className: `
                  dse-select__option 
                  ${isSelected ? 'dse-select__option--selected' : ''}
                `,
                key: option.value,
                onClick: () => onOptionSelected(option, optionIndex),
                ...overrideProps
              }}
            }

            if (renderOption) {
              return renderOption(renderOptionProps)
            }

            return <li 
                      className={`
                        dse-select__option 
                        ${isSelected ? 'dse-select__option--selected' : ''}
                      `} 
                      onClick={() => onOptionSelected(option, optionIndex)} 
                      key={option.value}>
                        <Text>
                          {option.label}
                        </Text>

                        {isSelected ? (
                          <svg width='1rem' height='1rem' xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
</svg>
                        ) : null}
                    </li>
          })}
        </ul>
      ) : null}
    </div>
  )
}

export default Select