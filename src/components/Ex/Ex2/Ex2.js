import React, {Component} from 'react';

class Ex2 extends Component {

    constructor(props) {
        super(props)
        this.state = {
            date: new Date(),

        }
    }

    componentDidMount() { // Вызывается при монтировании
        this.timerID = setInterval(
            () => this.tick(),
        1000);
    }

    componentWillUnmount() { // Вызывается при размонтировании
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({date: new Date()})
    }

    render() {
        return (
            <div>
                <h2>Сейчас {this.state.date.toLocaleTimeString()}.</h2>
            </div>
        );
    }
}

export default Ex2;