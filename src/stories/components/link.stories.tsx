import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { withRouter } from 'storybook-addon-react-router-v6'

import { Link } from '../../components/link'

export default {
  title: 'Components/Link',
  decorators: [withRouter],
  component: Link
} as ComponentMeta<typeof Link>

const Template: ComponentStory<typeof Link> = (args) => (<Link {...args}>Link</Link>)

export const Default = Template.bind({})
Default.args = {
 to: '/user/register'
}
