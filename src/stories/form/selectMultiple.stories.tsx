import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import SharedSelectMultiple from '../../components/form/selectMultiple'

export default {
  title: 'Form/selectMultiple',
  component: SharedSelectMultiple
} as ComponentMeta<typeof SharedSelectMultiple>

const Template: ComponentStory<typeof SharedSelectMultiple> = (args) => (<SharedSelectMultiple {...args} />)

export const Default = Template.bind({})
Default.args = {
  inputProps: {
    sx: {},
    label: 'selectMultiplex',
    helpText: '',
    InputProps: {},
    value: '',
    type: 'selectMultiple',
    name: 'selectMultiple',
    items: []
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