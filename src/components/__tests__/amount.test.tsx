import React from 'react'

import { render, screen } from '@testing-library/react'
import { SharedAmount, AmountComponentProps } from '../amount'
import { act } from 'react-dom/test-utils'
import { userEvent } from '@storybook/testing-library'

jest.mock('../../utils', () => ({
    onlyText: () => 'amount'
}))

const defaultProps: AmountComponentProps = {
  onPlus: () => 1,
  onMinus: () => -1,
  maxValue: 10,
  minValue: 0,
  initialValue: 1
}

const getRendered = (props = defaultProps) => render(<SharedAmount {...props}/>)

describe('amount', () => {
  it('should match snapshot', () => {
    const { container } = getRendered()
    expect(container.firstChild).toMatchSnapshot()
  })

  describe('when onPlus is clicked', () => {
    it('should add 1 to value', async () => {
      getRendered()

      const expectedValue = defaultProps.initialValue! + 1

      const textField = screen.getByLabelText('amount') as HTMLInputElement
      const plusButton = screen.getByLabelText('add 1 unit amount')

      expect(textField.value).toEqual(defaultProps.initialValue?.toString())

      act( () => {
         userEvent.click(plusButton)
      })

      expect(textField.value).toEqual(expectedValue.toString())
    })
  })

  describe('when onMinus is clicked', () => {
    it('should remove 1 to value', async () => {
      getRendered()

      const expectedValue = defaultProps.initialValue! - 1

      const textField = screen.getByLabelText('amount') as HTMLInputElement
      const minusButton = screen.getByLabelText('remove 1 unit amount')

      expect(textField.value).toEqual(defaultProps.initialValue?.toString())

      act( () => {
         userEvent.click(minusButton)
      })

      expect(textField.value).toEqual(expectedValue.toString())
    })
  })
})