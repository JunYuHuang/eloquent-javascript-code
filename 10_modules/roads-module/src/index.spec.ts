export { };
import "jest";
import { roadGraph as oldRoadGraph } from "../../../7_project_a_robot/robot/src"
import { deepEqual } from "../../../4_data_structures_objects_and_arrays/deep-comparison/src";
const { roadGraph } = require("./index");

describe('roadGraph object', () => {
    it('exists', () => {
        expect(roadGraph).toBeDefined();
    })
    it('has the same number of keys or nodes as oldRoadGraph', () => {
        expect(Object.keys(roadGraph).length).toStrictEqual(Object.keys(oldRoadGraph).length);
    })
    it('is a deep copy or clone of oldRoadGraph', () => {
        expect(deepEqual(roadGraph, oldRoadGraph)).toStrictEqual(true);
    })
})