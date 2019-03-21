import {configure, shallow, mount} from 'enzyme';
import React, {Component} from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Toast from './Toast';
import App from '../App'

// import showNotification from './Toast';

configure({adapter: new Adapter()});


describe('Toast initial state', ()=>{
    it('On page mount, inital state queue array is empty', ()=>{
        const wrapper = shallow(<Toast/>);
        const instance = wrapper.instance();
        expect(instance.state.queue.length).toEqual(0);
    })
})

describe('App', ()=>{
    it('app', ()=>{
        const component = shallow((<App />));
        button.find('button').simulate('click');
        const instance = wrapper.instance();
        expect(instance.state.queue.length).toEqual(1)


    })
})





