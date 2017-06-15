import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Bitmap, Ease, Stage, Ticker} from 'EaselJS';
import {Tween} from 'TweenJS';
import {LoadQueue} from 'PreloadJS';
import {sample} from 'underscore';

import config from 'config.js';

export default class Canvas extends Component {
    constructor(props, context) {
        super(props, context);
        
        this.onLoadQueueComplete = () => {
            for (const p of config.circles) {
                for (const c of [p.outer, p.inner]) {
                    const image = this.queue.getResult(c.imageId);
                    const bitmap = new Bitmap(image);
                    bitmap.name = c.id;
                    bitmap.x = p.x;
                    bitmap.y = p.y;
                    bitmap.regX = p.regX;
                    bitmap.regY = p.regY;

                    this.stage.addChild(bitmap);
                }
            }

            for (const m of config.members) {
                const image = this.queue.getResult(m.imageId);
                const bitmap = new Bitmap(image);
                bitmap.name = m.id;
                bitmap.x = 30;
                bitmap.y = 100;
                bitmap.regX = 20;
                bitmap.regY = 20;

                this.stage.addChild(bitmap);
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

    componentWillReceiveProps(nextProps) {
        if ((nextProps.isStop == false) &&
            (this.props.isStop == true)) {
                this.scenario = this.props.scenario;
                this.play();
                console.log(sample(config.members, 2));
            }
    }

    play() {
        for (const p of this.scenario.positions) {
            const bitmap = this.stage.getChildByName(p.id);
            bitmap.x = p.x;
            bitmap.y = p.y;
        }

        for (const p of config.circles) {
            for (const c of [p.outer, p.inner]) {
                const bitmap = this.stage.getChildByName(c.id);
                Tween.get(bitmap, {
                        loop: true
                    })
                    .to({
                            rotation: c.rotation
                        },
                        config.durationExplode,
                        Ease.linear
                    )
                    .pause();
                }
        }
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