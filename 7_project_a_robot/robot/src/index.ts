const roads = [
    "Alice's House-Bob's House", "Alice's House-Cabin",
    "Alice's House-Post Office", "Bob's House-Town Hall",
    "Daria's House-Ernie's House", "Daria's House-Town Hall",
    "Ernie's House-Grete's House", "Grete's House-Farm",
    "Grete's House-Shop", "Marketplace-Farm",
    "Marketplace-Post Office", "Marketplace-Shop",
    "Marketplace-Town Hall", "Shop-Town Hall"
];

// TYPES and INTERFACES
type Graph = { [key: string]: string[] };
type Parcel = {
    place: string,
    address: string
};
type Work = {
    at: string,
    route: string[]
}
type robotFn = (state: VillageState, memory: string[] | undefined) => {
    direction: string,
    memory: string[] | undefined
};

function buildGraph(edges: string[]): Graph {
    let graph: Graph = Object.create(null);
    function addEdge(from: string, to: string) {
        if (graph[from] == null) {
            graph[from] = [to];
        } else {
            graph[from].push(to);
        }
    }
    for (let [from, to] of edges.map(r => r.split("-"))) {
        addEdge(from, to);
        addEdge(to, from);
    }
    return graph;
}

const roadGraph = buildGraph(roads);

class VillageState {
    place: string;
    parcels: Parcel[];

    constructor(place: string, parcels: Parcel[]) {
        this.place = place;
        this.parcels = parcels;
    }

    move(destination: string): VillageState {
        if (!roadGraph[this.place].includes(destination)) return this;
        let parcels = this.parcels.map(p => {
            if (p.place != this.place) return p;
            return {
                place: destination,
                address: p.address
            };
        }).filter(p => p.place != p.address);
        return new VillageState(destination, parcels);
    }

    static random(parcelCount = 5) {
        let parcels: Parcel[] = [];
        for (let i = 0; i < parcelCount; i++) {
            let address = randomPick(Object.keys(roadGraph));
            let place;
            do {
                place = randomPick(Object.keys(roadGraph));
            } while (place == address);
            parcels.push({ place, address });
        }
        return new VillageState("Post Office", parcels);
    };
}

function runRobot(state: VillageState, robot: robotFn, memory: string[] | undefined) {
    for (let turn = 0; ; turn++) {
        if (state.parcels.length == 0) {
            console.log(`Done in ${turn} turns`);
            break;
        }
        const action = robot(state, memory);
        state = state.move(action.direction);
        memory = action.memory;
        console.log(`Moved to ${action.direction}`);
    }
}

function randomPick(array: string[]) {
    let choice = Math.floor(Math.random() * array.length);
    return array[choice];
}

const randomRobot: robotFn = (state: VillageState, memory = undefined) => {
    return {
        direction: randomPick(roadGraph[state.place]),
        memory
    };
}

const mailRoute = [
    "Alice's House", "Cabin", "Alice's House", "Bob's House",
    "Town Hall", "Daria's House", "Ernie's House",
    "Grete's House", "Shop", "Grete's House", "Farm",
    "Marketplace", "Post Office"
];

const routeRobot: robotFn = (state: VillageState, memory: string[] | undefined) => {
    if (memory && memory.length == 0) {
        memory = mailRoute;
    }
    return {
        direction: memory ? memory[0] : "",
        memory: memory ? memory.slice(1) : undefined
    };
}

function findRoute(graph: Graph, from: string, to: string) {
    let work: Work[] = [{ at: from, route: [] }];
    for (let i = 0; i < work.length; i++) {
        let { at, route } = work[i];
        for (let place of graph[at]) {
            if (place == to) return route.concat(place);
            if (!work.some(w => w.at == place)) {
                work.push({ at: place, route: route.concat(place) });
            }
        }
    }
    // should never return here if graph is connected but it's here to stop the TS static analysis errors lol
    return work[0].route;
}

const goalOrientedRobot = ({ place, parcels }: VillageState, memory: string[]): robotFn | any => {
    if (memory.length == 0) {
        let parcel = parcels[0];
        if (parcel.place != place) {
            memory = findRoute(roadGraph, place, parcel.place);
        } else {
            memory = findRoute(roadGraph, place, parcel.address);
        }
    }
    return {
        direction: memory[0],
        memory: memory.slice(1)
    };
}

export {
    robotFn,
    routeRobot,
    randomRobot,
    goalOrientedRobot,
    VillageState,
    roadGraph,
    findRoute,
    Graph,
    Parcel
}