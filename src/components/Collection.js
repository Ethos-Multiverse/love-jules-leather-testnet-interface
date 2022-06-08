import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";
import { getNodeText } from "@testing-library/react";
import { useState, useEffect } from "react";
import { getNFTs } from "../cadence/transactions/scripts/getNfts";

function Collection({ address, setIsSetup }) {
  console.log('address', address);
  const [nfts, setNFTs] = useState([]);

  // Get NFT collection when page loads
  useEffect(() => { 
      getUserNFTs();
  }, []);

  const getUserNFTs = async () => {
    const result = await fcl.send([
        fcl.script(getNFTs),
        fcl.args([
            fcl.arg(address, t.Address)
        ])
    ]).then(fcl.decode);

    console.log(result);
    setNFTs(result);
}

  if(nfts.length < 1 ) return null;

  if (nfts.length >= 0) {
    setIsSetup(true);
  }


  return (
    <>
      <h2 className="text-2xl font-semibold mb-2">Your NFTs</h2>
      <ul className="grid grid-cols-2 gap-6">
      {nfts.map(nft => (
        <div key={nft.id} className="max-w-sm rounded overflow-hidden shadow-lg">
          <img className="w-full" src={`https://gateway.pinata.cloud/ipfs/QmSNpzoJsYaqGybdVKtRpynRaGGKJYkLYVXcBKyyApvbeN`} alt="LoveJulesLeather" />
          <div className="px-6 py-4">
            <h2 className="indent-3 font-bold text-s mb-2">{nft.metadata.name}</h2>  
          </div>
          <div className="px-6 pt-4 pb-2">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              {nft.id}
            </span>
          </div>
        </div>
      ))}
      </ul>
    </>
  );
}

export default Collection;
