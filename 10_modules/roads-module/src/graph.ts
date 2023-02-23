type Graph = { [key: string]: string[] };

exports.buildGraph = function (edges: string[][]): Graph {
    let graph: Graph = Object.create(null);
    function addEdge(from: string, to: string) {
        if (graph[from] == null) {
            graph[from] = [to];
        } else {
            graph[from].push(to);
        }
    }
    for (let [start, end] of edges) {
        addEdge(start, end);
        addEdge(end, start);
    }
    return graph;
};