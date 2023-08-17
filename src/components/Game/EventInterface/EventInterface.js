import React, {Component} from 'react';
import './EventInterface.css';



class EventInterface extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentStep: 0,
            isEnd: true,
            title: null,
            text: null,

        }
    }


    handleOptionClick = (option) => {
        const { gameContext } = this.props;
    
        if (option.startEvent) {
            this.props.startEvent(option.startEvent);
        }
    
        if (option.end) {
            return;
        }
    
        this.setState({
            currentStep: option.direction,
        });
    }


    startEvent = (event) => {
        
    }

    changeStep = (nextStep) => {

    }



    componentDidMount() {
        
    }

    componentWillUnmount() {
        
    }


    render() {
        // const { gameContext } = this.props;
        // const { currentStep, isEnd } = this.state;

        // const currentContent = content.steps[currentStep];

        return (



            <div className='EventInterface'>
                <div className='event-title'>
                    {this.state.title}
                </div>
                <div className='event-content'>
                    <span className='actor'></span>
                    <p className='text'>{this.state.text}</p>
                </div>
                <div className="event-control">
                    {this.state.options.map((item, i) => (
                        <div>
                            <div key={item.direction} onClick={this.changeStep(item.direction)}></div>
                        </div>
                    ))}
                </div>
            </div>
            
        )
    }
}

export default EventInterface;