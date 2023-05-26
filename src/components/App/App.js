// import logo from '../../imgs/logo.svg';
import React, {Component} from 'react';


import './App.css';
import Map from '../Game/Map';

import locationsData from '../../data/locations.json';
import eventsData from '../../data/events.json';


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

    // =-=-= Вариант с forEach без асинхронности -=-=-=

    // Поиск события, подходящего по условиям игрового контекста
    // eventsData.forEach((event) => {
    //   if (
    //     event.position.location === gameContext.currentLocation.name &&
    //     event.position.coords.x === gameContext.playerPosition.x &&
    //     event.position.coords.y === gameContext.playerPosition.y &&
    //     // Дополнительные условия
    //     (event.canRetry || !gameContext.handledEvents.includes(event.id))
    //   ) {
    //     // Вызов события
    //     console.log('Обработка события:', event);
    //     // Добавление его в id в список когда-то запущенных
    //     this.setState((prevState) => ({
    //       gameContext: {
    //         ...prevState.gameContext,
    //         handledEvents: [...prevState.gameContext.handledEvents, event.id],
    //       },
    //     }));
    //   }
    // });

    // =-=-=- Вариант с асинхронной функцией от GPT-4 =-=-=

    // Функция, которая возвращает Promise и решает его после выполнения события
    const processEvent = (event) => {
      return new Promise((resolve) => {
        console.log('Обработка события:', event);
        // Здесь должен быть ваш код для обработки события и изменения gameContext.eventIsExecuted на false
        // ...
        resolve();
      });
    };

    // Асинхронная функция для обработки событий
    const handleEvents = async (eventsData) => {
      for (const event of eventsData) {
        if (
          event.position.location === gameContext.currentLocation.name &&
          event.position.coords.x === gameContext.playerPosition.x &&
          event.position.coords.y === gameContext.playerPosition.y &&
          // Дополнительные условия
          (event.canRetry || !gameContext.handledEvents.includes(event.id))
        ) {
          // Вызов события и ожидание его завершения
          await processEvent(event);
          // Добавление его id в список когда-то запущенных
          this.setState((prevState) => ({
            gameContext: {
              ...prevState.gameContext,
              handledEvents: [...prevState.gameContext.handledEvents, event.id],
            },
          }));
        }
      }
    };
    // Вызов функции handleEvents
    handleEvents(eventsData);

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
