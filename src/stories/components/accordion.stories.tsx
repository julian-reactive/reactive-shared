import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { SharedAccordion } from '../../components/accordion'

export default {
  title: 'Components/Accordion',
  component: SharedAccordion
} as ComponentMeta<typeof SharedAccordion>

const Template: ComponentStory<typeof SharedAccordion> = (args) => (<SharedAccordion {...args} />)

export const Default = Template.bind({})
Default.args = {
 items: [
    {
        name: 'test',
        children: (<span>test</span>)
    }
 ]
}

