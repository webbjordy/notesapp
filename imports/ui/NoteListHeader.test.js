import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import { NoteListHeader } from './NoteListHeader';

if(Meteor.isClient) {
  describe('Note List Header', function () {

    it('Should call meteorCall onClick', function () {
      const spy = expect.createSpy();
      const wrapper = mount(<NoteListHeader meteorCall={spy} />)

      wrapper.find('button').simulate('click');

      expect(spy).toHaveBeenCalledWith('notes.insert');
    });

  });
}
