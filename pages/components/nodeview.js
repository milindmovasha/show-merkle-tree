import React from "react"
import styles from "../../styles/Home.module.css"
import { BranchNode, ExtensionNode, LeafNode } from "@ethereumjs/trie"
import TransactionView from "./transactionview"
import { keccak256 } from "ethereum-cryptography/keccak"
import { bufferToHex } from "@ethereumjs/util"
import { nibblesToBuffer } from "../../utils/nibbles"
import {
    TransactionFactory,
    Transaction,
    FeeMarketEIP1559Transaction,
    AccessListEIP2930Transaction,
} from "@ethereumjs/tx"

class NodeView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    getListKey() {
        this.listIndex++
        var key = "NodeView-Key-" + this.listIndex
        return key
    }

    render() {
        var childDiv = <div></div>
        this.listIndex = 0
        if (this.props.node && this.props.trie) {
            var node = this.props.node

            var blockHashDiv = <div></div>
            if (this.props.block && this.props.names.name.includes("Root-")) {
                blockHashDiv = (
                    <div>
                        <h4>Block transactionRoot:</h4>
                        <p className="node__linkselected">{this.props.block.transactionsRoot}</p>
                    </div>
                )
            }

            if (node instanceof LeafNode) {
                var tx = TransactionFactory.fromSerializedData(node._value)
                var type = 0
                if (tx instanceof Transaction) type = 0
                if (tx instanceof AccessListEIP2930Transaction) type = 1
                if (tx instanceof FeeMarketEIP1559Transaction) type = 2
                var transaction = tx.toJSON()
                var keyNibbles = node.encodedKey()
                var hash = bufferToHex(keccak256(node.serialize()))
                var keyDetails = ""
                switch (keyNibbles[0]) {
                    case 0:
                        keyDetails = "Extension node, Even path length"
                        break
                    case 1:
                        keyDetails = "Extension node, Odd path length"
                        break
                    case 2:
                        keyDetails = "Terminating node, Even path length"
                        break
                    case 3:
                        keyDetails = "Terminating node, Odd path length"
                        break
                }
                var key = bufferToHex(nibblesToBuffer(keyNibbles)) + ": " + keyDetails
                var hashComputeDiv = (
                    <h4>
                        hash({this.props.names.name}): keccak256(RLP.encode(bufArrToArr([key,
                        RLP.encode[nonce, gasPrice, gasLimit, to, value, data, v, r, s]])))
                    </h4>
                )
                if (type === 1) {
                    var hashComputeDiv = (
                        <h4>
                            hash({this.props.names.name}): keccak256(RLP.encode(bufArrToArr([key,
                            RLP.encode[chainId, nonce, gasPrice, gasLimit, to, value, data,
                            accessList, v, r, s]])))
                        </h4>
                    )
                } else {
                    if (type === 2) {
                        var hashComputeDiv = (
                            <h4>
                                hash({this.props.names.name}):
                                keccak256(RLP.encode(bufArrToArr([key, RLP.encode[chainId, nonce,
                                maxPriorityFeePerGas, maxFeePerGas, gasLimit, to, value, data,
                                accessList, v, r, s]])))
                            </h4>
                        )
                    }
                }
                childDiv = (
                    <div className={styles.card}>
                        <h2>{this.props.names.name} (Leaf Node)</h2>
                        <h4>key:</h4>
                        <p>{key}</p>
                        <br></br>
                        <TransactionView transaction={transaction} type={type}></TransactionView>
                        <br></br>
                        {hashComputeDiv}
                        <p className="node__linkselected">{hash}</p>
                        {blockHashDiv}
                        <br></br>
                        <h4>Notes:</h4>
                        <p>
                            When we perform RLP decode operation on the leaf node we get list of two
                            items. First item is key and second item is the transaction encoded in
                            RLP format. The first nibble in the key is 2 when the path length is
                            even and 3 when the path length is odd. The second nibble in the key is
                            0 when path length is even. Rest of the nibbles in key represents the
                            remaining path to be matched for this node.
                        </p>
                    </div>
                )
            }

            if (node instanceof BranchNode) {
                var innerNodeViewDiv = []
                var nameIndex = 0
                for (var i = 0; i < node._branches.length; i++) {
                    var branch = node._branches[i]
                    var childname = ""
                    var branchname = "branch-" + i
                    if (Buffer.from(branch).length > 0) {
                        childname = this.props.names.childnames[nameIndex++]
                        branchname =
                            "branch-" +
                            i +
                            ": hash(" +
                            childname +
                            "): keccak256(RLP.encode(" +
                            childname +
                            "))"
                    } else {
                        nameIndex++
                    }
                    if (i === this.props.branchid) {
                        innerNodeViewDiv.push(
                            <h4 key={this.getListKey()} className="node__linkselected">
                                {branchname}
                            </h4>
                        )
                        innerNodeViewDiv.push(
                            <p key={this.getListKey()} className="node__linkselected">
                                {bufferToHex(branch)}
                            </p>
                        )
                    } else {
                        innerNodeViewDiv.push(<h4 key={this.getListKey()}>{branchname}</h4>)
                        innerNodeViewDiv.push(<p key={this.getListKey()}>{bufferToHex(branch)}</p>)
                    }
                }
                var value = node._value
                if (value && value.length > 0) {
                    var tx = TransactionFactory.fromSerializedData(value)
                    var type = 0
                    if (tx instanceof Transaction) type = 0
                    if (tx instanceof AccessListEIP2930Transaction) type = 1
                    if (tx instanceof FeeMarketEIP1559Transaction) type = 2
                    var transaction = tx.toJSON()
                    innerNodeViewDiv.push(<h4 key={this.getListKey()}>value: Transaction</h4>)
                    innerNodeViewDiv.push(
                        <TransactionView
                            key={this.getListKey()}
                            transaction={transaction}
                            type={type}
                        ></TransactionView>
                    )
                } else {
                    innerNodeViewDiv.push(<h4 key={this.getListKey()}>value:</h4>)
                    innerNodeViewDiv.push(<p key={this.getListKey()}>{bufferToHex(value)}</p>)
                }
                var hash = bufferToHex(keccak256(node.serialize()))
                innerNodeViewDiv.push(<br key={this.getListKey()}></br>)
                innerNodeViewDiv.push(
                    <h4 key={this.getListKey()}>
                        hash({this.props.names.name}): keccak256(RLP.encode([branch-0, branch-1,
                        .... branch-15, value]))
                    </h4>
                )
                innerNodeViewDiv.push(
                    <p key={this.getListKey()} className="node__linkselected">
                        {hash}
                    </p>
                )
                childDiv = (
                    <div className={styles.card}>
                        <h2>{this.props.names.name} (Branch Node)</h2>
                        {innerNodeViewDiv}
                        {blockHashDiv}
                        <br></br>
                        <h4>Notes:</h4>
                        <p>
                            When we perform RLP decode operation on the branch node we get list of
                            17 items. First 16 items are branches each represents the key to be used
                            for lookup in tree database to reach next node. The next nibble from the
                            lookup path is used as an index in the branch array to get the key for
                            next node. The last item from RLP deode list is a value which represents
                            a transaction with path terminating at this branch node
                        </p>
                    </div>
                )
            }

            if (node instanceof ExtensionNode) {
                var keyNibbles = node.encodedKey()
                var keyDetails = ""
                switch (keyNibbles[0]) {
                    case 0:
                        keyDetails = "Extension node, Even path length"
                        break
                    case 1:
                        keyDetails = "Extension node, Odd path length"
                        break
                    case 2:
                        keyDetails = "Terminating node, Even path length"
                        break
                    case 3:
                        keyDetails = "Terminating node, Odd path length"
                        break
                }
                var key = bufferToHex(nibblesToBuffer(keyNibbles)) + ": " + keyDetails
                var value = bufferToHex(node.value())
                var hash = bufferToHex(keccak256(node.serialize()))
                childname = this.props.names.childnames[0]
                var branchname =
                    ": hash(" + childname + "): keccak256(RLP.encode(" + childname + "))"
                childDiv = (
                    <div className={styles.card}>
                        <h2>{this.props.names.name} (Extension Node)</h2>
                        <h4>key:</h4>
                        <p>{key}</p>
                        <h4>value{branchname}</h4>
                        <p className="node__linkselected">{value}</p>
                        <h4>
                            hash({this.props.names.name}): keccak256(RLP.encode(bufArrToArr([key,
                            value])))
                        </h4>
                        <p className="node__linkselected">{hash}</p>
                        {blockHashDiv}
                        <br></br>
                        <h4>Notes:</h4>
                        <p>
                            When we perform RLP decode operation on the extension node we get list
                            of two items. First item is key and second item is the value encoded in
                            RLP format. The first nibble in the key is 0 when the path length is
                            even and 1 when the path length is odd. The second nibble in the key is
                            0 when path length is even. Rest of the nibbles in key represents the
                            remaining path to be matched for this node. The value field is used to
                            perform the lookup in tree database to get the leaf node
                        </p>
                    </div>
                )
            }
        }

        return childDiv
    }
}

export default NodeView
