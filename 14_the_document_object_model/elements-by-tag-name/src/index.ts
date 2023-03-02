export function byTagName(node: Node, tagName: string): Node[] {
    const res: Node[] = [];
    function helperDFS(currNode: Node) {
        if (currNode.nodeType === Node.ELEMENT_NODE) {
            if (currNode.nodeName.toLowerCase() === tagName.toLowerCase()) {
                res.push(currNode);
            }
            for (let i = 0; i < currNode.childNodes.length; i++) {
                helperDFS(currNode.childNodes[i]);
            }
        }
    }
    helperDFS(node);
    return res;
}