export const mintNftTx = `
import LoveJulesLeather from 0xLoveJulesLeather

transaction {
    prepare(acct: AuthAccount) {
        // Get LoveJulesLeather collection in users wallet
        let collection = acct.borrow<&LoveJulesLeather.Collection>(from: /storage/LoveJulesLeatherCollection)
                    ?? panic("LoveJulesLeather collection does not exist in users storage")

        // Mint an NFT
        let nft <- LoveJulesLeather.mint()

        // Store nft inside users LoveJulesLeather collection
        collection.deposit(token: <- nft)
    }

    execute {
        log("A user minted a LoveJuleLeather NFT into their account")
    }
}
`