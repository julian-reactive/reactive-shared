import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import SharedSwitch from '../../components/form/switch'

export default {
  title: 'Form/switch',
  component: SharedSwitch
} as ComponentMeta<typeof SharedSwitch>

const Template: ComponentStory<typeof SharedSwitch> = (args) => (<SharedSwitch {...args} />)

export const Default = Template.bind({})
Default.args = {
  inputProps: {
    sx: {},
    label: 'switch',
    helpText: '',
    InputProps: {},
    value: '',
    type: 'switch',
    name: 'switch'
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