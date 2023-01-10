export function nibblesToBuffer(arr) {
    const buf = Buffer.alloc(arr.length / 2)
    for (let i = 0; i < buf.length; i++) {
        let q = i * 2
        buf[i] = (arr[q] << 4) + arr[++q]
    }
    return buf
}

/*
 * Converts a buffer to a nibble array.
 * @private
 * @param key
 */
export function bufferToNibbles(key) {
    const bkey = Buffer.from(key)
    const nibbles = []

    for (let i = 0; i < bkey.length; i++) {
        let q = i * 2
        nibbles[q] = bkey[i] >> 4
        ++q
        nibbles[q] = bkey[i] % 16
    }

    return nibbles
}
