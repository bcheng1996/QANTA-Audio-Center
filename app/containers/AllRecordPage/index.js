/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Row, Button } from 'react-materialize';
import MyCard from 'components/MyCard';

/* eslint-disable react/prefer-stateless-function */
export default class AllRecordPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      audios: {},
      isLoading: true,
      visited: new Set(),
    }
  }


  componentWillMount() {
    fetch('/api/getAllAudio')
      .then(res => (res.json()))
      .then(body => {
        let res =
        {
          '1': { audio_files: [], question: "What is the powerhouse of the cell?" },
          '2': { audio_files: [], question: "Who was the first president of the United States?" },
          '3': { audio_files: [], question: "Which country has the largest land mass?" }
        }
        for (let audio in body) {
          res[body[audio].charAt(0)].audio_files.push(body[audio]);
        }
        this.setState({ audios: res, isLoading: false });
      })
  }

  // fetch audio file f and play audio event e
  handleOpenAudio = (e, that, file) => {
    if (this.state.visited.has(this.refs[file].src)) {
      this.refs[file].play();
    } else {
      fetch('api/playAudio?f=' + file)
        .then(res => res.blob())
        .then(blob => {
          this.refs[file].src = URL.createObjectURL(blob);
          this.setState((state) => {
            return {visited: state.visited.add(this.refs[file].src)}
          })
        })
    }
  }

  render() {
    let keys = Object.keys(this.state.audios);
    return (
      <div style={cardStyle}>
        <h1>All Recordings</h1>
        <Row>
          {this.state.isLoading == true ? <h1>Loading Audio</h1> : keys.map(key =>
            <MyCard key={key} title={this.state.audios[key].question}>
              {this.state.audios[key].audio_files.map(file =>
                <audio key={file} ref={file} controls onPlay={(e) => this.handleOpenAudio(e, this, file)}> </audio>
              )}

            </MyCard>

          )
          }

        </Row>
      </div>

    );
  }
}

const cardStyle = {
  marginLeft: 50,
  marginRight: 50
};
