import { useMutation } from "react-query";
import useMarketContract from "./useMarketContract";

interface UseSellItemPayload {
  _tokenId: string;
  _price: string;
  _nftAddress: string;
  _currency: string;
}

interface UseBuyItemPayload {
  _orderId: string;
  _nftAddress: string;
  _currency: string;
  _price: string;
}

interface UseCancelItemPayload {
  _orderId: string;
  _nftAddress: string;
}

const useSellItem = () => {
  const contract = useMarketContract();

  return useMutation(async ({ _tokenId, _price, _nftAddress, _currency }: UseSellItemPayload) => {
    await contract.sell(_tokenId, _price, _nftAddress, _currency);
  });
};

const useBuyItem = () => {
  const contract = useMarketContract();

  return useMutation(async ({ _orderId, _price, _nftAddress, _currency }: UseBuyItemPayload) => {
    await contract.sell(_orderId, _nftAddress, _currency, _price);
  });
};

const useCancelSellItem = () => {
  const contract = useMarketContract();

  return useMutation(async ({ _orderId, _nftAddress }: UseCancelItemPayload) => {
    await contract.cancel(_orderId, _nftAddress);
  });
};

export {
  useSellItem,
  useBuyItem,
  useCancelSellItem
};