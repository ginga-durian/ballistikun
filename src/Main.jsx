import React, {Component} from 'react';
import { render } from 'react-dom';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import Header from 'src/components/header.jsx';
import Canvas from 'src/components/canvas.jsx';

import config from 'config.js';
import ScenarioGenerator from 'src/scenario.js';

const muiTheme = getMuiTheme();

class Main extends Component {
    constructor(props, context) {
        super(props, context);
        const scenarioGen = new ScenarioGenerator({
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
        const scenario = scenarioGen.generate();

        this.state = {
            stop: true,
            scenario: scenario,
        }

        this.handleRequestClose = this.handleRequestClose.bind(this);
        this.handleTouchTap = this.handleTouchTap.bind(this);
        this.handleStopRequest = this.handleStopRequest.bind(this);
        this.handleStartRequest = this.handleStartRequest.bind(this);
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
        console.log("start");
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div>
                    <Header
                        onTapStart={this.handleStartRequest}
                        onTapStop={this.handleStopRequest}
                        isStop={this.state.stop}
                        />
                    <Canvas
                        width={600}
                        height={500}
                        isStop={this.state.stop}
                        scenario={this.state.scenario}
                         />
                </div>
            </MuiThemeProvider>
        );
    }
}

export default Main;
