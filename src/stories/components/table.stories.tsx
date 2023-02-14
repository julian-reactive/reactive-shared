import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { AppTable } from '../../components/table'
import { ClassNames } from '@emotion/react'

export default {
  title: 'Components/table',
  component: AppTable
} as ComponentMeta<typeof AppTable>

const Template: ComponentStory<typeof AppTable> = (args) => (<AppTable {...args} />)

export const Default = Template.bind({})
Default.args = {
  headItems: ['npmbre', 'apellido'],
  bodyItems: [["Juan", "Martínez"],
  ["Pedro", "García"],
  ["María", "Rodríguez"]],
  className: 'Tabla de nombres'
}
