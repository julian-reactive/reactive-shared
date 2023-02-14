import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { ItemName } from '../../components/itemName'

export default {
  title: 'Components/ItemName',
  component: ItemName
} as ComponentMeta<typeof ItemName>

const Template: ComponentStory<typeof ItemName> = (args) => (<ItemName {...args} />)

export const Default = Template.bind({})
Default.args = {
 name: 'Rollos',
 image: ''
}

