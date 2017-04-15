import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';

import { Session } from 'meteor/session';
import  { Notes } from '../api/notes';

export class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: ''
    };
  }
  handleBodyChange(e) {
    const body = e.target.value;
    this.setState({ body });
    this.props.call('notes.update', this.props.note._id, { body });
  }

  handleTitleChange(e) {
    const title = e.target.value;
    this.setState({ title });
    this.props.call('notes.update', this.props.note._id, { title });
  }

  handleRemoval() {
    this.props.call('notes.remove', this.props.note._id);
    this.props.browserHistory.push('/dashboard');
  }

  componentDidUpdate(prevProps, prevState) {
    const currentNoteId = this.props.note ? this.props.note._id : undefined;
    const prevNoteId = prevProps.note ? prevProps.note._id : undefined;

    if(currentNoteId && currentNoteId != prevNoteId) {
      this.setState({
        title: this.props.note.title,
        body: this.props.note.body
      });
    }
  }

  render () {
   if (this.props.note) {
     return (
       <div className="editor">
         <input className="editor__title" value={this.state.title} placeholder='enter title' onChange={this.handleTitleChange.bind(this)} />
         <textarea className="editor__body" value={this.state.body} placeholder='your note here' onChange={this.handleBodyChange.bind(this)}></textarea>
         <div>
           <button className="button button--secondary" onClick={this.handleRemoval.bind(this)}>ShitCan Note</button>
         </div>
       </div>
     )
   } else {
     return (
      <div className="editor">
       <p className="editor__message">
         {this.props.selectedNoteId ? 'Ooops we couldn\'t find your note' : 'Select or create a note to begin'}
       </p>
     </div>
     );
   }
  }
};

Editor.propTypes = {
  note: React.PropTypes.object,
  selectedNoteId: React.PropTypes.string,
  call: React.PropTypes.func.isRequired,
  browserHistory: React.PropTypes.object.isRequired
};

export default createContainer(() => {
  const selectedNoteId = Session.get('selectedNoteId')

  return {
    selectedNoteId,
    note: Notes.findOne(selectedNoteId),
    call: Meteor.call,
    browserHistory
  };
}, Editor);
