export const getNFTs = `
import LoveJulesLeather from 0xLoveJulesLeather
import NonFungibleToken from 0x631e88ae7f1d7c20

pub fun main(account: Address): [&LoveJulesLeather.NFT] {
  let collection = getAccount(account).getCapability(/public/LoveJulesLeather)
                    .borrow<&LoveJulesLeather.Collection{NonFungibleToken.CollectionPublic, LoveJulesLeather.CollectionPublic}>()
                    ?? panic("Can't get the User's collection.")

  let returnVals: [&LoveJulesLeather.NFT] = []

  let ids = collection.getIDs()
  for id in ids {
    returnVals.append(collection.borrowEntireNFT(id: id))
  }

  return returnVals
}
`