import React, {Component} from 'react';

class Ex4 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // toggle: false,

        }
    }

// Привязка контекста без бинда происходит либо через публичные поля, 
// как в примере ниже, либо как обычная функция, но при вызове вместо "this.functionName" нужно писать "() => {functionName()}"
    toggler = () => {
        if (this.props.toggleStatus) {
            return (
                <h3>Da</h3>
            )
        } else {
            return (
                <h3>Net</h3>
            )
        }
    };

    render() {
        return (
            <div>
                {this.toggler()}
                {this.props.toggleStatus
                    ? <h3>Est</h3>
                    : <h3>Netu</h3>
                }
                {!this.props.toggleStatus &&
                <h4>blyat</h4>
                }
            </div>
        )
    }

}

export default Ex4;