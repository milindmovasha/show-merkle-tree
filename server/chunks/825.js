"use strict";
exports.id = 825;
exports.ids = [825];
exports.modules = {

/***/ 825:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _styles_Home_module_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(285);
/* harmony import */ var _styles_Home_module_css__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _styles_styles_module_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(975);
/* harmony import */ var _styles_styles_module_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_styles_styles_module_css__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _ethereumjs_trie__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(452);
/* harmony import */ var _ethereumjs_trie__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_ethereumjs_trie__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ethereumjs_rlp__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(275);
/* harmony import */ var _ethereumjs_rlp__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_ethereumjs_rlp__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ethereumjs_util__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(176);
/* harmony import */ var _ethereumjs_util__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_ethereumjs_util__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _utils_nibbles__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(888);








class Expaination extends (react__WEBPACK_IMPORTED_MODULE_1___default().Component) {
    getListKey() {
        this.listIndex++;
        var key = "Expaination-List-" + this.listIndex;
        return key;
    }
    render() {
        var details = [];
        var childDiv = /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {});
        this.listIndex = 0;
        if (!this.props.block || !this.props.trie) return childDiv;
        if (this.props.clickedPathData) {
            var { _ , _ , stack  } = this.props.clickedPathData;
            var length = stack.length;
            var tid = this.props.clickedTid;
            //console.log("Clicked TID: " + tid)
            var pathNibbles = (0,_utils_nibbles__WEBPACK_IMPORTED_MODULE_5__/* .bufferToNibbles */ .L)(_ethereumjs_rlp__WEBPACK_IMPORTED_MODULE_3__.RLP.encode(tid));
            var nibbles = 0;
            var li;
            li = /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("li", {
                children: [
                    "Our lookup path is for Transaction Id:",
                    tid,
                    ". RLP(Transaction Id):",
                    (0,_ethereumjs_util__WEBPACK_IMPORTED_MODULE_4__.bufferToHex)((0,_utils_nibbles__WEBPACK_IMPORTED_MODULE_5__/* .nibblesToBuffer */ .E)(pathNibbles)),
                    "."
                ]
            }, this.getListKey());
            details.push(li);
            for(var i = 0; i < length; i++){
                var stacknode = stack[i];
                var nodeKey = [];
                if (stacknode instanceof _ethereumjs_trie__WEBPACK_IMPORTED_MODULE_2__.LeafNode || stacknode instanceof _ethereumjs_trie__WEBPACK_IMPORTED_MODULE_2__.ExtensionNode) nodeKey = stacknode.key();
                //console.log("Key:" + nodeKey)
                var name = this.props.clickedNames[length - i - 1].name;
                var curNibble;
                if (name.includes("Root")) li = /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("li", {
                    children: [
                        "We perform lookup in the database using block.transactionsRoot:",
                        this.props.block.transactionsRoot,
                        " to get the root node ",
                        name,
                        "."
                    ]
                }, this.getListKey());
                else li = /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("li", {
                    children: [
                        "We perform lookup in the database using key to get the node ",
                        name,
                        "."
                    ]
                }, this.getListKey());
                details.push(li);
                if (name.includes("BN")) {
                    curNibble = pathNibbles[nibbles++];
                    var branch = stacknode._branches[curNibble];
                    if (nibbles == pathNibbles.length) {
                        li = /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("li", {
                            children: [
                                "Our lookup path terminates at branch node ",
                                name,
                                ". We use value field from this node to get the transaction details."
                            ]
                        }, this.getListKey());
                    } else {
                        li = /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("li", {
                            children: [
                                "We use nibble: 0x",
                                curNibble.toString(16),
                                " from RLP(Transaction Id) as index in the branches of this node to get key:",
                                (0,_ethereumjs_util__WEBPACK_IMPORTED_MODULE_4__.bufferToHex)(branch),
                                " for the next node"
                            ]
                        }, this.getListKey());
                    }
                    details.push(li);
                }
                if (name.includes("EN")) {
                    var matchingNibbles = "";
                    for(var k = 0; k < nodeKey.length; k++){
                        curNibble = pathNibbles[nibbles];
                        matchingNibbles += curNibble.toString(16);
                        nibbles++;
                    }
                    var branch = stacknode._value;
                    li = /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("li", {
                        children: [
                            "The node ",
                            name,
                            " is an extension node. The nibbles matched from lookup path are 0x",
                            matchingNibbles,
                            ". The value field of this node is used to get key:",
                            (0,_ethereumjs_util__WEBPACK_IMPORTED_MODULE_4__.bufferToHex)(branch),
                            " for the next node"
                        ]
                    }, this.getListKey());
                    details.push(li);
                }
                if (name.includes("LN")) {
                    var matchingNibbles = "";
                    for(var k = 0; k < nodeKey.length; k++){
                        if (nibbles < pathNibbles.length) {
                            curNibble = pathNibbles[nibbles];
                            matchingNibbles += curNibble.toString(16);
                            nibbles++;
                        }
                    }
                    var message = "";
                    if (nodeKey.length > 0) {
                        message = "Nibbles matching the lookup path are 0x" + matchingNibbles;
                    }
                    li = /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("li", {
                        children: [
                            "The node ",
                            name,
                            " is the leaf node which contains the transaction we are looking for. ",
                            message
                        ]
                    }, this.getListKey());
                    details.push(li);
                }
            }
            var pathParagraph = !this.props.clickedPathData || this.props.clickedPathData.length == 0 ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                children: "Please select click nodes in the above tree till you reach a leaf node to see explaination for specific path"
            }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: (_styles_styles_module_css__WEBPACK_IMPORTED_MODULE_6___default().explain),
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("ul", {
                    children: details
                })
            });
            childDiv = /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: (_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_7___default().card),
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h2", {
                        children: "Explaination"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                        children: "The tree consists of database with (key,value) pairs where key is the hash of the node and value represents the node structure stored in RLP format. We can find a trasaction in this tree by following a path using the nibbles in RLP(transaction id)."
                    }),
                    pathParagraph,
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h2", {
                        children: "Reference"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                            href: "https://ethereum.org/en/developers/docs/data-structures-and-encoding/",
                            children: "Ethereum Data Structures and Encoding"
                        })
                    })
                ]
            });
        }
        return childDiv;
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Expaination);


/***/ })

};
;