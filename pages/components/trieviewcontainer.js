import React from "react"
import appstyles from "../../styles/styles.module.css"
import TrieView from "./trieview"
import NodeView from "./nodeview"
import { PropagateLoader } from "react-spinners"
import Expaination from "./explanation"
import { bufferToNibbles } from "../../utils/nibbles"
import { RLP } from "@ethereumjs/rlp"
import { ExtensionNode, LeafNode } from "@ethereumjs/trie"

class TrieViewContainer extends React.Component {
    constructor(props) {
        super(props)
        this.setClickedPath = this.setClickedPath.bind(this)
        this.setProgress = this.setProgress.bind(this)
        this.setMessage = this.setMessage.bind(this)
        this.state = {}
    }

    componentDidMount() {
        if (this.mounted) return
        this.mounted = true
        console.log("TrieViewContainer mounted")
        if (this.treeContainer) {
            const dimensions = this.treeContainer.getBoundingClientRect()
            this.setState({
                translate: {
                    x: dimensions.width / 2,
                    y: dimensions.height / 10,
                },
            })
        }
    }

    setClickedPath(path, names, tidrlp) {
        this.setState({
            clickedPathData: path,
            clickedNames: names,
            clickedTid: tidrlp,
        })
    }

    setMessage(message) {
        this.props.setMessage(message)
    }

    setProgress(showProgress) {
        this.props.setProgress(showProgress)
    }

    getListKey() {
        this.listIndex++
        var key = "Node-kEY-" + this.listIndex
        return key
    }

    render() {
        var childDiv = <div></div>
        this.listIndex = 0

        if (!this.props.error && this.props.block && this.props.trie && this.props.trieJson) {
            childDiv = (
                <TrieView
                    trieJson={this.props.trieJson}
                    trie={this.props.trie}
                    block={this.props.block}
                    setClickedPath={this.setClickedPath}
                    setMessage={this.setMessage}
                    setProgress={this.setProgress}
                />
            )
        }

        var nodeViewDiv = <div></div>
        if (this.state.clickedPathData) {
            var { _, _, stack } = this.state.clickedPathData
            var pathNibbles = bufferToNibbles(RLP.encode(this.state.clickedTid))
            var nibbleIndex = 0
            var innerNodeViewDiv = []
            var length = stack.length
            for (var i = 0; i < length; i++) {
                var stacknode = stack[i]
                var nodeKeyLength = 1
                if (stacknode instanceof LeafNode || stacknode instanceof ExtensionNode)
                    nodeKeyLength = stacknode.key().length
                innerNodeViewDiv.push(
                    <NodeView
                        key={this.getListKey()}
                        names={this.state.clickedNames[length - i - 1]}
                        node={stacknode}
                        trie={this.props.trie}
                        block={this.props.block}
                        branchid={pathNibbles[nibbleIndex]}
                    ></NodeView>
                )
                nibbleIndex += nodeKeyLength
            }
        }
        nodeViewDiv = (
            <div className={appstyles.transactiongrid} id="nodeViewDiv">
                <Expaination
                    trie={this.props.trie}
                    clickedPathData={this.state.clickedPathData}
                    clickedNames={this.state.clickedNames}
                    clickedTid={this.state.clickedTid}
                    block={this.props.block}
                ></Expaination>
                {innerNodeViewDiv}
            </div>
        )
        var clipper = this.props.showProgress ? (
            <div className={appstyles.cliploaderparent}>
                <div className={appstyles.cliploader}>
                    <PropagateLoader
                        loading={this.props.showProgress}
                        size={20}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                </div>
            </div>
        ) : (
            <div></div>
        )

        if (this.props.showProgress) nodeViewDiv = <div id="nodeViewDiv"></div>

        var treeView = this.props.trie ? (
            <div
                className={appstyles.trietreeview}
                style={{
                    width: "100%",
                    height: "22em",
                }}
                ref={(tc) => (this.treeContainer = tc)}
            >
                {childDiv}
                {clipper}
            </div>
        ) : (
            <div
                className={appstyles.trietreeview}
                style={{
                    width: "100%",
                    height: "22em",
                }}
                ref={(tc) => (this.treeContainer = tc)}
            >
                {clipper}
            </div>
        )

        return (
            <div id="treeContainer" className={appstyles.trieview}>
                <div className={appstyles.tip}>
                    <p>{this.props.message}</p>
                </div>
                {treeView}
                {nodeViewDiv}
            </div>
        )
    }
}

export default TrieViewContainer
