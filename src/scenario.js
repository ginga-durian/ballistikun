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

    generate() {
        let candidates = without(this.members, this.playerId);
        const [first, second] = sample(candidates, 2);
        candidates = without(candidates, first, second);

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