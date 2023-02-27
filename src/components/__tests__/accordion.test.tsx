import React from 'react'

import {render} from '@testing-library/react'
import { SharedAccordion, SharedAccordionProps } from '../accordion'

const defaultProps: SharedAccordionProps = {
    items: [
{
    name: 'test',
    children: <span>test</span>
}
    ]
    
}

const getRendered = (props = defaultProps) => render(<SharedAccordion {...props} />)

describe('accordion', () => {
    it('should match snapshot', () => {
        const { container } = getRendered()
        expect(container.firstChild).toMatchSnapshot()
    })
})