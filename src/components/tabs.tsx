import React, { ReactElement, useCallback, useMemo, useState } from 'react'
import map from 'lodash/map'

// Material Components
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

const a11yProps = (index: string) => ({
  id: `simple-tab-${index}`,
  'aria-controls': `simple-tabpanel-${index}`
})

// Interfaces
interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

interface AppTabsProps {
  value?: number
  tabsHeader: Array<number | string>
  tabsBody: ReactElement[] | string[]
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index, ...other }) => {
  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

const AppTabsContainer: React.FC<AppTabsProps> = ({ value, tabsHeader, tabsBody }) => {
  const [tabValue, setTabValue] = useState(value || 0)

  const handleChange = useCallback((event: React.SyntheticEvent, newValue: string) => setTabValue(parseInt(newValue, 10)), [])

  const renderTabs = useMemo(() => {
    return map(tabsHeader, item => (
      <Tab
        key={`tab-${item}`}
        {...a11yProps(item.toString())}
        label={item}
      />
    ))
  }, [tabsHeader])

  const renderTabPanels = useMemo(() => {
    return map(tabsBody, (item, index) => (
      <TabPanel key={index} index={parseInt(index, 10)} value={tabValue}>
        {item}
      </TabPanel>
    ))
  }, [tabsBody, tabValue])

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={tabValue}
          onChange={handleChange}
          variant='scrollable'
          scrollButtons='auto'

        >
          {renderTabs}
        </Tabs>
      </Box>
      {renderTabPanels}
    </>
  )
}

export const AppTabs = React.memo(AppTabsContainer)
