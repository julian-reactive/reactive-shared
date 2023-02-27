import React from 'react'

import { render } from '@testing-library/react'
import { AppTabs, AppTabsProps } from '../tabs'

const defaultProps: AppTabsProps = {
  tabsHeader: [1, 2],
  tabsBody: ["Juan Diego", "Juan Davis"]
}

const getRendered = (props = defaultProps) => render(<AppTabs {...props} />)

describe('tabs', () => {
  it('should match snapshot', () => {
    const { container } = getRendered()
    expect(container.firstChild).toMatchSnapshot()
  })
})
