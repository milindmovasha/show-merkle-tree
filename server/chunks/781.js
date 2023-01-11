"use strict";
exports.id = 781;
exports.ids = [781];
exports.modules = {

/***/ 781:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _styles_styles_module_css__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(975);
/* harmony import */ var _styles_styles_module_css__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_styles_styles_module_css__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _trieview__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(173);
/* harmony import */ var _nodeview__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(122);
/* harmony import */ var react_spinners__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(304);
/* harmony import */ var react_spinners__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_spinners__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _explanation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(825);
/* harmony import */ var _utils_nibbles__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(888);
/* harmony import */ var _ethereumjs_rlp__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(275);
/* harmony import */ var _ethereumjs_rlp__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_ethereumjs_rlp__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _ethereumjs_trie__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(452);
/* harmony import */ var _ethereumjs_trie__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_ethereumjs_trie__WEBPACK_IMPORTED_MODULE_7__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_trieview__WEBPACK_IMPORTED_MODULE_2__]);
_trieview__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];










class TrieViewContainer extends (react__WEBPACK_IMPORTED_MODULE_1___default().Component) {
    constructor(props){
        super(props);
        this.setClickedPath = this.setClickedPath.bind(this);
        this.setProgress = this.setProgress.bind(this);
        this.setMessage = this.setMessage.bind(this);
        this.state = {};
    }
    componentDidMount() {
        if (this.mounted) return;
        this.mounted = true;
        console.log("TrieViewContainer mounted");
        if (this.treeContainer) {
            const dimensions = this.treeContainer.getBoundingClientRect();
            this.setState({
                translate: {
                    x: dimensions.width / 2,
                    y: dimensions.height / 10
                }
            });
        }
    }
    setClickedPath(path, names, tidrlp) {
        this.setState({
            clickedPathData: path,
            clickedNames: names,
            clickedTid: tidrlp
        });
    }
    setMessage(message) {
        this.props.setMessage(message);
    }
    setProgress(showProgress) {
        this.props.setProgress(showProgress);
    }
    getListKey() {
        this.listIndex++;
        var key = "Node-kEY-" + this.listIndex;
        return key;
    }
    render() {
        var childDiv = /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {});
        this.listIndex = 0;
        if (!this.props.error && this.props.block && this.props.trie && this.props.trieJson) {
            childDiv = /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_trieview__WEBPACK_IMPORTED_MODULE_2__["default"], {
                trieJson: this.props.trieJson,
                trie: this.props.trie,
                block: this.props.block,
                setClickedPath: this.setClickedPath,
                setMessage: this.setMessage,
                setProgress: this.setProgress
            });
        }
        var nodeViewDiv = /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {});
        if (this.state.clickedPathData) {
            var { _ , _ , stack  } = this.state.clickedPathData;
            var pathNibbles = (0,_utils_nibbles__WEBPACK_IMPORTED_MODULE_8__/* .bufferToNibbles */ .L)(_ethereumjs_rlp__WEBPACK_IMPORTED_MODULE_6__.RLP.encode(this.state.clickedTid));
            var nibbleIndex = 0;
            var innerNodeViewDiv = [];
            var length = stack.length;
            for(var i = 0; i < length; i++){
                var stacknode = stack[i];
                var nodeKeyLength = 1;
                if (stacknode instanceof _ethereumjs_trie__WEBPACK_IMPORTED_MODULE_7__.LeafNode || stacknode instanceof _ethereumjs_trie__WEBPACK_IMPORTED_MODULE_7__.ExtensionNode) nodeKeyLength = stacknode.key().length;
                innerNodeViewDiv.push(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_nodeview__WEBPACK_IMPORTED_MODULE_3__["default"], {
                    names: this.state.clickedNames[length - i - 1],
                    node: stacknode,
                    trie: this.props.trie,
                    block: this.props.block,
                    branchid: pathNibbles[nibbleIndex]
                }, this.getListKey()));
                nibbleIndex += nodeKeyLength;
            }
        }
        nodeViewDiv = /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: (_styles_styles_module_css__WEBPACK_IMPORTED_MODULE_9___default().transactiongrid),
            id: "nodeViewDiv",
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_explanation__WEBPACK_IMPORTED_MODULE_5__["default"], {
                    trie: this.props.trie,
                    clickedPathData: this.state.clickedPathData,
                    clickedNames: this.state.clickedNames,
                    clickedTid: this.state.clickedTid,
                    block: this.props.block
                }),
                innerNodeViewDiv
            ]
        });
        var clipper = this.props.showProgress ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
            className: (_styles_styles_module_css__WEBPACK_IMPORTED_MODULE_9___default().cliploaderparent),
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: (_styles_styles_module_css__WEBPACK_IMPORTED_MODULE_9___default().cliploader),
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_spinners__WEBPACK_IMPORTED_MODULE_4__.PropagateLoader, {
                    loading: this.props.showProgress,
                    size: 20,
                    "aria-label": "Loading Spinner",
                    "data-testid": "loader"
                })
            })
        }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {});
        if (this.props.showProgress) nodeViewDiv = /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
            id: "nodeViewDiv"
        });
        var treeView = this.props.trie ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: (_styles_styles_module_css__WEBPACK_IMPORTED_MODULE_9___default().trietreeview),
            style: {
                width: "100%",
                height: "22em"
            },
            ref: (tc)=>this.treeContainer = tc,
            children: [
                childDiv,
                clipper
            ]
        }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
            className: (_styles_styles_module_css__WEBPACK_IMPORTED_MODULE_9___default().trietreeview),
            style: {
                width: "100%",
                height: "22em"
            },
            ref: (tc)=>this.treeContainer = tc,
            children: clipper
        });
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            id: "treeContainer",
            className: (_styles_styles_module_css__WEBPACK_IMPORTED_MODULE_9___default().trieview),
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: (_styles_styles_module_css__WEBPACK_IMPORTED_MODULE_9___default().tip),
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                        children: this.props.message
                    })
                }),
                treeView,
                nodeViewDiv
            ]
        });
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TrieViewContainer);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;