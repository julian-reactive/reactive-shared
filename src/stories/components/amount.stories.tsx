import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { SharedAmount } from '../../components/amount'

export default {
  title: 'Components/Amount',
  component: SharedAmount
} as ComponentMeta<typeof SharedAmount>

const Template: ComponentStory<typeof SharedAmount> = (args) => (<SharedAmount {...args} />)

export const Default = Template.bind({})
Default.args = {
  maxValue: 10,
  minValue: 1,
  initialValue: 1
}

