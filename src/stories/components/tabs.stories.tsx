import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { AppTabs } from '../../components/tabs'

export default {
  title: 'Components/tabs',
  component: AppTabs
} as ComponentMeta<typeof AppTabs>

const Template: ComponentStory<typeof AppTabs> = (args) => (<AppTabs {...args} />)

export const Default = Template.bind({})
Default.args = {
 tabsHeader: [1, 2],
 tabsBody: ["Juan Diego", "Juan Davis"]
}

