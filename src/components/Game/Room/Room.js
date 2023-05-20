import React, {Component} from 'react';
import './Room.css';

class Room extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: props.name,
            id: '',
            coords: props.coords,
            doors: props.doors,
            type: 'forest',
        }
    }


    doorsMaker = () => {
        return (
            this.state.doors.map((element, i) => {
            
                function way(way) {
                    switch (way) {
                        case 0:
                            return('north')
                        case 1:
                            return('east')
                        case 2:
                            return('south')
                        case 3:
                            return('west')
                        default:
                            break
                    }
                }

                switch (element) {
                    case 0:
                        return (<div className={`${way(i)} none`}></div>)
                    case 1:
                        return (<div className={`${way(i)} open`}></div>)
                    case 2:
                        return (<div className={`${way(i)} close`}></div>)
                    default:
                        break
                }
            })
        )
    }


    render() {

        
        return (
            <div class="room" style={{
                gridColumn: `${this.props.coords.x}/${this.props.coords.x}`,
                gridRow: `${this.props.coords.y}/${this.props.coords.y}`}}>
                <div class="doors">
                    {this.doorsMaker()}
                </div>
                <div class="type">
                    <div style={{
                        backgroundImage: `url(../../imgs/icons/${this.state.type}.svg)`, 
                        }}>
                        
                    </div>
                </div>
                
            </div>
        )
    }

}

export default Room;