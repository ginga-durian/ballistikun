import React, {Component} from 'react';
import { render } from 'react-dom';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import Header from 'src/components/header.jsx';
import Canvas from 'src/components/canvas.jsx';

import config from 'config.js';
import ScenarioGenerator from 'src/scenario.js';
import Solver from 'src/solver.js';

const muiTheme = getMuiTheme();

class Main extends Component {
    constructor(props, context) {
        super(props, context);
        this.scenarioGen = new ScenarioGenerator({
            firstTarget: {
                x: config.circles[0].x,
                y: config.circles[0].y,
            },
            secondTarget: {
                x: config.circles[1].x,
                y: config.circles[1].y,
            },
            members: config.members.map((element) => element.id),
            playerId: "b1",
            radius: config.radius,
        });

        this.solver = new Solver();

        this.state = {
            stop: true,
        }

        this.handleRequestClose = this.handleRequestClose.bind(this);
        this.handleTouchTap = this.handleTouchTap.bind(this);
        this.handleStopRequest = this.handleStopRequest.bind(this);
        this.handleStartRequest = this.handleStartRequest.bind(this);
        this.handleMarkerChange = this.handleMarkerChange.bind(this);
    }

    componentWillMount() {
        this._next();
    }

    componentDidMount() {
    }

    handleRequestClose() {
        this.setState({
            open: false,
        });
    }

    handleTouchTap() {
        this.setState({
            open: true,
        });
    }

    handleStopRequest() {
        this.setState({
            stop: true,
        });
    }

    handleStartRequest() {
        this.setState({
            stop: false,
        });
        this._next();
        console.log("start");
    }

    handleMarkerChange(markerId) {
        console.log("marker changed", markerId);
        this.scenarioGen.setPlayer(markerId);
    }

    _next() {
        const newScenario = this.scenarioGen.generate();
        this.solver.setScenario(newScenario);
        const answer = this.solver.getAnswer();
        console.log(answer);
        this.setState({
            scenario: newScenario,
            answer: answer,
        });
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div>
                    <Header
                        onTapStart={this.handleStartRequest}
                        onTapStop={this.handleStopRequest}
                        onMarkerChange={this.handleMarkerChange}
                        isStop={this.state.stop}
                        />
                    <Canvas
                        width={600}
                        height={600}
                        isStop={this.state.stop}
                        scenario={this.state.scenario}
                        answer={this.state.answer}
                         />
                </div>
            </MuiThemeProvider>
        );
    }
}

export default Main;
