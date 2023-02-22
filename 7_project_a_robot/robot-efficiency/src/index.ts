import { robotFn, VillageState, roadGraph, Graph, Parcel, findRoute } from "./../../robot/src/index";

type pathObj = {
    path: string[],
    shouldPickUp: boolean
};

// modified version of lazyRobot from exercise solution
export const myRobot: robotFn = (state: VillageState, memory: string[] = []) => {
    if (memory.length > 0) return {
        direction: memory[0],
        memory: memory.slice(1)
    }
    const { place, parcels } = state;
    const paths = getPaths(parcels, place);
    const chosenPath = getNextPath(paths);
    return {
        direction: chosenPath[0],
        memory: chosenPath.slice(1)
    }
}

function getPaths(parcels: Parcel[], robotPosition: string): pathObj[] {
    return parcels.map((parcel) => {
        return (parcel.place === robotPosition) ?
            {
                path: findRoute(roadGraph, robotPosition, parcel.address),
                shouldPickUp: false
            } :
            {
                path: findRoute(roadGraph, robotPosition, parcel.place),
                shouldPickUp: true
            }
    });
}

function getNextPath(paths: pathObj[]): string[] {
    const { path } = paths.reduce((a, b) => {
        const { path: aPath, shouldPickUp: aShouldPickUp } = a;
        const { path: bPath, shouldPickUp: bShouldPickUp } = b;
        return getPathPriority(aPath, aShouldPickUp) > getPathPriority(bPath, bShouldPickUp) ? a : b
    })
    return path;
}

function getPathPriority(path: string[], pickUp: boolean): number {
    return (pickUp ? 1 : 0) - path.length;
}

// finds longer paths than findRoute()'s BFS algorithm somehow?
function shortestPathBFS(graph: Graph, start: string, end: string): string[] {
    const visited = new Set<string>();
    const queue: [string, string[]][] = [[start, []]];
    while (queue.length > 0) {
        const [node, path] = queue.shift()!;
        if (node === end) return [...path, end];
        if (visited.has(node)) continue;
        visited.add(node);
        for (const neighbor of graph[node]) {
            if (visited.has(neighbor)) continue;
            queue.push([neighbor, [...path, node]]);
        }
    }
    return [];
}

type routeObj = {
    route: string[],
    pickUp: boolean
}

export const lazyRobot: robotFn | any = ({ place, parcels }: VillageState, memory: string[]) => {
    let route = memory;
    if (route.length == 0) {
        // Describe a route for every parcel
        let routes = parcels.map(parcel => {
            if (parcel.place != place) {
                return {
                    route: findRoute(roadGraph, place, parcel.place),
                    pickUp: true
                };
            } else {
                return {
                    route: findRoute(roadGraph, place, parcel.address),
                    pickUp: false
                };
            }
        });
        route = routes.reduce((a, b) => score(a) > score(b) ? a : b).route;
    }

    return { direction: route[0], memory: route.slice(1) };
}

// This determines the precedence a route gets when choosing.
// Route length counts negatively, routes that pick up a package
// get a small bonus.
function score({ route, pickUp }: routeObj) {
    return (pickUp ? 0.5 : 0) - route.length;
}