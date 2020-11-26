import React, { Component, PropTypes } from 'react';
import RichTextEditor from 'react-rte';


class MyStatefulEditor extends Component {

  state = {
    value: RichTextEditor.createEmptyValue()
  }

  componentDidMount = () => {
    if (this.props.contenido === undefined) return;
    this.setState({ value:  RichTextEditor.createValueFromString(this.props.contenido,'html')});
  }

  toolbarConfig = {
    // Optionally specify the groups to display (displayed in the order listed).
    display: ['INLINE_STYLE_BUTTONS', 'BLOCK_TYPE_BUTTONS', 'LINK_BUTTONS', 'BLOCK_TYPE_DROPDOWN', 'HISTORY_BUTTONS'],
    INLINE_STYLE_BUTTONS: [
      { label: 'Bold', style: 'BOLD', className: 'custom-css-class' },
      { label: 'Italic', style: 'ITALIC' },
      { label: 'Underline', style: 'UNDERLINE' }
    ],
    BLOCK_TYPE_DROPDOWN: [
      { label: 'Normal', style: 'unstyled' },
      { label: 'Heading Large', style: 'header-one' },
      { label: 'Heading Medium', style: 'header-two' },
      { label: 'Heading Small', style: 'header-three' }
    ],
    BLOCK_TYPE_BUTTONS: [
      { label: 'UL', style: 'unordered-list-item' },
      { label: 'OL', style: 'ordered-list-item' }
    ]
  };

  onChange = (value) => {    
    if (this.props.posicion) {
      this.setState({ value: value});
      this.props.setValues(this.props.posicion, value.toString('html'));
    }
  };

  render() {
    return (

      <RichTextEditor
        editorStyle={{ height: "200px" }}
        value={this.state.value}
        onChange={this.onChange}
        toolbarConfig={this.toolbarConfig}
      />


    );
  }
}

export default MyStatefulEditor;