import React from 'react';
import { Card, Button, Icon, Modal, Row } from 'react-materialize';
import { ReactMic } from 'react-mic';
import MyModal from 'components/MyModal';

class MyCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            record: false,
            showModal: false,
            currTitle: '',
            blob: null
        }
        this.updateShowStatus = this.updateShowStatus
    }
    updateShowStatus = () => {
        this.setState({
            showModal: false
        })
    }
    handleAddButton = (title) => {
        this.setState({
            showModal: true,
            currTitle: title
        })
    }

    startRecording = () => {
        this.setState({
            finishedRecord: false,
            record: true,
            startRecording: 'is started in here'
        });
        console.log(this)
    }

    stopRecording = () => {
        this.setState({
            record: false,
            finishedRecord: true,
            stopRecording: 'isStopped in here',
            startRecording: 'is stopped in here'
        });
    }

    onStop= (b) => {
        console.log('onstop', this, b)
    }

    render() {
        return (
            <Card
                textClassName='black-text'
                title={this.props.title}
            >
                {/* <Button floating large
                    className='#66FCF1'
                    waves='light'
                    icon='add'
                    onClick={() => this.handleAddButton(this.props.title)}
                /> */}
                {this.props.children}
            </Card>

        );
    }
}

export default MyCard;