import * as wagmi from "wagmi";
import { useProvider, useSigner } from "wagmi";
import NFTABI from "../constants/nft.js";

export interface HeroInfo {
    tokenId: string;
    occupation: string;
    level: string;
    strength: string;
    agility: string;
    stamina: string;
    will: string;
    intelligence: string;
    mind: string;
    fatigue: string;
    newbie: string;
}

function useMarketContract() {
    const [signer] = useSigner();
    const provider = useProvider();

    const contract = wagmi.useContract({
        addressOrName: "0x307135A29962F0B338C0103E06e8E7d03bd7267F",
        contractInterface: NFTABI,
        signerOrProvider: signer.data || provider,
    });

    const getHero = async (_tokenId: string): Promise<HeroInfo> => {
        return contract.getHero(_tokenId);
    };

    return {
        contract,
        chainId: contract.provider.network?.chainId,
        getHero
    };
}

export default useMarketContract;