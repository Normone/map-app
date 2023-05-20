import React, {Component} from 'react';

class Ex3 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // toggle: false,

        }
    }


    render() {
        return (
            <button onClick={this.props.toggle}>
                {this.props.toggleStatus ? 'Включено' : 'Выключено'}
            </button>
        )
    }

}

export default Ex3;