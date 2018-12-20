/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { Card, Row, Col, Table, Button } from 'react-materialize';
import MyCard from 'components/MyCard';
import { ReactMic } from 'react-mic';

/* eslint-disable react/prefer-stateless-function */
export default class HomePage extends React.PureComponent {


  constructor(props) {
    super(props);
    this.state = {
      record: false,
      finishedRecord: false,
      blob: null,
    }
  }

  startRecording = () => {
    this.setState({
      finishedRecord: false,
      record: true,
      startRecording: 'is started in here'
    });
    console.log('started', this)
  }

  stopRecording = () => {
    this.setState({
      record: false,
      finishedRecord: true,
      stopRecording: 'isStopped in here',
      startRecording: 'is stopped in here'
    });
    console.log('stopped', this)
  }

  onStop = (b) => {
    this.setState({
      blob: b
    })
    console.log(URL.createObjectURL(this.state.blob.blob))
  }

  handleSelect = (obj) => {
    this.setState({
      selected: obj
    })
  }

  handleUpload = () => {
    var formData = new FormData()
    formData.append('fname', this.state.selected.key + '_' + Date.now())
    formData.append('data', this.state.blob.blob)
    console.log(formData);
    fetch('/api/addAudio', {
      method: 'POST',
      body: formData
    })
  }

  getAll = () => {
    fetch('/api/getAudio')
      .then(res => res.body)
      .then(body => {
        const reader = body.getReader();
        reader.read().then(({done,value})=>{
          console.log(URL.createObjectURL(new Blob(value,{type: 'audio/webm'})))
        })
      })
  }


  render() {
    const questions = [{ key: 1, value: "What is the powerhouse of the cell?" },
    { key: 2, value: "Who was the first president of the United States?" },
    { key: 3, value: "Which country has the largest land mass?" }]

    return (
      <div style={cardStyle}>
        <Button
          onClick={() => this.getAll()}
        />
        <Row>
          {questions.map(obj =>
            <MyCard key={obj.key} title={obj.value}>
              <Button icon='add'
                disabled={this.state.selected && this.state.selected.key == obj.key}
                onClick={() => this.handleSelect(obj)}
              />
            </MyCard>

          )}
        </Row>

        <Row
          style={{ position: 'fixed', bottom: 0 }}>
          <ReactMic
            record={this.state.record}
            visualSetting="sinewave"
            audioBitsPerSecond={128000}
            strokeColor={'#66FCF1'}
            backgroundColor={'transparent'}
            onStop={(b) => this.onStop(b)}
          />
          <Button floating large
            disabled={!this.state.selected || this.state.record}
            onClick={() => this.startRecording()}
            className='#66fcf1'
            waves='light'
            style={{ marginRight: 20 }}
            icon='mic' />
          <Button floating large
            disabled={!this.state.record}
            onClick={() => this.stopRecording()}
            className='red'
            waves='light'
            style={{ marginRight: 20 }}
            icon='stop' />
          <Button floating large
            disabled={!this.state.finishedRecord}
            onClick={() => this.handleUpload()}
            className='#66fcf1'
            waves='light'
            style={{ marginRight: 20 }}
            icon='file_upload' />

          {this.props.question}

        </Row>
      </div>

    );
  }


}

const cardStyle = {
  marginLeft: 50,
  marginRight: 50
};
