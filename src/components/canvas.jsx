import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Bitmap, Stage, Shape} from 'EaselJS';
import {Tween} from 'TweenJS';
import {LoadQueue} from 'PreloadJS';

import config from 'config.js';

export default class Canvas extends Component {
    constructor(props, context) {
        super(props, context);
        
        // const bitmap = new Bitmap(require('img/a_big.png'));
        // this.queue = new LoadQueue(false);
        // this.queue.addEventListener("progress", (event) => console.log("ev", event));
        // this.queue.addEventListener("complete", () => console.log("complete"));
        // this.queue.loadManifest(config.loadManifest);
    }

    componentDidMount() {
        const canvas = ReactDOM.findDOMNode(this.refs.canvas);
        this.stage = new Stage(canvas);
        let circle = new Shape();
        circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 50);
        circle.x = 100;
        circle.y = 100;
        this.stage.addChild(circle);
        this.stage.update();
    }
    
    render() {
        return (
            <canvas
                ref="canvas"
                width={this.props.width}
                height={this.props.height}
                >
            </canvas>
        );
    }
}