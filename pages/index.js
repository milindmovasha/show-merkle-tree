import Head from "next/head"
import React, { useState } from "react"
import $ from "jquery"
import { Inter } from "@next/font/google"
import styles from "../styles/Home.module.css"
import appstyles from "../styles/styles.module.css"
import { getEthBlock, getEthBlockNumber } from "../utils/web3utils"
import { Trie, MapDB } from "@ethereumjs/trie"
import web3 from "web3"
import { RLP } from "@ethereumjs/rlp"
const inter = Inter({ subsets: ["latin"] })
import { bufferToHex } from "@ethereumjs/util"
import { TransactionFactory } from "@ethereumjs/tx"
import { BranchNode, ExtensionNode, LeafNode, decodeNode } from "@ethereumjs/trie"
import TrieViewContainer from "./components/trieviewcontainer"

import testblock from "../testblock3.json"
const TEST_MODE = 1

function serializeTransaction(transaction) {
    if (transaction.nonce !== undefined) transaction.nonce = web3.utils.toHex(transaction.nonce)
    if (transaction.gasPrice !== undefined)
        transaction.gasPrice = web3.utils.toHex(transaction.gasPrice)
    if (transaction.maxFeePerGas !== undefined)
        transaction.maxFeePerGas = web3.utils.toHex(transaction.maxFeePerGas)
    if (transaction.maxPriorityFeePerGas !== undefined)
        transaction.maxPriorityFeePerGas = web3.utils.toHex(transaction.maxPriorityFeePerGas)
    if (transaction.value !== undefined) transaction.value = web3.utils.toHex(transaction.value)
    if (transaction.gas !== undefined) transaction.gasLimit = web3.utils.toHex(transaction.gas)
    if (transaction.input !== undefined) transaction.data = transaction.input
    var tx = new TransactionFactory.fromTxData(transaction)
    return tx.serialize()
}

function getTxId(block, value) {
    if (!value || value.length == 0) return -1
    var tx = TransactionFactory.fromBlockBodyData(value)
    //console.log("Encoded tx:" + bufferToHex(node._value))
    //console.log("Docoded tx nonce:" + tx.toJSON().nonce)
    var txId = -1
    for (var i = 0; i < block.transactions.length; i++) {
        var txjs = block.transactions[i]
        //console.log("txjs hash:" + txjs.hash)
        //console.log("tx hash:" + bufferToHex(tx.hash()))
        if (txjs.hash == bufferToHex(tx.hash())) {
            txId = txjs.transactionIndex
            break
        }
    }
    return txId
}

var numNodes = 0
var numBranchNodes = 0
var numExtensionNodes = 0
async function walkTrie(trie, block, key, parentId) {
    var node = null

    try {
        //walkTrie is called recursively to process Branch nodes
        //While processing the Branches of Branch node branch can have embedded node
        node = decodeNode(key)
        //console.log("NodeId: "+(numNodes+1)+" is Embedded node")
    } catch (e) {}

    if (node == null) node = await trie.lookupNode(key)
    numNodes++
    var nodeId = numNodes
    //console.log("NodeId: "+nodeId+", ParentId: "+parentId)
    if (node instanceof BranchNode) {
        //console.log(node)
        numBranchNodes++
        var branches = node._branches
        var childs = []
        var retjson = {}
        retjson["name"] = "BN-" + numBranchNodes
        if (parentId == -1) {
            retjson["name"] = "Root-BN-" + numBranchNodes
        }
        for (var b = 0; b < branches.length; b++) {
            if (branches[b].length > 0) {
                var child = await walkTrie(trie, block, branches[b], nodeId)
                childs.push(child)
            } else {
                var child = {}
                child["name"] = "Empty"
                childs.push(child)
            }
        }
        var txId = getTxId(block, node._value)
        if (txId !== -1) {
            retjson["name"] = retjson["name"] + "-" + txId
        }
        retjson["children"] = childs
        return retjson
    }
    if (node instanceof ExtensionNode) {
        //console.log(node)
        numExtensionNodes++
        var retjson = {}
        var childs = []
        retjson["name"] = "EN-" + numExtensionNodes
        if (parentId == -1) {
            retjson["name"] = "Root-EN-" + numExtensionNodes
        }
        var value = node._value
        var child = await walkTrie(trie, block, value, nodeId)
        childs.push(child)
        retjson["children"] = childs
        return retjson
    }

    if (node instanceof LeafNode) {
        var txId = getTxId(block, node._value)
        var retjson = {}
        retjson["name"] = "LN-" + txId
        if (parentId == -1) {
            retjson["name"] = "Root-LN-" + txId
        }
        return retjson
    }
}

