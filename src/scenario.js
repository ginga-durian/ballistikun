import {first, sample, without} from 'underscore';

export default class ScenarioGenerator {
    constructor(config) {
        this.firstTarget = {
            x: config.firstTarget.x,
            y: config.firstTarget.y,
        };
        this.secondTarget = {
            x: config.secondTarget.x,
            y: config.secondTarget.y,
        };
        this.members = config.members;
        this.playerId = config.playerId;
        this.radius = config.radius;
    }

    setTargets(targets) {
        this.targets = targets;
    }

    setPlayer(player) {
        this.playerId = player;
    }

    _getRandomPosition(ox, oy, r) {
        const c = Math.pow(r, 2);
        const x = (Math.random() * (r * 2 + 1)) - r;
        const b = c - Math.pow(x, 2);
        const max = Math.sqrt(b);
        const y = (Math.random() * (max * 2)) - max;
        return [x, y];
    }

    generate() {
        let candidates = without(this.members, this.playerId);
        const [first, second] = sample(candidates, 2);
        candidates = without(candidates, first, second);

        const positions = candidates.map((element) => {
            const [x, y] = this._getRandomPosition(150, 150, this.radius);
            return ({
                id: element,
                x: x,
                y: y,
            });
        });

        const [isFirstCircleLarge, isSecondCircleLarge] =
            sample([
                [true, true],
                [true, false],
                [false, true],
                [false, false]]);

        return ({
            player: this.playerId,
            firstTarget: first,
            secondTarget: second,
            candidates: candidates,
            positions: [{
                id: first,
                x: this.firstTarget.x,
                y: this.firstTarget.y,
            }, {
                id: second,
                x: this.secondTarget.x,
                y: this.secondTarget.y,
            }],
            circles: [
                {
                    isLarge: isFirstCircleLarge,
                },
                {
                    isLarge: isSecondCircleLarge,
                }
            ],
            firstCircle: {
                isLarge: isFirstCircleLarge,
            },
            secondCircle: {
                isLarge: isSecondCircleLarge,
            }
        });
    }
}