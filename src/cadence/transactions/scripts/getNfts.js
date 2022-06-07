export const getNFTs = `
import LoveJulesLeatherV1 from 0xLoveJulesLeatherV1
import NonFungibleToken from 0x631e88ae7f1d7c20

pub fun main(account: Address): [&LoveJulesLeatherV1.NFT] {
    let collection = getAccount(account).getCapability(/public/LoveJulesLeatherV1Collection)
                        .borrow<&LoveJulesLeatherV1.Collection{NonFungibleToken.CollectionPublic, LoveJulesLeatherV1.CollectionPublic}>()
                        ?? panic("Can't get the user collection")

    let returnVals: [&LoveJulesLeatherV1.NFT] = []

    let ids = collection.getIDs()
    for id in ids {
        returnVals.append(collection.borrowEntireNFT(id: id))
    }

    return returnVals
}
`