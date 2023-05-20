// import logo from '../../imgs/logo.svg';
import React, {Component} from 'react';


import './App.css';
import Map from '../Game/Map';

import locationsData from '../../data/locations.json';
import eventData from '../../data/events.json';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

      gameContext: {
        currentLocation: locationsData[0],
        playerPosition: {x: 4, y: 5},
        handledEvents: [],

      }
    }
  }

  changePositionPlayer = (newPosition) => {
    this.setState(prevState => ({
      gameContext: {
        ...prevState.gameContext,
        playerPosition: newPosition
      }
    }), () => {
      this.handleEvent();
    });
  }


  handleEvent = () => {
    const {gameContext} = this.state;

    // Поиск события, подходящего по условиям игрового контекста
    eventData.forEach((event) => {
      if (
        event.position.location === gameContext.currentLocation.name &&
        event.position.coords.x === gameContext.playerPosition.x &&
        event.position.coords.y === gameContext.playerPosition.y &&
        // Дополнительные условия
        (event.canRetry || !gameContext.handledEvents.includes(event.id))
      ) {
        // Вызов события
        console.log('Обработка события:', event);
        // Добавление его в id в список когда-то запущенных
        this.setState((prevState) => ({
          gameContext: {
            ...prevState.gameContext,
            handledEvents: [...prevState.gameContext.handledEvents, event.id],
          },
        }));
      }
    });
  };
  

  startNewGame = () => {
    if (this.state.gameContext.currentLocation === null) {
      this.setState({currentLocation: locationsData[0]})
    }
  }

  getLocation = (location) => {
    this.setState({ currentLocation: location });
  }
  
  render() {

    return (
      <div className="App">

        <Map 
          gameContext={this.state.gameContext}
          handleEvent={this.handleEvent}
          changePositionPlayer={this.changePositionPlayer}
        ></Map>
      </div>
    );
  }
}















// {/* <div onClick={NewGameButton.handleClick}>Старт</div> */}
{/* <div onClick={this.startNewGame}>Старт</div> */}





class GameTemplate {
  static saveTemplate(template) {
    localStorage.setItem('gameContext', JSON.stringify(template));
  }

  static loadTemplate() {
    const template = localStorage.getItem('gameContext');
    return template ? JSON.parse(template) : null;
  }
}

class NewGameButton {
  static handleClick() {
    GameTemplate.saveTemplate(this.state.gameContext);
    // Запуск игры
  }
}

export default App;
