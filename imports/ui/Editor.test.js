import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import { Editor } from './Editor';
import { notes } from '../fixtures/fixtures';

if(Meteor.isClient) {
  describe('Editor', function () {
    let browserHistory;
    let call;

    beforeEach(function () {
      call = expect.createSpy();
      browserHistory = {
        push: expect.createSpy()
      };
    });

    it('should render pick note messages', function () {
      const wrapper = mount(<Editor browserHistory={browserHistory} call={call} />);
      expect(wrapper.find('p').text()).toBe('Select or create a note to begin');
    });

    it('should render note not found message', function () {
      const wrapper = mount(<Editor browserHistory={browserHistory} call={call} selectedNoteId={notes[0]._id}/>);
      expect(wrapper.find('p').text()).toBe('Ooops we couldn\'t find your note');
    });

    it('should remove note', function () {
      const wrapper = mount(<Editor browserHistory={browserHistory} call={call} selectedNoteId={notes[0]._id} note={notes[0]} />)

      wrapper.find('button').simulate('click');

      expect(browserHistory.push).toHaveBeenCalledWith('/dashboard');
      expect(call).toHaveBeenCalledWith('notes.remove', notes[0]._id)
    });

    //testing handleBodyChange
    it('should update the note on textarea change', function () {
      const newBody = 'this is my new body text.'
      const wrapper = mount(<Editor browserHistory={browserHistory} call={call} selectedNoteId={notes[0]._id} note={notes[0]} />)

      wrapper.find('textarea').simulate('change', {
        target: {
          value: newBody
        }
      });

      expect(wrapper.state('body')).toBe(newBody);
      expect(call).toHaveBeenCalledWith('notes.update', notes[0]._id, {body: newBody});
    });

    //testing handleTitleChange
    it('should update title on input change', function () {
      const newTitle = 'This is my new title'
      const wrapper = mount(<Editor browserHistory={browserHistory} call={call} selectedNoteId={notes[0]._id} note={notes[0]} />)

      wrapper.find('input').simulate('change', {
        target: {
          value: newTitle
        }
      });

      expect(wrapper.state('title')).toBe(newTitle);
      expect(call).toHaveBeenCalledWith('notes.update', notes[0]._id, {title: newTitle});
    });

    it('should set state for new note', function () {
      const wrapper = mount(<Editor browserHistory={browserHistory} call={call} />);

      wrapper.setProps({
        selectedNoteId: notes[0]._id,
        note: notes[0]
      });

      expect(wrapper.state('title')).toBe(notes[0].title);
      expect(wrapper.state('body')).toBe(notes[0].body);
    });

    it('should not set state if note prop not provided', function () {
      const wrapper = mount(<Editor browserHistory={browserHistory} call={call} />);

      wrapper.setProps({
        selectedNoteId: notes[0]._id
      });

      expect(wrapper.state('title')).toBe('');
      expect(wrapper.state('body')).toBe('');
    });

  });
}
