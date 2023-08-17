import React, {Component} from 'react';
import './Interface.css';
import Map from '../Map';
import EventInterface from '../EventInterface';



class Interface extends Component {
    constructor(props) {
        super(props)
        this.state = {


        }
    }


    



    componentDidMount() {
        
    }

    componentWillUnmount() {
        
    }


    render() {
        const { currentLocation } = this.props.gameContext;

        return (
            
            <div className='Interface'>
                <Map 
                    gameContext={this.props.gameContext}
                    handleEvent={this.props.handleEvent}
                    changePositionPlayer={this.props.changePositionPlayer}
                ></Map>
                <div className="topControlPanel"></div>
                <div className="contentPanel">
                    <EventInterface
                        gameContext={this.props.gameContext}    
                        handleEvent={this.props.handleEvent}
                        changePositionPlayer={this.props.changePositionPlayer}
                    ></EventInterface>
                </div>
                <div className="bottomControlPanel"></div>
                
            </div>
        )
    }
}

export default Interface;