import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Bitmap, Ease, Shape, Stage, Ticker} from 'EaselJS';
import {Tween} from 'TweenJS';
import {LoadQueue} from 'PreloadJS';
import {keys, pick, sample, zip} from 'underscore';

import config from 'config.js';

export default class Canvas extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            playerX: 0,
            playerY: 0,
            selectedCircle: null,
            stage: new Stage(),
        };

        this.onLoadQueueComplete = () => {
           for (const p of config.circles) {
               const area = new Shape();
               area.name = p.id;
               area.graphics.beginFill("yellow").drawCircle(p.x, p.y, config.radius);
               area.x = p.x;
               area.y = p.y;
               area.regX = p.x;
               area.regY = p.y;
               area.addEventListener("click", (event) => this._updatePlayer(event));
               this.state.stage.addChild(area);


               for (const c of [p.outer, p.inner]) {
                   const image = this.queue.getResult(c.imageId);
                   const bitmap = new Bitmap(image);
                   bitmap.name = c.id;
                   bitmap.x = p.x;
                   bitmap.y = p.y;
                   bitmap.regX = p.regX;
                   bitmap.regY = p.regY;

                   this.state.stage.addChild(bitmap);
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
               bitmap.visible = true;

               this.state.stage.addChild(bitmap);
           }

           this.state.stage.update();
           this._initCircles();
           this._initMembers();
        };

        this.queue = new LoadQueue(true);
        this.queue.addEventListener("complete", this.onLoadQueueComplete);
        this.queue.loadManifest(config.manifest, true);

        this._allocateMembers = this._allocateMembers.bind(this);
    }

    componentWillMount() {
        this.setState({
            scenario: this.props.scenario,
            answer: this.props.answer,
        });
    }

    componentDidMount() {
        const canvas = ReactDOM.findDOMNode(this.refs.canvas);
        this.state.stage.enableDOMEvents(false);
        this.state.stage.canvas = canvas;
        this.state.stage.enableDOMEvents(true);

        // add tick event
        Ticker.addEventListener('tick', this.state.stage);
        Ticker.setFPS(config.tickFPS);

        this.state.stage.update();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            scenario: this.props.scenario,
            answer: this.props.answer,
        });
        if ((nextProps.play == true) && (this.props.play == false)) {
            this.setState({
                playerX: 0,
                playerY: 0,
                selectedCircle: null,
            });
            this.play();
        }
    }

    _initCircles() {
        const circleZip = zip(
            config.circles,
            this.state.scenario.circles
        );

        for (const [p, s] of circleZip) {
            const area = this.state.stage.getChildByName(p.id);
            const scale = s.isLarge ?
                config.scaleLargeCircle : config.scaleSmallCircle;
            area.scaleX = scale;
            area.scaleY = scale;

            for (const c of [p.outer, p.inner]) {
                const bitmap = this.state.stage.getChildByName(c.id);
                const scale = s.isLarge ?
                    config.scaleLargeCircle : config.scaleSmallCircle;

                bitmap.scaleX = scale;
                bitmap.scaleY = scale;
            }
        }
    }

    _initMembers() {
        for (const [i, v] of config.members.entries()) {
            const bitmap = this.state.stage.getChildByName(v.id);
            bitmap.x = 400;
            bitmap.y = i * 42 + 30;
        }
    }

    _allocateMembers() {
        const randomPosition = (ox, oy, r) => {
            const c = Math.pow(r, 2);
            const x = (Math.random() * (r * 2 + 1)) - r;
            const b = c - Math.pow(x, 2);
            const max = Math.sqrt(b);
            const y = (Math.random() * (max * 2)) - max;
            return [x + ox, y + oy];
        }

        for (const v of this.state.scenario.candidates) {
            const group = this.state.answer[v];

            if (group != null) {
                const cx = config.circles[group - 1].x;
                const cy = config.circles[group - 1].y;
                const r = this.state.scenario.circles[group - 1].isLarge ?
                    config.radius : config.radius * config.scaleSmallCircle;
                const [x, y] = randomPosition(cx, cy, r);

                const bitmap = this.state.stage.getChildByName(v);
                bitmap.x = x;
                bitmap.y = y;
            }
        }
    }

    _checkAnswer() {
        const player = this.state.scenario.player;
        const playerAnswer = this.state.answer[player];
        let sel = this.state.selectedCircle;
        if (sel != null) {
            sel = config.circles.map((element) => element.id == sel);
            sel = sel.findIndex((element) => element);
        }

        console.log('check', player, playerAnswer, sel);
        if (playerAnswer == sel) {
            console.log('correct');
        } else {
            console.log('wrong');
            const blowAway = (v) => {
                const bitmap = this.state.stage.getChildByName(v);
                Tween.get(bitmap)
                    .to({
                        y: 0
                    }, 400)
                    .wait(1000)
                    .to({
                        y: 600
                    }, 400);
            };
            let victim = pick(this.state.answer,
                (val, key) => val == playerAnswer);
            victim = keys(victim);
            if (sel == null) {
                victim = victim.filter((element) => element != player);
            }
            console.log('victim', victim);

            victim.map((element) => blowAway(element));
        }
    }

    _updatePlayer(event) {
        this.setState({
            playerX: event.stageX,
            playerY: event.stageY,
            selectedCircle: event.currentTarget.name,
        });
        const player = this.state.stage.getChildByName(this.state.scenario.player);
        player.x = event.stageX;
        player.y = event.stageY;
        player.visible = true;
        this.state.stage.update();
    }

    play() {
        this._initMembers();
        this._initCircles();
        for (const p of config.circles) {
            for (const c of [p.outer, p.inner]) {
                const bitmap = this.state.stage.getChildByName(c.id);
                Tween.get(bitmap, {
                        loop: true,
                        override: true,
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

        for (const p of this.state.scenario.positions) {
            const bitmap = this.state.stage.getChildByName(p.id);
            bitmap.x = p.x;
            bitmap.y = p.y;
            bitmap.visible = true;
        }

        setTimeout(() => {
            this._allocateMembers();
            this._checkAnswer();
        },
        config.durationExplode);
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