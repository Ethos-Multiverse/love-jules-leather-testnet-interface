import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";
import { useState, useEffect } from "react";
import { getNFTs } from "../cadence/transactions/scripts/getNfts";

function Collection({ address }) {
  console.log('address', address);
  const [nfts, setNfts] = useState([]);

  // Get NFT collection when page loads
  useEffect(() => { 
    getUserNFTs();
  }, []);

  const getUserNFTs = async () => {
    const result = await fcl.query({
      cadence: getNFTs,
      args: (arg, t) => [arg(address, t.Address)]
    })

    console.log("result: ", result);
    setNfts(result);
  }

  return (
    <>
    <h2 className="text-2xl font-semibold mb-2">Your NFTs</h2>
    <ul className="grid grid-cols-4 gap-6"></ul>
    </>
  );
}

export default Collection;
