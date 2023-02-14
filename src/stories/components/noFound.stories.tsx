import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { NotFound } from '../../components/notFound'

export default {
  title: 'Components/NotFound',
  component: NotFound
} as ComponentMeta<typeof NotFound>

const Template: ComponentStory<typeof NotFound> = (args) => (<NotFound {...args} />)

export const Default = Template.bind({})
Default.args = {}

