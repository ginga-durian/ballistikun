import React, {Component} from 'react';
import { render } from 'react-dom';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import Header from 'src/components/header.jsx';
import Canvas from 'src/components/canvas.jsx';

const muiTheme = getMuiTheme();

class Main extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleRequestClose = this.handleRequestClose.bind(this);
        this.handleTouchTap = this.handleTouchTap.bind(this);
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

    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div>
                    <Header />
                    <Canvas />
                </div>
            </MuiThemeProvider>
        );
    }
}

export default Main;
