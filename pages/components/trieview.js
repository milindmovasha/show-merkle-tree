import React from "react"
import appstyles from "../../styles/styles.module.css"
import { RLP } from "@ethereumjs/rlp"
import Tree from "react-d3-tree"

const textLayout = {
    vertical: {
        title: {
            textAnchor: "start",
            x: 26,
            y: 5,
        },
        attributes: {},
        attribute: {
            x: 40,
            dy: "1.2em",
        },
    },
    horizontal: {
        title: {
            textAnchor: "start",
            y: 40,
        },
        attributes: {
            x: 0,
            y: 40,
        },
        attribute: {
            x: 0,
            dy: "1.2em",
        },
    },
}

function renderNode(rd3tProps, onNodeClick) {
    return (
        <PureSvgNodeElement
            nodeDatum={rd3tProps.nodeDatum}
            orientation={"vertical"}
            toggleNode={async () => {
                await rd3tProps.toggleNode()
                await onNodeClick(rd3tProps)
            }}
        />
    )
}

const PureSvgNodeElement = ({ nodeDatum, orientation, toggleNode }) => {
    var nodeCircle =
        nodeDatum.name === "Empty" ? (
            <div></div>
        ) : (
            <circle id={nodeDatum.name} r={18} onClick={toggleNode}></circle>
        )
    return (
        <>
            {nodeCircle}
            <g className={appstyles.card} onClick={() => {}}>
                <text
                    className={appstyles.node__text}
                    {...textLayout[orientation].title}
                    onClick={() => {}}
                >
                    {nodeDatum.name}
                </text>
                <text className="rd3t-label__attributes" {...textLayout[orientation].attributes}>
                    {nodeDatum.attributes &&
                        Object.entries(nodeDatum.attributes).map(([labelKey, labelValue], i) => (
                            <tspan key={`${labelKey}-${i}`} {...textLayout[orientation].attribute}>
                                {labelKey}: {labelValue}
                            </tspan>
                        ))}
                </text>
            </g>
        </>
    )
}

class TrieView extends React.Component {
    constructor(props) {
        super(props)
        this.getDynamicPathClass = this.getDynamicPathClass.bind(this)
        this.processNodeClick = this.processNodeClick.bind(this)
        this.processTransactionClick = this.processTransactionClick.bind(this)
        this.simulateNodeClick = this.simulateNodeClick.bind(this)
        this.setContainer = this.setContainer.bind(this)
        this.state = {}
    }

    setContainer(tc) {
        this.treeContainer = tc
    }

    componentDidMount() {
        if (this.mounted) return
        this.mounted = true
        //console.log("TrieView mounted")
        if (this.treeContainer) {
            const dimensions = this.treeContainer.getBoundingClientRect()
            this.setState({
                translate: {
                    x: dimensions.width / 2,
                    y: dimensions.height / 10,
                },
            })
        }

        var jsonNode = this.props.trieJson
        var nodesToClick = []
        while (jsonNode) {
            nodesToClick.push(jsonNode.name)
            //console.log("Will click:" + jsonNode.name)
            var childs = jsonNode.children
            var index = childs ? Math.floor(childs.length / 2) : 0
            if (childs && childs[index].name === "Empty") {
                while (childs[index].name === "Empty") {
                    index--
                    if (index < 0) break
                }
                //If we do not find the node in lower half part try upper half
                if (index < 0) {
                    index = childs ? Math.floor(childs.length / 2) : 0
                    while (childs[index].name === "Empty") {
                        index++
                        if (index >= childs.length) {
                            index = 0
                            break
                        }
                    }
                }
            }
            //console.log("Searching child at index:" + index)
            if (childs && childs[index]) jsonNode = childs[index]
            else jsonNode = null
        }
        this.nodesToClick = nodesToClick
        this.simulateNodeClick()
    }

    sleepFor(ms) {
        return new Promise((resolve) => {
            setTimeout(resolve, ms)
        })
    }

    async simulateNodeClick() {
        var nodesToClick = this.nodesToClick
        if (!nodesToClick || nodesToClick.length == 0) {
            await this.sleepFor(500)
            var nodeViewElement = document.getElementById("treeContainer")
            if (nodeViewElement) {
                //console.log("scrolling....")
                nodeViewElement.scrollIntoView({ behavior: "smooth", block: "start" })
            }
            return
        }
        //console.log("simulateNodeClick:" + nodesToClick.length)
        var nodeName = nodesToClick[0]
        var remainingNodes = []
        for (var i = 1; i < nodesToClick.length; i++) remainingNodes.push(nodesToClick[i])
        //console.log("remaining nodes:" + nodesToClick.length)
        //await this.sleepFor(1000)
        this.nodesToClick = remainingNodes
        var element = document.getElementById(nodeName)
        if (element) {
            console.log("Simulating click for id:" + nodeName)
            // Create a synthetic click MouseEvent
            let evt = new MouseEvent("click", {
                bubbles: true,
                cancelable: true,
                view: window,
            })
            // Send the event to the checkbox element
            element.dispatchEvent(evt)
        } else {
            console.log("id:" + nodeName + " not found")
        }
    }

