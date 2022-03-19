import { useQuery } from 'react-query';
import useMarketContract from './useMarketContract';
import useNftContract from './useNftContract';
import truncateMiddle from "truncate-middle";

interface useSellItemsQuery {
    nftAddress: string;
}

function useSellItems({ nftAddress }: useSellItemsQuery) {
    const contract = useMarketContract();
    const nftContract = useNftContract();

    return useQuery(
        ["SellItems", { nftAddress, chainId: contract.chainId }], 
        async () => {
            const items = await contract.getAllSales(nftAddress, 0)
            const rqs = [];
            const result = [];
            
            for (let item of items) {
                console.log(item);
                
                rqs.push(async () => {
                    const heroInfo = await nftContract.getHero(item.tokenId + '');
                    
                    result.push({
                        info: {
                            tokenId: heroInfo.tokenId,
                            occupation: heroInfo.occupation,
                            level: heroInfo.level,
                            strength: heroInfo.strength,
                            agility: heroInfo.agility,
                            stamina: heroInfo.stamina,
                            will: heroInfo.will,
                            intelligence: heroInfo.intelligence,
                            mind: heroInfo.mind,
                            fatigue: String(heroInfo.fatigue),
                            newbie: heroInfo.newbie,  // 新手卡
                        },
                        id: String(item.id),
                        tokenId: truncateMiddle(String(item.tokenId) || "", 5, 4, "******"),
                        tokenIdBN: item.tokenId,
                        nft: item.nft,
                        currency: String(item.currency),
                        seller: item.seller,
                        buyer: item.buyer,
                        startTime: String(item.startTime),
                        price: Number(item.price) / 10 ** 18,
                        status: item.status,
                    });
                })
            }

            await Promise.all(rqs.map(rq => rq()));
            console.log(result);
            return result;
        }
    );
}

export default useSellItems;