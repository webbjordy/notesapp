import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import NoteListItem from './NoteListItem';

if(Meteor.isClient) {
  describe('Note List Item', function () {

    it('Should render title and timestamp', function () {
      const title = 'My title here';
      const updatedAt = 1491571777330
      const wrapper = mount(<NoteListItem note={{title, updatedAt}} />)

      expect(wrapper.find('h5').text()).toBe(title);
      expect(wrapper.find('p').text()).toBe('4/07/17');
    });

    it('Should set default title if no title is set', function () {
      const title = '';
      const updatedAt = 1491571777330
      const wrapper = mount(<NoteListItem note={{title, updatedAt}} />)

      expect(wrapper.find('h5').text()).toBe('Untitled note');
    });
  })
}