    getDynamicPathClass(linkData, orientation) {
        if (this.state.clickedX) {
            for (var i = 0; i < this.state.clickedX.length; i++) {
                //console.log("getDynamicPathClass clickedX:", this.state.clickedX[i])
                //console.log("getDynamicPathClass clickedY:", this.state.clickedY[i])
                //console.log("getDynamicPathClass link x:", linkData.target.x)
                //console.log("getDynamicPathClass link y:", linkData.target.y)
                if (
                    this.state.clickedX[i] == linkData.target.x &&
                    this.state.clickedY[i] == linkData.target.y
                ) {
                    return "node__linkselected"
                }
            }
        }
        // Style it as a link connecting two branch nodes by default.
        return "node__link"
    }

    async processNodeClick(props) {
        //console.log("processNodeClick", props)
        var clickedX = []
        var clickedY = []
        var node = props.hierarchyPointNode
        while (node) {
            clickedX.push(node.x)
            clickedY.push(node.y)
            node = node.parent
        }
        this.setState({
            clickedX: clickedX,
            clickedY: clickedY,
        })

        //console.log("onNodeClick clickedX", clickedX)
        //console.log("onNodeClick clickedY", clickedY)

        var jsonNodeData = props.hierarchyPointNode.data
        if (jsonNodeData.name) {
            console.log("onNodeClick clicked Node:", jsonNodeData.name)

            var name = jsonNodeData.name.replace("Root-", "")
            var fields = name.split("-")
            if (fields.length == 2 && (fields[0] == "LN" || fields[0] == "EN")) {
                var tid = parseInt(fields[1])
                var tidrlp = RLP.encode(tid)
                console.log("clickedTid:" + tid)
                if (this.props.trie) {
                    var jsonNode = props.hierarchyPointNode
                    await this.processTransactionClick(tidrlp, jsonNode, tid)
                }
            } else {
                if (fields.length == 3 && fields[0] == "BN") {
                    var tid = parseInt(fields[2])
                    var tidrlp = RLP.encode(tid)
                    console.log("clickedTid:" + tid)
                    if (this.props.trie) {
                        var jsonNode = props.hierarchyPointNode
                        await this.processTransactionClick(tidrlp, jsonNode, tid)
                    }
                } else {
                    this.props.setClickedPath(null, [], 0)
                }
            }
        } else {
            console.log("onNodeClick clicked Node: has no name")
            this.props.setClickedPath(null, [], 0)
        }
        await this.simulateNodeClick()
    }

    async processTransactionClick(tidrlp, jsonNode, tid) {
        try {
            //console.log("processTransactionClick")

            var { trieNode, remaining, stack } = await this.props.trie.findPath(tidrlp)
            var nodeNames = [{ name: jsonNode.data.name, childnames: [] }]
            jsonNode = jsonNode.parent
            while (jsonNode) {
                var childs = jsonNode.children
                if (!childs) childs = []
                var childnames = []
                for (var i = 0; i < childs.length; i++) childnames.push(childs[i].data.name)
                nodeNames.push({
                    name: jsonNode.data.name,
                    childnames: childnames,
                })
                jsonNode = jsonNode.parent
            }
            this.props.setProgress(true)
            this.props.setMessage("Calculating path")
            await this.sleepFor(1000)
            var message =
                "Click on the tree nodes to show a different path. Path details will be shown when you click on the leaf node. Scroll below to see details of each node in the path."
            this.props.setMessage(message)
            this.props.setProgress(false)
            this.props.setClickedPath(
                {
                    trieNode,
                    remaining,
                    stack,
                },
                nodeNames,
                tid
            )
        } catch (e) {
            console.log("error:" + e)
        }
    }

    render() {
        //console.log("TrieView props")
        //console.log(this.props.trieJson)
        var childDiv = <div></div>

        if (this.props.trieJson) {
            childDiv = (
                <Tree
                    data={this.props.trieJson}
                    orientation="vertical"
                    shouldCollapseNeighborNodes="true"
                    initialDepth="0"
                    centeringTransitionDuration="800"
                    translate={this.state.translate}
                    rootNodeClassName={appstyles.node__root}
                    branchNodeClassName={appstyles.node__branch}
                    leafNodeClassName={appstyles.node__leaf}
                    pathClassFunc={this.getDynamicPathClass}
                    renderCustomNodeElement={(rd3tProps) =>
                        renderNode({ ...rd3tProps }, this.processNodeClick)
                    }
                />
            )
        }

        return (
            <div
                className={appstyles.trietreeview}
                id="treeWrapper"
                style={{
                    width: "100%",
                    height: "22em",
                }}
                ref={(tc) => this.setContainer(tc)}
            >
                {childDiv}
            </div>
        )
    }
}

export default TrieView
