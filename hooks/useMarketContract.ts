import * as wagmi from "wagmi";
import { useProvider, useSigner } from "wagmi";
import MarketContractMeta from "../constants/market.json";

export interface SellItem {
    id: string;               // sales ID
    tokenId: string;          // token unique id
    nft: string;              // nft address
    currency: string;         // currency address
    seller: string;           // seller address
    buyer: string;            // buyer address
    startTime: any;        // timestamp when the sale starts
    price: string;            // nft price
    status: number;           // 2 = sale canceled, 1 = sold, 0 = for sale
}

export enum EventType {
    Buy = 'Buy',
    Sell = 'Sell',
    SaleCanceled = 'SaleCanceled',
}

function useMarketContract() {
    const [signer] = useSigner();
    const provider = useProvider();

    const contract = wagmi.useContract({
        addressOrName: "0x7B5AD705F124EbC8C5482148883B0e013162dbF1",
        contractInterface: MarketContractMeta.abi,
        signerOrProvider: signer.data || provider,
    });

    const sell = async (_tokenId: string, _price: string, _nftAddress: string, _currency: string) => {
        return contract.sell(_tokenId, _price, _nftAddress, _currency);
    };

    const buy = async (_orderId: string, _nftAddress: string, _currency: string, _price: string) => {
        return contract.buy(_orderId, _price, _nftAddress, _currency);
    };

    const cancel = async (_orderId: string, _nftAddress: string) => {
        return contract.cancelSell(_orderId, _nftAddress);
    }

    const getAllSales = async (_nftAddress: string, _status: number): Promise<SellItem[]> => {
        return contract.getAllSales(_nftAddress, _status);
    }

    return {
        contract,
        chainId: contract.provider.network?.chainId,
        sell,
        buy,
        cancel,
        getAllSales
    };
}

export default useMarketContract;