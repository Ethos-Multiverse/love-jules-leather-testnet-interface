export const setupUser = `
import LoveJulesLeather from 0xLoveJulesLeather

transaction {

  prepare(acct: AuthAccount) {
    acct.save(<- LoveJulesLeather.createEmptyCollection(), to: /storage/LoveJulesLeatherCollection)

    // Create a public link to users collection
    acct.link<&LoveJulesLeather.Collection{LoveJulesLeather.CollectionPublic}>(/public/LoveJulesLeather, target: /storage/LoveJulesLeatherCollection )

    acct.link<&LoveJulesLeather.Collection>(/private/LoveJulesLeather, target: /storage/LoveJulesLeatherCollection)
  }

  execute {
    log("A user stored a LoveJulesLeather Collection inside their account")
  }
}

`