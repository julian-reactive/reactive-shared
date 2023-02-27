import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import SharedSelect from '../../components/form/select'
import { Label } from '@mui/icons-material'

export default {
  title: 'Form/select',
  component: SharedSelect
} as ComponentMeta<typeof SharedSelect>

const Template: ComponentStory<typeof SharedSelect> = (args) => (<SharedSelect {...args} />)

export const Default = Template.bind({})
Default.args = {
  inputProps: {
    sx: {},
    label: 'text',
    helpText: '',
    InputProps: {},
    value: '',
    type: 'select',
    name: 'select',
    items: [ ]
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