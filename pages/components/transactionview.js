import React, { useState } from "react"
import { Inter } from "@next/font/google"
const inter = Inter({ subsets: ["latin"] })

class StorageKeyView extends React.Component {
    getListKey() {
        this.listIndex++
        var key = this.props.keyPrefix + "-Storage-" + this.listIndex
        return key
    }

    render() {
        var listView = []
        this.listIndex = 0
        var i = 0
        //console.log(this.props.storageKeys)
        var keyList = this.props.storageKeys
        for (var i = 0; i < keyList.length; i++) {
            var listnode = keyList[i]
            var keyListView = (
                <p key={this.getListKey()}>
                    storage-key-{i}: {listnode}
                </p>
            )
            listView.push(keyListView)
        }
        return <div key={this.props.keyPrefix}>{listView}</div>
    }
}

class AccessList extends React.Component {
    getListKey() {
        this.listIndex++
        var key = "AccessList-Key-" + this.listIndex
        return key
    }

    render() {
        var listView = []
        this.listIndex = 0
        var i = 0
        //console.log(this.props.list)
        var acccessList = this.props.list
        for (var i = 0; i < acccessList.length; i++) {
            var listnode = acccessList[i]
            var accessListView = <h4 key={this.getListKey()}>access-list-{i}:</h4>
            listView.push(accessListView)
            accessListView = <p key={this.getListKey()}>address: {listnode.address}</p>
            listView.push(accessListView)
            var storageKey = this.getListKey()
            accessListView = (
                <StorageKeyView
                    key={storageKey}
                    keyPrefix={storageKey}
                    storageKeys={listnode.storageKeys}
                ></StorageKeyView>
            )
            listView.push(accessListView)
        }
        return <div>{listView}</div>
    }
}

class TransactionView extends React.Component {
    render() {
        var transaction = this.props.transaction
        if (!transaction) {
            return <div></div>
        }

        switch (this.props.type) {
            default:
                return (
                    <div>
                        <h4>nonce:</h4>
                        <p>{transaction.nonce}</p>
                        <h4>gasPrice:</h4>
                        <p>{transaction.gasPrice}</p>
                        <h4>gasLimit:</h4>
                        <p>{transaction.gasLimit}</p>
                        <h4>to:</h4>
                        <p>{transaction.to}</p>
                        <h4>value:</h4>
                        <p>{transaction.value}</p>
                        <h4>data:</h4>
                        <p>{transaction.data}</p>
                        <h4>v:</h4>
                        <p>{transaction.v}</p>
                        <h4>r:</h4>
                        <p>{transaction.r}</p>
                        <h4>s:</h4>
                        <p>{transaction.s}</p>
                    </div>
                )
            case 1:
                return (
                    <div>
                        <h4>chainId:</h4>
                        <p>{transaction.chainId}</p>
                        <h4>nonce:</h4>
                        <p>{transaction.nonce}</p>
                        <h4>gasPrice:</h4>
                        <p>{transaction.gasPrice}</p>
                        <h4>gasLimit:</h4>
                        <p>{transaction.gasLimit}</p>
                        <h4>to:</h4>
                        <p>{transaction.to}</p>
                        <h4>value:</h4>
                        <p>{transaction.value}</p>
                        <h4>data:</h4>
                        <p>{transaction.data}</p>
                        <AccessList list={transaction.accessList}></AccessList>
                        <h4>v:</h4>
                        <p>{transaction.v}</p>
                        <h4>r:</h4>
                        <p>{transaction.r}</p>
                        <h4>s:</h4>
                        <p>{transaction.s}</p>
                    </div>
                )
            case 2:
                return (
                    <div>
                        <h4>chainId:</h4>
                        <p>{transaction.chainId}</p>
                        <h4>nonce:</h4>
                        <p>{transaction.nonce}</p>
                        <h4>maxPriorityFeePerGas:</h4>
                        <p>{transaction.maxPriorityFeePerGas}</p>
                        <h4>maxFeePerGas:</h4>
                        <p>{transaction.maxFeePerGas}</p>
                        <h4>gasLimit:</h4>
                        <p>{transaction.gasLimit}</p>
                        <h4>to:</h4>
                        <p>{transaction.to}</p>
                        <h4>value:</h4>
                        <p>{transaction.value}</p>
                        <h4>data:</h4>
                        <p>{transaction.data}</p>
                        <AccessList list={transaction.accessList}></AccessList>
                        <h4>v:</h4>
                        <p>{transaction.v}</p>
                        <h4>r:</h4>
                        <p>{transaction.r}</p>
                        <h4>s:</h4>
                        <p>{transaction.s}</p>
                    </div>
                )
        }
    }
}

export default TransactionView
