import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import { Signup } from './Signup';

if(Meteor.isClient) {
  describe('Signup', function () {
    it('Should throw error messages', function () {
      const error = 'this is not working';
      const wrapper = mount(<Signup createUser={() => {}}/>)

      wrapper.setState({ error });
      expect(wrapper.find('p').text()).toBe(error);
      wrapper.setState({error: ''});
      expect(wrapper.find('p').length).toBe(0);
    });

    it('should call createUser with form data', function () {
      const email = 'jordy@test.com';
      const password = 'password123';
      const spy = expect.createSpy();
      const wrapper = mount(<Signup createUser={spy} />);

      wrapper.ref('email').node.value = email;
      wrapper.ref('password').node.value = password;
      wrapper.find('form').simulate('submit');

      expect(spy.calls[0].arguments[0]).toEqual({email, password});
    });

    it('should set error with short password', function () {
      const email = 'jordy@test.com';
      const password = 'pass          ';
      const spy = expect.createSpy();
      const wrapper = mount(<Signup createUser={spy} />);

      wrapper.ref('email').node.value = email;
      wrapper.ref('password').node.value = password;
      wrapper.find('form').simulate('submit');

      expect(wrapper.state('error').length).toBeGreaterThan(8)
    });


    it('should set createUser callback errors', function () {
      const password = 'password123!'
      const reason = 'this is why it failed';
      const spy = expect.createSpy();
      const wrapper = mount(<Signup createUser={spy} />);

      wrapper.ref('password').node.value = password;
      wrapper.find('form').simulate('submit');

      spy.calls[0].arguments[1]({ reason });
      expect(wrapper.state('error')).toBe(reason);

      spy.calls[0].arguments[1]();
      expect(wrapper.state('error')).toBe('');
    });

  });
}