async function readProcessBlock(blockNumber, maxBlockNumber, setBlock, setTrieJson, setMessage) {
    if (TEST_MODE == 1) {
        /* Read from test block */
        await new Promise((resolve) => {
            setTimeout(resolve, 1000)
        })
        return processBlock(testblock, setBlock, setTrieJson, setMessage)
    } else {
        try {
            if (blockNumber >= maxBlockNumber) {
                setMessage("Please enter block number less than :" + maxBlockNumber)
                return null
            }

            var block = await getEthBlock(blockNumber)
            if (!block) {
                setMessage("Unable to fetch the block")
                return null
            }
            return processBlock(block, setBlock, setTrieJson, setMessage)
        } catch (e) {
            console.log("Error:" + e)
            setMessage(e)
        }
    }
    return null
}

async function processBlock(block, setBlock, setTrieJson, setMessage) {
    setBlock(block)
    var mapDB = new MapDB()
    var trie = await Trie.create({ db: mapDB })
    for (var i = 0; i < block.transactions.length; i++) {
        // key = rlp(transactionIndex)
        // For legacyTx value = rlp(tx)
        var transaction = block.transactions[i]
        var serializedTx = serializeTransaction(transaction)
        if (serializedTx) {
            var serializedKey = RLP.encode(i)
            //console.log("Keybuffer:" + bufferToHex(serializedKey))
            //console.log("transactionBuffer:" + bufferToHex(serializedTx))
            await trie.put(serializedKey, serializedTx)
        } else {
            setMessage("Internal error: Unable to create transaction trie")
            return null
        }
    }
    if (block.transactions.length == 0) {
        setMessage("Block contains no transactions, please select a different block.")
        return null
    }
    //console.log("trie root after calculation:" + bufferToHex(trie.root()))
    numNodes = 0
    numBranchNodes = 0
    numExtensionNodes = 0
    var triejson = await walkTrie(trie, block, trie.root(), -1)
    setTrieJson(triejson)
    setMessage(null)
    return trie
}

async function showBlock(
    blockNumber,
    maxBlockNumber,
    setTrie,
    setProgress,
    setBlock,
    setTrieJson,
    setMessage
) {
    setTrie(null)
    setProgress(true)
    setBlock(null)
    setTrieJson(null)
    setMessage("Fetching block")
    var trie = await readProcessBlock(
        blockNumber,
        maxBlockNumber,
        setBlock,
        setTrieJson,
        setMessage
    )
    if (!trie) {
        setProgress(false)
        setBlock(null)
        setTrieJson(null)
    }
    setTrie(trie)
}

export default function Home() {
    const [trieJson, setTrieJson] = useState(null)
    const [trie, setTrie] = useState(null)
    const [myBlock, setBlock] = useState(null)
    var defaultMessage = "Please enter block number"
    if (TEST_MODE) {
        defaultMessage = "Please enter block number as 0 to select test block"
    }
    const [message, setMessage] = useState(defaultMessage)
    const [showProgress, setProgress] = useState(false)
    const [maxBlockNumber, setMaxBlockNumber] = useState(1)

    if (TEST_MODE == 0) {
        getEthBlockNumber()
            .then((blockNumber) => {
                setMaxBlockNumber(blockNumber)
            })
            .catch((error) => {
                setMessage(error)
            })
    }

    const preventDefault = (f) => (e) => {
        e.preventDefault()
        f(e)
    }
    const handleSubmit = preventDefault(async () => {
        console.log("Submitting")
        var blockNumber = $("#blockNumber").val()
        if (blockNumber == null || blockNumber == "") {
            setMessage("Please enter valid block number")
            return
        }
        console.log(blockNumber)
        await showBlock(
            blockNumber,
            maxBlockNumber,
            setTrie,
            setProgress,
            setBlock,
            setTrieJson,
            setMessage
        )
    })

    return (
        <>
            <Head>
                <title>Ethereum Transaction Merkle Tree Visualizer</title>
                <meta name="description" content="Visiualize Ethereum Transaction Merkel Tree" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <div>
                    <h1> Ethereum Transaction Merkle Tree Visualizer</h1>
                    <p className={appstyles.center}>
                        <a href="https://github.com/milindmovasha/show-merkle-tree">
                            (https://github.com/milindmovasha/show-merkle-tree)
                        </a>
                    </p>
                    <div className={appstyles.topMargin}>
                        <form onSubmit={handleSubmit}>
                            <label className={appstyles.formMargin} htmlFor="blockNumber">
                                {"Enter Block Number (0 to " + maxBlockNumber + ")"}
                            </label>
                            <input
                                className={appstyles.formMargin}
                                type="number"
                                min="0"
                                id="blockNumber"
                                name="blockNumber"
                            />
                            <button className={appstyles.formButton} type="submit">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
                <TrieViewContainer
                    trieJson={trieJson}
                    trie={trie}
                    block={myBlock}
                    message={message}
                    showProgress={showProgress}
                    setProgress={setProgress}
                    setMessage={setMessage}
                />
            </main>
        </>
    )
}
