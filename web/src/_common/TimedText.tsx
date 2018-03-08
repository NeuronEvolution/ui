import * as React from 'react';

export interface TextTimestamp {
    text: string;
    timestamp: Date; // force props change
}

export interface Props {
    text: TextTimestamp;
    intervalMillSec: number;
    style?: React.CSSProperties;
}

interface State {
    text: TextTimestamp;
    timer: number;
}

export default class TimedText extends React.Component<Props, State> {
    public componentWillMount() {
        this.setState({
            text: {text: '', timestamp: new Date()},
            timer: 0
        });
    }

    public componentWillReceiveProps(nextProps: Props) {
        // may called when props not changed
        if (nextProps.text.timestamp === this.state.text.timestamp) {
            return;
        }

        if (this.state.timer != null && this.state.timer !== 0) {
            clearInterval(this.state.timer);
        }

        const t: number = window.setInterval(
            () => {
                if (new Date().getTime() - nextProps.text.timestamp.getTime() > nextProps.intervalMillSec) {
                    this.setState({text: {text: '', timestamp: nextProps.text.timestamp}});
                    clearInterval(t);
                }
            },
            200);

        this.setState({
            text: nextProps.text,
            timer: t,
        });
    }

    public render() {
        return (
            <label
                style={this.props.style}
            >
                {this.state.text.text}
            </label>
        );
    }
}