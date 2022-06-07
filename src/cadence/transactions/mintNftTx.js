export const mintNftTx = `
import LoveJulesLeatherV1 from 0xLoveJulesLeatherV1
transaction(ipfsHash: String, name: String) {
  prepare(acct: AuthAccount) {
    let collection = acct.borrow<&LoveJulesLeatherV1.Collection>(from: /storage/LoveJulesLeatherV1Collection)
                        ?? panic("This collection does not exist here")
    let nft <- LoveJulesLeatherV1.createToken(ipfsHash: ipfsHash, metadata: {"name": name})
    collection.deposit(token: <- nft)
  }
  execute {
    log("A user minted an NFT into their account")
  }
}
`