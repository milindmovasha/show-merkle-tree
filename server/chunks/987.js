exports.id = 987;
exports.ids = [987];
exports.modules = {

/***/ 285:
/***/ ((module) => {

// Exports
module.exports = {
	"main": "Home_main__nLjiQ",
	"description": "Home_description__41Owk",
	"code": "Home_code__suPER",
	"grid": "Home_grid__GxQ85",
	"card": "Home_card___LpL1",
	"center": "Home_center__4BFgC",
	"thirteen": "Home_thirteen__cMI_k",
	"content": "Home_content__Zy02X",
	"vercelLogo": "Home_vercelLogo__dtSk9",
	"logo": "Home_logo__27_tb",
	"rotate": "Home_rotate____XsI"
};


/***/ }),

/***/ 888:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "E": () => (/* binding */ nibblesToBuffer),
/* harmony export */   "L": () => (/* binding */ bufferToNibbles)
/* harmony export */ });
function nibblesToBuffer(arr) {
    const buf = Buffer.alloc(arr.length / 2);
    for(let i = 0; i < buf.length; i++){
        let q = i * 2;
        buf[i] = (arr[q] << 4) + arr[++q];
    }
    return buf;
}
/*
 * Converts a buffer to a nibble array.
 * @private
 * @param key
 */ function bufferToNibbles(key) {
    const bkey = Buffer.from(key);
    const nibbles = [];
    for(let i = 0; i < bkey.length; i++){
        let q = i * 2;
        nibbles[q] = bkey[i] >> 4;
        ++q;
        nibbles[q] = bkey[i] % 16;
    }
    return nibbles;
}


/***/ })

};
;