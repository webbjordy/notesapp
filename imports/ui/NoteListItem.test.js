import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import { NoteListItem } from './NoteListItem';
import { notes } from '../fixtures/fixtures';

if(Meteor.isClient) {
  describe('Note List Item', function () {
    let Session;

    beforeEach(() => {
      Session = {
        set: expect.createSpy()
      };
    });

    it('Should render title and timestamp', function () {
      const wrapper = mount(<NoteListItem note={notes[0]} Session={Session} />)

      expect(wrapper.find('h5').text()).toBe(notes[0].title);
      expect(wrapper.find('p').text()).toBe('4/07/17');
    });

    it('Should set default title if no title is set', function () {
      const wrapper = mount(<NoteListItem note={notes[1]} Session={Session} />)

      expect(wrapper.find('h5').text()).toBe('Untitled note');
    });

    it('Should call set onClick', function () {
      const wrapper = mount(<NoteListItem note={notes[0]} Session={Session} />)

      wrapper.find('div').simulate('click');

      expect(Session.set).toHaveBeenCalledWith('selectedNoteId', notes[0]._id);

    });
  })
}
