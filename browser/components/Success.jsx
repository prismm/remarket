import React, {Component} from 'react'; 
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';


/*----------------------- Success Component ---------------------------*/

class Success extends Component {
    constructor(props){
        super(props);
        this.state = {
            timeLeft: 5
        }
        this.tick = this.tick.bind(this);
    }

    componentDidMount(){
        this.interval = setInterval(this.tick, 1000)
    }

    tick(){
        this.setState({timeLeft: this.state.timeLeft - 1});
        if (this.state.timeLeft < 0) {
            clearInterval(this.interval);
            browserHistory.push(this.props.route.redirectTo)
        }
    }

    componentWillUnmount(){
        clearInterval(this.interval)
    }

    render() {
        return (
            <div className="success">
            <h3>Success!</h3>
            <div className="redirecting"> Redirecting you to {this.props.route.redirectToName} in {this.state.timeLeft} seconds.</div>
            </div>
        )
    }
}

export default Success;
