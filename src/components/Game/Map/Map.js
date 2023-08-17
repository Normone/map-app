import React, {Component} from 'react';
import './Map.css';
import Room from '../Room';



class Map extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // playerPosition: {x: 4, y: 5},
            marginTop: 0,
            marginLeft: 0,

        }
    }


    centering = () => {
        const {playerPosition} = this.props.gameContext;
        let marginLeft = this.state.marginLeft;
        let marginTop = this.state.marginTop;
        if (playerPosition.x > 3 && playerPosition.x < (this.props.gameContext.currentLocation.size[0] - 3)) {
          marginLeft = -(playerPosition.x - 4) * 60;
        }
        if (playerPosition.y > 3 && playerPosition.y < (this.props.gameContext.currentLocation.size[1] - 3)) {
          marginTop = -(playerPosition.y - 4) * 60;
        }
        this.setState({ marginLeft, marginTop });
    };

    handleKeyDown = (event) => {
        event.preventDefault();
        const { playerPosition } = this.props.gameContext;
        let newPosition = { ...playerPosition };

        switch (event.keyCode) {
            case 37: // left arrow
            newPosition.x -= 1;
            break;
            case 38: // up arrow
            newPosition.y -= 1;
            break;
            case 39: // right arrow
            newPosition.x += 1;
            break;
            case 40: // down arrow
            newPosition.y += 1;
            break;
            default:
            return;
        }

        // Проверка позиции на валидность
        if (this.isValidPosition(newPosition)) {
            this.setState({ playerPosition: newPosition }, this.centering);
            this.props.changePositionPlayer(newPosition)
            
        }
    };

    handleClick = (e) => {
        e.preventDefault();
        const { playerPosition } = this.props.gameContext;
        let newPosition = { ...playerPosition };
        
        if (e.target.classList.contains('key')) {
            if (e.target.classList.contains('Up')) {
                newPosition.y -= 1;
            } else if (e.target.classList.contains('Left')) {
                newPosition.x -= 1;
            } else if (e.target.classList.contains('Down')) {
                newPosition.y += 1;
            } else if (e.target.classList.contains('Right')) {
                newPosition.x += 1;
            }
            if (this.isValidPosition(newPosition)) {
                this.setState({ playerPosition: newPosition }, this.centering);
                this.props.changePositionPlayer(newPosition)
                
            }
        }

    }

    isValidPosition = (newPosition) => {
        // Проверка позиции на существование
        
        const { playerPosition } = this.props.gameContext;
        const location = this.props.gameContext.currentLocation;

        const currentRoom = location.rooms.find(
            (loc) => loc.coords.x === playerPosition.x && loc.coords.y === playerPosition.y
        );
        const nextRoom = location.rooms.find(
            (loc) => loc.coords.x === newPosition.x && loc.coords.y === newPosition.y
        );

        if (!nextRoom) {
            return false;
        }


        // Проверка позиций на препятствия - вариант 2
        const [north, east, south, west] = currentRoom.doors;
        const [nextNorth, nextEast, nextSouth, nextWest] = nextRoom.doors;
        const isNorthValid = north === 2 || north === 0;
        const isEastValid = east === 2 || east === 0;
        const isSouthValid = south === 2 || south === 0;
        const isWestValid = west === 2 || west === 0;

        const isNextNorthValid = nextNorth === 2 || nextNorth === 0;
        const isNextEastValid = nextEast === 2 || nextEast === 0;
        const isNextSouthValid = nextSouth === 2 || nextSouth === 0;
        const isNextWestValid = nextWest === 2 || nextWest === 0;
        

        if (
        ((newPosition.y < playerPosition.y && newPosition.y === (playerPosition.y - 1)) && (isSouthValid || isNextNorthValid)) ||
        ((newPosition.y > playerPosition.y && newPosition.y === (playerPosition.y + 1)) && (isNorthValid || isNextSouthValid)) ||
        ((newPosition.x > playerPosition.x && newPosition.x === (playerPosition.x + 1)) && (isEastValid || isNextWestValid)) ||
        ((newPosition.x < playerPosition.x && newPosition.x === (playerPosition.x - 1)) && (isWestValid || isNextEastValid))
        ) {
        return false;
        }

        return true;
    };



    componentDidMount() {
        document.addEventListener("keydown", this.handleKeyDown);
        document.addEventListener("click", this.handleClick);
        this.centering()
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeyDown);
        document.removeEventListener("click", this.handleClick);
    }


    render() {
        const { currentLocation } = this.props.gameContext;

        return (
            
            <div className="Map">
                <div className="locationTitle">
                    {currentLocation.title}
                </div>
                <div className="mapView">
                    <div 
                    className="mapViewContainer"
                    style={{ 
                        marginLeft: this.state.marginLeft, 
                        marginTop: this.state.marginTop, 
                        gridTemplateColumns: `repeat(${currentLocation.size[0]}, 50px)`, 
                        gridTemplateRows: `repeat(${currentLocation.size[1]}, 50px)`
                        }}
                    >
                        {currentLocation.rooms.map((item, index) => {
                            return (<Room 
                                key={index} 
                                name={item.name} 
                                coords={item.coords} 
                                doors={item.doors}></Room>)
                        })}
                        <div
                        className="player"
                        style={{
                            gridRow: this.props.gameContext.playerPosition.y,
                            gridColumn: this.props.gameContext.playerPosition.x,
                        }}
                        />
                    </div>
                </div>
                <div className='controlPanel'>
                    <div className="key Some">Some</div>
                    <div className="key Up">Вверх</div>
                    <div className="key Some">Some</div>
                    <div className="key Left">Влево</div>
                    <div className="key Down">Вниз</div>
                    <div className="key Right">Вправо</div>
                </div>
            </div>
        )
    }
}

export default Map;