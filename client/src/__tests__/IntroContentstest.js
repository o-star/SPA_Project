import React from 'react'
import { fireEvent, getByText, render } from '@testing-library/react'
import { toBeInTheDocument } from '@testing-library/jest-dom'
import IntroContents from 'components/contents/introduction/IntroContents'

describe('Component : SelectCluster', () => {

    it('render correctly', () => {
        const component = render(<IntroContents />)
    })  //올바르게 렌더링 되는가

    it('people button action status', () => {
        const { getByText } = render(<IntroContents />)
        const peoplebtn = getByText('People')
        fireEvent.click(peoplebtn);

        expect(getByText('Principal Invesigator')).toBeInTheDocument()
    })  // people introduction button 동작 유무 테스트
})