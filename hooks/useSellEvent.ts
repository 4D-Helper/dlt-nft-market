import { useEffect } from "react";
import { useQueryClient } from "react-query";
import useMarketContract, { EventType } from "./useMarketContract";

interface useSellEventQuery {
  nftAddress: string;
}

// Listen to events and refresh data
const useSellEvent = ({ nftAddress }: useSellEventQuery) => {
  const queryClient = useQueryClient();
  const marketContract = useMarketContract();

  useEffect(() => {
    const handler = (sellItem) => {
      if (sellItem.nft !== nftAddress) {
        return;
      }
      queryClient.invalidateQueries([
        "SellItems",
        { nftAddress: sellItem.nft, chainId: marketContract.chainId },
      ]);
    };

    marketContract.contract.on(EventType.Sell, handler);

    return () => {
      marketContract.contract.off(EventType.Sell, handler);
    };
  }, [queryClient, marketContract.chainId, nftAddress]);
};

export default useSellEvent;