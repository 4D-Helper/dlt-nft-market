import { useQuery } from 'react-query';
import useMarketContract from './useMarketContract';
import useNftContract from './useNftContract';
import truncateMiddle from "truncate-middle";
import { CURRENCY } from '../constants'
import { getAllProps } from '../utils/role';

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
            const result = [];
            
            for (let item of items) {
                const heroInfo = await nftContract.getHero(item.tokenId + '');
                result.push({
                    info: {
                        tokenId: heroInfo.tokenId,
                        occupation: heroInfo.occupation,
                        level: heroInfo.level,
                        fatigue: String(heroInfo.fatigue),  // 疲劳
                        strength: heroInfo.strength,
                        agility: heroInfo.agility,
                        stamina: heroInfo.stamina,
                        will: heroInfo.will,
                        intelligence: heroInfo.intelligence,
                        mind: heroInfo.mind,
                        newbie: heroInfo.newbie,  // 新手卡
                        totalAttribute: getAllProps({
                            strength: heroInfo.strength,
                            agility: heroInfo.agility,
                            stamina: heroInfo.stamina,
                            will: heroInfo.will,
                            intelligence: heroInfo.intelligence,
                            mind: heroInfo.mind,
                        }),
                    },
                    id: String(item.id),
                    tokenId: truncateMiddle(String(item.tokenId) || "", 5, 4, "******"),
                    tokenIdBN: item.tokenId,
                    nft: item.nft,
                    seller: item.seller,
                    buyer: item.buyer,
                    startTime: String(item.startTime),
                    price: `${Number(item.price) / 10 ** 18} ${CURRENCY[String(item.currency)] ?? 'USDT'}`,
                    status: item.status,
                });
            }

            console.log(result);
            return result;
        }
    );
}

export default useSellItems;