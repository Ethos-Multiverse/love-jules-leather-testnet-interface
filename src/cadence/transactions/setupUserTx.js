export const setupUserTx = `
import LoveJulesLeatherV1 from 0xLoveJulesLeatherV1
import NonFungibleToken from 0x631e88ae7f1d7c20
import FungibleToken from 0x9a0766d93b6608b7
import FlowToken from 0x7e60df042a9c0868
import LoveJulesLeatherMarketV1 from 0xLoveJulesLeatherV1

transaction {

  prepare(acct: AuthAccount) {
    acct.save(<- LoveJulesLeatherV1.createEmptyCollection(), to: /storage/LoveJulesLeatherV1Collection)
    acct.link<&LoveJulesLeatherV1.Collection{LoveJulesLeatherV1.CollectionPublic, NonFungibleToken.CollectionPublic}>(/public/LoveJulesLeatherV1Collection, target: /storage/LoveJulesLeatherCollection)
    acct.link<&LoveJulesLeatherV1.Collection>(/private/LoveJulesLeatherV1Collection, target: /storage/LoveJulesLeatherV1Collection)
    
    let MyNFTCollection = acct.getCapability<&LoveJulesLeatherV1.Collection>(/private/LoveJulesLeatherCollection)
    let FlowTokenVault = acct.getCapability<&FlowToken.Vault{FungibleToken.Receiver}>(/public/flowTokenReceiver)

    acct.save(<- LoveJulesLeatherMarketV1.createSaleCollection(LoveJulesLeatherV1Collection: MyNFTCollection, FlowTokenVault: FlowTokenVault), to: /storage/LoveJulesLeatherV1SaleCollection)
    acct.link<&LoveJulesLeatherMarketV1.SaleCollection{LoveJulesLeatherMarketV1.SaleCollectionPublic}>(/public/LoveJulesLeatherSaleCollection, target: /storage/LoveJulesLeatherSaleCollection)
  }

  execute {
    log("A user stored a Collection and a SaleCollection inside their account")
  }
}

`