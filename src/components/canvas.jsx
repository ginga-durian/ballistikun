import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Bitmap, Ease, Stage, Ticker} from 'EaselJS';
import {Tween} from 'TweenJS';
import {LoadQueue} from 'PreloadJS';

import config from 'config.js';

export default class Canvas extends Component {
    constructor(props, context) {
        super(props, context);
        
        this.onLoadQueueComplete = () => {
            for (const c of config.circles) {
                let image = this.queue.getResult(c.imageId);
                let bitmap = new Bitmap(image);
                bitmap.x = c.x;
                bitmap.y = c.y;
                bitmap.regX = c.regX;
                bitmap.regY = c.regY;
                this.stage.addChild(bitmap);
                Tween.get(bitmap, {
                    loop: true
                })
                .to({
                    rotation: 360
                },
                config.durationExplode,
                Ease.linear
                );
            }
            this.stage.update();
        };

        this.queue = new LoadQueue(true);
        this.queue.addEventListener("complete", this.onLoadQueueComplete);
        this.queue.loadManifest(config.manifest, true);
    }

    componentDidMount() {
        const canvas = ReactDOM.findDOMNode(this.refs.canvas);
        this.stage = new Stage(canvas);
        Ticker.addEventListener('tick', this.stage);
        Ticker.setFPS(config.tickFPS);

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