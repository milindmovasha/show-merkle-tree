"use strict";
exports.id = 122;
exports.ids = [122];
exports.modules = {

/***/ 122:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _styles_Home_module_css__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(285);
/* harmony import */ var _styles_Home_module_css__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _ethereumjs_trie__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(452);
/* harmony import */ var _ethereumjs_trie__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_ethereumjs_trie__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _transactionview__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(580);
/* harmony import */ var ethereum_cryptography_keccak__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3);
/* harmony import */ var ethereum_cryptography_keccak__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(ethereum_cryptography_keccak__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _ethereumjs_util__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(176);
/* harmony import */ var _ethereumjs_util__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_ethereumjs_util__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _utils_nibbles__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(888);
/* harmony import */ var _ethereumjs_tx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(798);
/* harmony import */ var _ethereumjs_tx__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_ethereumjs_tx__WEBPACK_IMPORTED_MODULE_6__);









class NodeView extends (react__WEBPACK_IMPORTED_MODULE_1___default().Component) {
    constructor(props){
        super(props);
        this.state = {};
    }
    getListKey() {
        this.listIndex++;
        var key = "NodeView-Key-" + this.listIndex;
        return key;
    }
    render() {
        var childDiv = /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {});
        this.listIndex = 0;
        if (this.props.node && this.props.trie) {
            var node = this.props.node;
            var blockHashDiv = /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {});
            if (this.props.block && this.props.names.name.includes("Root-")) {
                blockHashDiv = /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h4", {
                            children: "Block transactionRoot:"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                            className: "node__linkselected",
                            children: this.props.block.transactionsRoot
                        })
                    ]
                });
            }
            if (node instanceof _ethereumjs_trie__WEBPACK_IMPORTED_MODULE_2__.LeafNode) {
                var tx = _ethereumjs_tx__WEBPACK_IMPORTED_MODULE_6__.TransactionFactory.fromSerializedData(node._value);
                var type = 0;
                if (tx instanceof _ethereumjs_tx__WEBPACK_IMPORTED_MODULE_6__.Transaction) type = 0;
                if (tx instanceof _ethereumjs_tx__WEBPACK_IMPORTED_MODULE_6__.AccessListEIP2930Transaction) type = 1;
                if (tx instanceof _ethereumjs_tx__WEBPACK_IMPORTED_MODULE_6__.FeeMarketEIP1559Transaction) type = 2;
                var transaction = tx.toJSON();
                var keyNibbles = node.encodedKey();
                var hash = (0,_ethereumjs_util__WEBPACK_IMPORTED_MODULE_5__.bufferToHex)((0,ethereum_cryptography_keccak__WEBPACK_IMPORTED_MODULE_4__.keccak256)(node.serialize()));
                var keyDetails = "";
                switch(keyNibbles[0]){
                    case 0:
                        keyDetails = "Extension node, Even path length";
                        break;
                    case 1:
                        keyDetails = "Extension node, Odd path length";
                        break;
                    case 2:
                        keyDetails = "Terminating node, Even path length";
                        break;
                    case 3:
                        keyDetails = "Terminating node, Odd path length";
                        break;
                }
                var key = (0,_ethereumjs_util__WEBPACK_IMPORTED_MODULE_5__.bufferToHex)((0,_utils_nibbles__WEBPACK_IMPORTED_MODULE_7__/* .nibblesToBuffer */ .E)(keyNibbles)) + ": " + keyDetails;
                var hashComputeDiv = /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h4", {
                    children: [
                        "hash(",
                        this.props.names.name,
                        "): keccak256(RLP.encode(bufArrToArr([key, RLP.encode[nonce, gasPrice, gasLimit, to, value, data, v, r, s]])))"
                    ]
                });
                if (type === 1) {
                    var hashComputeDiv = /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h4", {
                        children: [
                            "hash(",
                            this.props.names.name,
                            "): keccak256(RLP.encode(bufArrToArr([key, RLP.encode[chainId, nonce, gasPrice, gasLimit, to, value, data, accessList, v, r, s]])))"
                        ]
                    });
                } else {
                    if (type === 2) {
                        var hashComputeDiv = /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h4", {
                            children: [
                                "hash(",
                                this.props.names.name,
                                "): keccak256(RLP.encode(bufArrToArr([key, RLP.encode[chainId, nonce, maxPriorityFeePerGas, maxFeePerGas, gasLimit, to, value, data, accessList, v, r, s]])))"
                            ]
                        });
                    }
                }
                childDiv = /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: (_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_8___default().card),
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h2", {
                            children: [
                                this.props.names.name,
                                " (Leaf Node)"
                            ]
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h4", {
                            children: "key:"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                            children: key
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("br", {}),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_transactionview__WEBPACK_IMPORTED_MODULE_3__["default"], {
                            transaction: transaction,
                            type: type
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("br", {}),
                        hashComputeDiv,
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                            className: "node__linkselected",
                            children: hash
                        }),
                        blockHashDiv,
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("br", {}),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h4", {
                            children: "Notes:"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                            children: "When we perform RLP decode operation on the leaf node we get list of two items. First item is key and second item is the transaction encoded in RLP format. The first nibble in the key is 2 when the path length is even and 3 when the path length is odd. The second nibble in the key is 0 when path length is even. Rest of the nibbles in key represents the remaining path to be matched for this node."
                        })
                    ]
                });
            }
            if (node instanceof _ethereumjs_trie__WEBPACK_IMPORTED_MODULE_2__.BranchNode) {
                var innerNodeViewDiv = [];
                var nameIndex = 0;
                for(var i = 0; i < node._branches.length; i++){
                    var branch = node._branches[i];
                    var childname = "";
                    var branchname = "branch-" + i;
                    if (Buffer.from(branch).length > 0) {
                        childname = this.props.names.childnames[nameIndex++];
                        branchname = "branch-" + i + ": hash(" + childname + "): keccak256(RLP.encode(" + childname + "))";
                    } else {
                        nameIndex++;
                    }
                    if (i === this.props.branchid) {
                        innerNodeViewDiv.push(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h4", {
                            className: "node__linkselected",
                            children: branchname
                        }, this.getListKey()));
                        innerNodeViewDiv.push(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                            className: "node__linkselected",
                            children: (0,_ethereumjs_util__WEBPACK_IMPORTED_MODULE_5__.bufferToHex)(branch)
                        }, this.getListKey()));
                    } else {
                        innerNodeViewDiv.push(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h4", {
                            children: branchname
                        }, this.getListKey()));
                        innerNodeViewDiv.push(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                            children: (0,_ethereumjs_util__WEBPACK_IMPORTED_MODULE_5__.bufferToHex)(branch)
                        }, this.getListKey()));
                    }
                }
                var value = node._value;
                if (value && value.length > 0) {
                    var tx = _ethereumjs_tx__WEBPACK_IMPORTED_MODULE_6__.TransactionFactory.fromSerializedData(value);
                    var type = 0;
                    if (tx instanceof _ethereumjs_tx__WEBPACK_IMPORTED_MODULE_6__.Transaction) type = 0;
                    if (tx instanceof _ethereumjs_tx__WEBPACK_IMPORTED_MODULE_6__.AccessListEIP2930Transaction) type = 1;
                    if (tx instanceof _ethereumjs_tx__WEBPACK_IMPORTED_MODULE_6__.FeeMarketEIP1559Transaction) type = 2;
                    var transaction = tx.toJSON();
                    innerNodeViewDiv.push(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h4", {
                        children: "value: Transaction"
                    }, this.getListKey()));
                    innerNodeViewDiv.push(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_transactionview__WEBPACK_IMPORTED_MODULE_3__["default"], {
                        transaction: transaction,
                        type: type
                    }, this.getListKey()));
                } else {
                    innerNodeViewDiv.push(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h4", {
                        children: "value:"
                    }, this.getListKey()));
                    innerNodeViewDiv.push(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                        children: (0,_ethereumjs_util__WEBPACK_IMPORTED_MODULE_5__.bufferToHex)(value)
                    }, this.getListKey()));
                }
                var hash = (0,_ethereumjs_util__WEBPACK_IMPORTED_MODULE_5__.bufferToHex)((0,ethereum_cryptography_keccak__WEBPACK_IMPORTED_MODULE_4__.keccak256)(node.serialize()));
                innerNodeViewDiv.push(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("br", {}, this.getListKey()));
                innerNodeViewDiv.push(/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h4", {
                    children: [
                        "hash(",
                        this.props.names.name,
                        "): keccak256(RLP.encode([branch-0, branch-1, .... branch-15, value]))"
                    ]
                }, this.getListKey()));
                innerNodeViewDiv.push(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                    className: "node__linkselected",
                    children: hash
                }, this.getListKey()));
                childDiv = /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: (_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_8___default().card),
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h2", {
                            children: [
                                this.props.names.name,
                                " (Branch Node)"
                            ]
                        }),
                        innerNodeViewDiv,
                        blockHashDiv,
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("br", {}),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h4", {
                            children: "Notes:"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                            children: "When we perform RLP decode operation on the branch node we get list of 17 items. First 16 items are branches each represents the key to be used for lookup in tree database to reach next node. The next nibble from the lookup path is used as an index in the branch array to get the key for next node. The last item from RLP deode list is a value which represents a transaction with path terminating at this branch node"
                        })
                    ]
                });
            }
            if (node instanceof _ethereumjs_trie__WEBPACK_IMPORTED_MODULE_2__.ExtensionNode) {
                var keyNibbles = node.encodedKey();
                var keyDetails = "";
                switch(keyNibbles[0]){
                    case 0:
                        keyDetails = "Extension node, Even path length";
                        break;
                    case 1:
                        keyDetails = "Extension node, Odd path length";
                        break;
                    case 2:
                        keyDetails = "Terminating node, Even path length";
                        break;
                    case 3:
                        keyDetails = "Terminating node, Odd path length";
                        break;
                }
                var key = (0,_ethereumjs_util__WEBPACK_IMPORTED_MODULE_5__.bufferToHex)((0,_utils_nibbles__WEBPACK_IMPORTED_MODULE_7__/* .nibblesToBuffer */ .E)(keyNibbles)) + ": " + keyDetails;
                var value = (0,_ethereumjs_util__WEBPACK_IMPORTED_MODULE_5__.bufferToHex)(node.value());
                var hash = (0,_ethereumjs_util__WEBPACK_IMPORTED_MODULE_5__.bufferToHex)((0,ethereum_cryptography_keccak__WEBPACK_IMPORTED_MODULE_4__.keccak256)(node.serialize()));
                childname = this.props.names.childnames[0];
                var branchname = ": hash(" + childname + "): keccak256(RLP.encode(" + childname + "))";
                childDiv = /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: (_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_8___default().card),
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h2", {
                            children: [
                                this.props.names.name,
                                " (Extension Node)"
                            ]
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h4", {
                            children: "key:"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                            children: key
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h4", {
                            children: [
                                "value",
                                branchname
                            ]
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                            className: "node__linkselected",
                            children: value
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h4", {
                            children: [
                                "hash(",
                                this.props.names.name,
                                "): keccak256(RLP.encode(bufArrToArr([key, value])))"
                            ]
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                            className: "node__linkselected",
                            children: hash
                        }),
                        blockHashDiv,
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("br", {}),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h4", {
                            children: "Notes:"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                            children: "When we perform RLP decode operation on the extension node we get list of two items. First item is key and second item is the value encoded in RLP format. The first nibble in the key is 0 when the path length is even and 1 when the path length is odd. The second nibble in the key is 0 when path length is even. Rest of the nibbles in key represents the remaining path to be matched for this node. The value field is used to perform the lookup in tree database to get the leaf node"
                        })
                    ]
                });
            }
        }
        return childDiv;
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NodeView);


/***/ })

};
;