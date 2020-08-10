import React from 'react';
import { Row, Col, Input } from 'reactstrap';
import YouTube from 'react-youtube';

class Video extends React.Component {

  state = {
    id: '',
    opts: {
      height: '240px',
      width: '100%',
      playerVars: { autoplay: 1, }
    },
    url_video: ''

  }

  setURL = (e) => {
    try {
      let video_id = e.target.value.split('v=')[1];
      let ampersandPosition = video_id.indexOf('&');
      if (ampersandPosition != -1) {
        video_id = video_id.substring(0, ampersandPosition);
        this.setState({ id: video_id });       
      } else {
        this.setState({ id: video_id, url_video: '' });
      }
    } catch (error) {
      this.setState({ url_video: e.target.value, id: '' })
    }

    this.add_valor_component(e.target.value);
  }

  add_valor_component = (valor) => {
    if (this.props.indx) {
      this.props.valores[this.props.indx] = {
        tipo_component: 'video',
        valor: valor
      }
    }
  }

  render() {
    return (
      <Row>
        <Col md="12" className="mb-1">
          < Input type="text" placeholder="URL Del Video"
            onChange={this.setURL}
          />
        </Col>
        {this.state.id !== '' ?
          <Col md="12">
            <YouTube containerClassName="mx-auto d-block" videoId={this.state.id} opts={this.state.opts} onReady={this._onReady} />
          </Col>
          :
          <></>
        }
      </Row>
    );
  }

  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }
}

export default Video;