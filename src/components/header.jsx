import React, {Component} from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';

import config from 'config.js';

export default class Header extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = { selectedMarker: 0,
                       stop: this.props.isStop };
        this.handleMarkerChange = this.handleMarkerChange.bind(this);
        
        const markers = config.markers;
        this.marker_menuitems = markers.map((element, index) =>
            <MenuItem key={index} value={index} primaryText={element} />
        );
    }

    handleMarkerChange(event, index, value) {
        this.setState({selectedMarker: value});
        this.props.onMarkerChange(config.members[value]);
    }

    render() {
        return (
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
                    <RaisedButton
                        label="START"
                        onTouchTap={this.props.onTapStart}
                        disabled={!this.props.isStop}
                        />
                    <RaisedButton
                        label="STOP"
                        onTouchTap={this.props.onTapStop}
                        disabled={this.props.isStop}
                        />
                </ToolbarGroup>
            </Toolbar>
        );
    }
}