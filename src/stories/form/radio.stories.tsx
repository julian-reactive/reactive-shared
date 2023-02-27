import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import SharedRadio from '../../components/form/radio'

export default {
  title: 'Form/radio',
  component: SharedRadio
} as ComponentMeta<typeof SharedRadio>

const Template: ComponentStory<typeof SharedRadio> = (args) => (<SharedRadio {...args} />)

export const Default = Template.bind({})
Default.args = {
  inputProps: {
    sx: {},
    label: 'text',
    helpText: '',
    InputProps: {},
    value: '',
    type: 'radio',
    name: 'radio'
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