import React, {Component} from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import Toggle from 'material-ui/Toggle';
import LinearProgress from 'material-ui/LinearProgress';
import MenuItem from 'material-ui/MenuItem';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';

import config from 'config.js';

export default class Header extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = { 
            selectedMarker: 0,
            stop: this.props.isStop,
            completed: 0,
        };
        this.handleMarkerChange = this.handleMarkerChange.bind(this);
        
        const markers = config.markers;
        this.marker_menuitems = markers.map((element, index) =>
            <MenuItem key={index} value={index} primaryText={element} />
        );
    }

    componentDidMount() {
    }

    handleMarkerChange(event, index, value) {
        this.setState({selectedMarker: value});
        this.props.onMarkerChange(config.members[value]);
    }

    _startTimer() {
        this.timer = setInterval(() =>
            this._progress(10000/config.durationExplode), 100);
    }

    _stopTimter() {
        clearInterval(this.timer);
    }

    _progress(completed) {
        if (completed > config.durationExplode) {
            this.setState({completed: 100});
            this._stopTimter();
        } else {
            this.setState({completed: this.state.completed + completed});
        }
    }

    render() {
        return (
            <div>
            <Toolbar>
                <ToolbarGroup firstChild={true}>
                    <SelectField
                        floatingLabelText="マーカー"
                        value={this.state.selectedMarker}
                        onChange={this.handleMarkerChange}
                        >
                        {this.marker_menuitems}
                    </SelectField>
                </ToolbarGroup>
                <ToolbarGroup>
                    <Toggle
                        label="Auto NEXT"
                        />
                    <RaisedButton
                        label="START"
                        onTouchTap={() => {
                            this.props.onTapStart();
                            this._startTimer();
                            }}
                        disabled={!this.props.isStop}
                        />
                    <RaisedButton
                        label="STOP"
                        onTouchTap={this.props.onTapStop}
                        disabled={this.props.isStop}
                        />
                </ToolbarGroup>
            </Toolbar>
            <LinearProgress
                mode="determinate"
                value={this.state.completed}
                />
            </div>
            
        );
    }
}