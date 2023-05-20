import React, {Component} from 'react';

class Ex5 extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {

        // так

        // const listItems = this.props.list.map(item => {
        //     return (<li key={item.id}>{item.name}</li>)
        // })


        // return (
        //     <ul>
        //         {listItems}
        //     </ul>
        // )

        // или так

        return (
            <ul>
                {this.props.list.map(item => { return (
                <li key={item.id}>{item.name}</li>
                )})}
            </ul>
        )
    }

}

export default Ex5;