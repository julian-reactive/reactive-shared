import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

// Icons
import SearchIcon from '@mui/icons-material/Search'

import { Autocomplete } from '../../components/autocomplete'

export default {
  title: 'Components/Autocomplete',
  component: Autocomplete
} as ComponentMeta<typeof Autocomplete>

const Template: ComponentStory<typeof Autocomplete> = (args) => (<Autocomplete {...args} />)

export const Default = Template.bind({})
Default.args = {
  options: [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 },
    { label: 'The Dark Knight', year: 2008 },
    { label: '12 Angry Men', year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: 'Pulp Fiction', year: 1994 }],
  freeSolo: true,
  startAdornment: (<SearchIcon />),
  // getOptionLabel: (option: any) => option.label,
  renderOption: (props: any, option: any) => <li {...props}>{option.label}</li>,
  renderProps: {
    field: {
      onChange: () => {} 
    },
    fieldState: {
      error: false
    }
  },
  inputProps: {
    label: 'example',
    error: '',
    helpText: undefined,
    value: '',
    incomingValue: ''
  },
  onChange: () => {}
}
