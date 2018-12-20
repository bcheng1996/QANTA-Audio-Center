import React from 'react';
import { Card, Button, Icon, Modal, Row } from 'react-materialize';
import { ReactMic } from 'react-mic';

class MyModal extends React.Component {
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
        });
       this.handleUpload(this.state)
    }

    
    handleUpload = (s) => {
        console.log('this',this)
        console.log('that state', s)
        // blob.name = title;
        // blob.lastModifiedDate = new Date();

        // fetch('/api/addAudio', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: {
        //         blob: blob
        //     }
        // });
    }


    render() {
        return (
            <Modal
                actions={
                    [
                        <Button icon='close'
                            onClick={this.props.close}
                        />,
                        <Button icon='file_upload'
                            onClick={this.handleUpload}
                            disabled={!this.state.finishedRecord}
                        />
                    ]
                }
                modalOptions={{ 'dismissible': false }}
                open={this.props.show}
                header='Please say:'
            >
                <Row>
                    {this.props.title}
                </Row>
                <Row>
                    <ReactMic
                        title={this.props.title}
                        record={this.state.record}
                        strokeColor={'#66FCF1'}
                        backgroundColor={'transparent'}
                        onStop={(b)=>this.onStop(b)}
                    />
                </Row>
                <Row>
                    <Button floating large
                        disabled={this.state.record}
                        onClick={()=>this.startRecording()}
                        className='#66fcf1'
                        waves='light'
                        style={{ marginRight: 20 }}
                        icon='mic' />
                    <Button floating large
                        disabled={!this.state.record}
                        onClick={() => this.stopRecording()}
                        className='red'
                        waves='light'
                        icon='stop' />

                </Row>
            </Modal>
        )
    }
}
export default MyModal;