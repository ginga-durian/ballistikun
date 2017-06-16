import {
    first
} from 'underscore';
import config from 'config.js';

export default class Solver {
    constructor() {

    }

    setScenario(scenario) {
        this.scenario = scenario
    }

    getAnswer() {
        const memberInfo = (target) => {
            const id = target;
            const detail = config.members.filter((element) =>
                element.id == id);
            return ({
                id: id,
                group: first(detail).group,
                priority: first(detail).priority,
            });
        };
        const firstTarget = memberInfo(this.scenario.firstTarget);
        const secondTarget = memberInfo(this.scenario.secondTarget);
        const player = memberInfo(this.scenario.player);
        const candidates = this.scenario.candidates.map(
            (element) => memberInfo(element)
        );
        const isFirstCircleLarge = this.scenario.firstCircle.isLarge;
        const isSecondCircleLarge = this.scenario.secondCircle.isLarge;
        const shouldSwap = firstTarget.priority > secondTarget.priority;
        console.log('1st target', firstTarget.id);
        console.log('2nd target', secondTarget.id);
        console.log('player', player.id);
        console.log('swap?', shouldSwap);

        const answer = (() => {
            const higherTarget = shouldSwap ? secondTarget : firstTarget;
            const lowerTarget = shouldSwap ? firstTarget : secondTarget;
            const isHigherCircleLarge = shouldSwap ?
                isSecondCircleLarge : isFirstCircleLarge;
            const isLowerCircleLarge = shouldSwap ?
                isFirstCircleLarge : isSecondCircleLarge;

            const temp = (() => {
                if ((higherTarget.group == 1) &&
                    (lowerTarget.group == 1)) {
                    console.log('A-A');
                    return ({
                        'a1': 1,
                        'a2': isHigherCircleLarge || (higherTarget.id == 'a1') ? 1 : 0,
                        'a3': isHigherCircleLarge ||
                            ((higherTarget.id == 'a1') &&
                                (lowerTarget.id == 'a2')) ? 1 : 0,
                        'a4': isHigherCircleLarge ? 1 : 0,
                        'b1': 2,
                        'b2': isLowerCircleLarge ? 2 : 0,
                        'b3': 0,
                        'b4': 0,
                    });
                } else if ((higherTarget.group == 2) &&
                    (lowerTarget.group == 2)) {
                    console.log('B-B');
                    return ({
                        'a1': 1,
                        'a2': isHigherCircleLarge ? 1 : 0,
                        'a3': 2,
                        'a4': isLowerCircleLarge ? 2 : 0,
                        'b1': 0,
                        'b2': 0,
                        'b3': 0,
                        'b4': 0,
                    });
                } else {
                    console.log('A-B');
                    return ({
                        'a1': 1,
                        'a2': (higherTarget.id == 'a1') || isHigherCircleLarge ? 1 : 0,
                        'a3': (higherTarget.id == 'a1' || higherTarget.id == 'a2') &&
                            isHigherCircleLarge ? 1 : 0,
                        'a4': 0,
                        'b1': 2,
                        'b2': (lowerTarget.id == 'b2') || isLowerCircleLarge ? 2 : 0,
                        'b3': (lowerTarget.id == 'b1' || lowerTarget.id == 'b2') &&
                            isLowerCircleLarge ? 2 : 0,
                        'b4': 0,
                    });
                }
            })();
            temp[higherTarget.id] = 1;
            temp[lowerTarget.id] = 2;
            return temp;
        })();
        return answer;
    }
}