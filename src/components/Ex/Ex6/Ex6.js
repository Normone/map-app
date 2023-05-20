import React, {Component} from 'react';

class Ex6 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // name: '',
            age: '',
            sent: false,
            warn: false
        }
    }

    sendStatus = (e) => {
        e.preventDefault();
        if (this.props.name && this.state.age) {
            this.setState(() => ({sent: true, warn: false}))
        } else {
            this.setState(() => ({warn: true, sent: false}))
        }
    }

    // Это для обычных инпутов, связанных с локальным состоянием
    change = (e) => { 
        
        this.setState({[e.target.name]: e.target.value});
    }


    render() {

        
        return (
            <form onSubmit={this.sendStatus}>
                {this.state.warn &&
                <h3>Не заполнены все поля!</h3>}
                {this.state.sent &&
                <h3>Анкета отправлена, ищите себя в прошмандовках Мухосранска с;!</h3>}
                <input type="text" name='name' value={this.props.name} onChange={this.props.changeName}/>
                <input type="number" name='age' value={this.state.age} onChange={this.change}/>
                <button type='submit'>Отправить</button>
            </form>
        )
    }

}

export default Ex6;