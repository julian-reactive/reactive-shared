import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import SharedDatePicker from '../../components/form/datePicker'

export default {
  title: 'Form/datePicker',
  component: SharedDatePicker
} as ComponentMeta<typeof SharedDatePicker>

const Template: ComponentStory<typeof SharedDatePicker> = (args) => (<SharedDatePicker {...args} />)

export const Default = Template.bind({})
Default.args = {
  inputProps: {
    sx: {},
    label: 'text',
    helpText: '',
    InputProps: {},
    value: '',
    type: 'datePicker',
    name: 'datePicker'
  },
  renderProps: {
    field: {
      onChange: () => { },
      value: '',
      onBlur: () => { },
      ref: () => { },
      name: ''
    },
    fieldState: { error: undefined }
  }
}