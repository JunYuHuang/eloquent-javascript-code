export { };
import "jest";
import { myRobot, lazyRobot } from "./index";
import { goalOrientedRobot } from "../../robot/src";
import { compareRobots } from "../../measuring-a-robot/src";

describe('myRobot()', () => {
    it('exists', () => {
        expect(myRobot).toBeDefined();
    })
    it('should be faster on average than goalOrientedRobot when benchmark tested using compareRobots()', () => {
        const res = compareRobots(myRobot, [], goalOrientedRobot, []);
        const { robot1AverageStepsPerTask, robot2AverageStepsPerTask } = res;
        console.log(`myRobot: ${robot1AverageStepsPerTask}`);
        console.log(`goalOrientedRobot: ${robot2AverageStepsPerTask}`);
        expect(robot1AverageStepsPerTask < robot2AverageStepsPerTask).toStrictEqual(true);
    })
})

describe('lazyRobot()', () => {
    it('exists', () => {
        expect(lazyRobot).toBeDefined();
    })
    it('should be faster on average than goalOrientedRobot when benchmark tested using compareRobots()', () => {
        const res = compareRobots(lazyRobot, [], goalOrientedRobot, []);
        const { robot1AverageStepsPerTask, robot2AverageStepsPerTask } = res;
        console.log(`lazyRobot: ${robot1AverageStepsPerTask}`);
        console.log(`goalOrientedRobot: ${robot2AverageStepsPerTask}`);
        expect(robot1AverageStepsPerTask < robot2AverageStepsPerTask).toStrictEqual(true);
    })
})