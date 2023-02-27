// import React from 'react'
// import { ComponentStory, ComponentMeta } from '@storybook/react'
// import { withReactContext } from 'storybook-react-context'

// import  Button  from '@mui/material/Button'

// import { useAppContext, AppProvider } from 'hoc'

// import { SnackBar } from '../../components/snackBar'

// export default {
//   title: 'Components/snackBar',
//   component: SnackBar,
//   decorators: [
//     withReactContext({
//       Context: AppProvider,
//       initialState: {  },
//     })
//   ],
//   argTypes: {
//     backgroundColor: { control: 'color' },
//   },
// } as ComponentMeta<typeof SnackBar>

// const ShowSnackbarComponent = (args) => {
//     console.log('args', args)
//     const {setSnackBarMessage} = useAppContext()

//     return (
//         <Button >Show SnackBar</Button>
//     )
// }

// const Template: ComponentStory<typeof SnackBar> = (args) => (<ShowSnackbarComponent {...args} />)

// export const Default = Template.bind({})
// Default.args = {}
