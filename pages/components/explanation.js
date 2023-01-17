import React from "react"
import styles from "../../styles/Home.module.css"
import appstyles from "../../styles/styles.module.css"
import { ExtensionNode, LeafNode } from "@ethereumjs/trie"
import { RLP } from "@ethereumjs/rlp"
import { bufferToHex } from "@ethereumjs/util"
import { bufferToNibbles, nibblesToBuffer } from "../../utils/nibbles"

class Expaination extends React.Component {
    getListKey() {
        this.listIndex++
        var key = "Expaination-List-" + this.listIndex
        return key
    }
    render() {
        var details = []
        var childDiv = <div></div>
        this.listIndex = 0
        if (!this.props.block || !this.props.trie) return childDiv
        if (this.props.clickedPathData) {
            var { _, _, stack } = this.props.clickedPathData
            var length = stack.length

            var tid = this.props.clickedTid
            //console.log("Clicked TID: " + tid)
            var pathNibbles = bufferToNibbles(RLP.encode(tid))
            var nibbles = 0
            var li
            li = (
                <li key={this.getListKey()}>
                    Our lookup path is for Transaction Id:{tid}. RLP(Transaction Id):
                    {bufferToHex(nibblesToBuffer(pathNibbles))}.
                </li>
            )
            details.push(li)
            for (var i = 0; i < length; i++) {
                var stacknode = stack[i]
                var nodeKey = []
                if (stacknode instanceof LeafNode || stacknode instanceof ExtensionNode)
                    nodeKey = stacknode.key()
                //console.log("Key:" + nodeKey)
                var name = this.props.clickedNames[length - i - 1].name
                var curNibble
                if (name.includes("Root"))
                    li = (
                        <li key={this.getListKey()}>
                            We perform lookup in the database using block.transactionsRoot:
                            {this.props.block.transactionsRoot} to get the root node {name}.
                        </li>
                    )
                else
                    li = (
                        <li key={this.getListKey()}>
                            We perform lookup in the database using key to get the node {name}.
                        </li>
                    )

                details.push(li)
                if (name.includes("BN")) {
                    curNibble = pathNibbles[nibbles++]
                    var branch = stacknode._branches[curNibble]
                    if (nibbles == pathNibbles.length + 1) {
                        li = (
                            <li key={this.getListKey()}>
                                Our lookup path terminates at branch node {name}. We use value field
                                from this node to get the transaction details.
                            </li>
                        )
                    } else {
                        li = (
                            <li key={this.getListKey()}>
                                We use nibble: 0x{curNibble.toString(16)} from RLP(Transaction Id)
                                as index in the branches of this node to get key:
                                {bufferToHex(branch)} for the next node
                            </li>
                        )
                    }
                    details.push(li)
                }

                if (name.includes("EN")) {
                    var matchingNibbles = ""
                    for (var k = 0; k < nodeKey.length; k++) {
                        curNibble = pathNibbles[nibbles]
                        matchingNibbles += curNibble.toString(16)
                        nibbles++
                    }
                    var branch = stacknode._value
                    li = (
                        <li key={this.getListKey()}>
                            The node {name} is an extension node. The nibbles matched from lookup
                            path are 0x
                            {matchingNibbles}. The value field of this node is used to get key:
                            {bufferToHex(branch)} for the next node
                        </li>
                    )
                    details.push(li)
                }

                if (name.includes("LN")) {
                    var matchingNibbles = ""
                    for (var k = 0; k < nodeKey.length; k++) {
                        if (nibbles < pathNibbles.length) {
                            curNibble = pathNibbles[nibbles]
                            matchingNibbles += curNibble.toString(16)
                            nibbles++
                        }
                    }
                    var message = ""
                    if (nodeKey.length > 0) {
                        message = "Nibbles matching the lookup path are 0x" + matchingNibbles
                    }
                    li = (
                        <li key={this.getListKey()}>
                            The node {name} is the leaf node which contains the transaction we are
                            looking for. {message}
                        </li>
                    )
                    details.push(li)
                }
            }
            var pathParagraph =
                !this.props.clickedPathData || this.props.clickedPathData.length == 0 ? (
                    <p>
                        Please select click nodes in the above tree till you reach a leaf node to
                        see explaination for specific path
                    </p>
                ) : (
                    <div className={appstyles.explain}>
                        <ul>{details}</ul>
                    </div>
                )
            childDiv = (
                <div className={styles.card}>
                    <h2>Explaination</h2>
                    <p>
                        The tree consists of database with (key,value) pairs where key is the hash
                        of the node and value represents the node structure stored in RLP format. We
                        can find a trasaction in this tree by following a path using the nibbles in
                        RLP(transaction id).
                    </p>
                    {pathParagraph}
                    <h2>Reference</h2>
                    <p>
                        <a href="https://ethereum.org/en/developers/docs/data-structures-and-encoding/">
                            Ethereum Data Structures and Encoding
                        </a>
                    </p>
                </div>
            )
        }

        return childDiv
    }
}

export default Expaination
