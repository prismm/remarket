import 'jsdom-global/register'
import React from 'react'
import 'babel-register'
import { expect } from 'chai'
import enzyme, { mount, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-15'
import { spy } from 'sinon'
import {Main} from '../../browser/containers/Main'
import store from '../../browser/store'

const adapter = new Adapter()
enzyme.configure({adapter})


describe('<Main />', () => {
  before(() => {
  })

  it('should render the network buttons', () => {
    const wrapper = mount(<Main />)
    expect(wrapper.find('button')).to.have.length(2)
  })

  it('should update state when clicking the network buttons', () => {
    let wrapper = mount(<Main selectNetwork={() => {}} />)
    wrapper.find('button.network-button-nyu').simulate('click')
    expect(wrapper.state().selectedNetwork).to.equal(2)
  })
})
