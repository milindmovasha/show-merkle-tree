import Web3 from "web3"

const ERROR_API_KEY_NOT_SET =
    'API key is not set. Please create a .env file in the root folder and add the line as follows NEXT_PUBLIC_WEB3_API_URL="https://eth-mainnet.g.alchemy.com/v2/YOUR-API-KEY" and recompile the code and start the server again'

const web3 = new Web3(process.env.NEXT_PUBLIC_WEB3_API_URL)

async function getEthBlock(blockNumber) {
    return new Promise(function (resolve, reject) {
        try {
            if (!process.env.NEXT_PUBLIC_WEB3_API_URL) {
                reject(ERROR_API_KEY_NOT_SET)
            }
            web3.eth.getBlock(parseInt(blockNumber), true, function (error, blockData) {
                if (error) {
                    console.log(
                        "Warning: error on getting block with hash/number: " +
                            blockNumber +
                            ": " +
                            error +
                            ": blockData:" +
                            blockData
                    )
                    reject(error)
                } else {
                    //console.log("block data:")
                    //console.log(blockData)
                    resolve(blockData)
                }
            })
        } catch (error) {
            reject(error)
        }
    })
}

async function getEthBlockNumber() {
    return new Promise(function (resolve, reject) {
        try {
            if (!process.env.NEXT_PUBLIC_WEB3_API_URL) {
                reject(ERROR_API_KEY_NOT_SET)
            }
            web3.eth.getBlockNumber(function (error, blockNumber) {
                if (error) {
                    reject(error)
                } else {
                    resolve(blockNumber)
                }
            })
        } catch (error) {
            reject(error)
        }
    })
}

export { getEthBlock, getEthBlockNumber }
