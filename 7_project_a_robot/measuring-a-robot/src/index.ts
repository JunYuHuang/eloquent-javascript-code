import { robotFn, VillageState } from "./../../robot/src/index";

export function compareRobots(robot1: robotFn | any, memory1: string[] | undefined, robot2: robotFn | any, memory2: string[] | undefined) {
    const tasksCount = 100;
    let total1 = 0, total2 = 0;
    for (let i = 0; i < tasksCount; i++) {
        let state = VillageState.random();
        total1 += countSteps(state, robot1, memory1);
        total2 += countSteps(state, robot2, memory2);
    }
    return {
        robot1AverageStepsPerTask: total1 / tasksCount,
        robot2AverageStepsPerTask: total2 / tasksCount
    };
}

function countSteps(state: VillageState, robot: robotFn, memory: string[] | undefined) {
    let steps = 0;
    while (true) {
        if (state.parcels.length == 0) break;
        const action = robot(state, memory);
        state = state.move(action.direction);
        memory = action.memory;
        steps++;
    }
    return steps;
}