import React, {Component} from 'react';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import {Editor, EditorState, RichUtils} from 'draft-js';


class Email extends Component{
  constructor(props){
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = editorState => this.setState({editorState});
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
  }

  handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  _onBoldClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
  }

  render(){
    return(
      <div className="animated fadeIn">
        <Row>
          <Col xs="12">
            <Card>
              <CardHeader>
                <i className="cui-envelope-closed"></i>
                <strong>eMail Marketing</strong>
              </CardHeader>
              <CardBody>
                <h3>eMail Marketing</h3>
                <button onClick={this._onBoldClick.bind(this)}>Bold</button>
                <Editor
                    editorState={this.state.editorState}
                    handleKeyCommand={this.handleKeyCommand}
                    onChange={this.onChange} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
export default Email;
