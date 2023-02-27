import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import SharedCheckbox from '../../components/form/checkbox'

export default {
  title: 'Form/checkBox',
  component: SharedCheckbox
} as ComponentMeta<typeof SharedCheckbox>

const Template: ComponentStory<typeof SharedCheckbox> = (args) => (<SharedCheckbox {...args} />)

export const Default = Template.bind({})
Default.args = {
  inputProps: {
    sx: {},
    label: 'text',
    helpText: '',
    InputProps: {},
    value: '',
    type: 'checkbox',
    name: 'checkbox'
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