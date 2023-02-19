export {};
import "jest";
import { compareRobots } from "./index";
import { routeRobot, goalOrientedRobot } from "./../../robot/src/index";

describe('compareRobots()', () => {
    it('exists', () => {
        expect(compareRobots).toBeDefined();
    })
    it('returns the result of comparing routeRobot and goalOrientedRobot', () => {
        const res = compareRobots(routeRobot, [], goalOrientedRobot, []);
        const { robot1AverageStepsPerTask, robot2AverageStepsPerTask } = res;
        expect(typeof robot1AverageStepsPerTask).toStrictEqual("number");
        expect(typeof robot2AverageStepsPerTask).toStrictEqual("number");
        console.log(`routeRobot average steps per task = ${robot1AverageStepsPerTask}`);
        console.log(`goalOrientedRobot average steps per task = ${robot2AverageStepsPerTask}`);
    })
})