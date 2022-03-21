import { useQuery } from 'react-query';
import useMarketContract from './useMarketContract';
import useNftContract from './useNftContract';
import truncateMiddle from "truncate-middle";
import { CURRENCY } from '../constants'
import { getAllProps, RoleMap } from '../utils/role';
import { useSigner } from 'wagmi';

interface useSellItemsQuery {
    nftAddress: string;
}

function useSellItems({ nftAddress }: useSellItemsQuery) {
    const contract = useMarketContract();
    const nftContract = useNftContract();
    const [signer] = useSigner();

    return useQuery(
        ["SellItems", { nftAddress, chainId: contract.chainId }], 
        async () => {
            const items = await contract.getAllSales(nftAddress, 0)
            const result = [];
            const userSelf = [];
            
            const getHero = async (item) => {
                const heroInfo = await nftContract.getHero(item.tokenId + '');
                const formatHeroInfo = {
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
                        role: RoleMap[heroInfo.occupation]
                    },
                    id: String(item.id),
                    tokenId: truncateMiddle(String(item.tokenId) || "", 5, 4, "******"),
                    tokenIdBN: item.tokenId,
                    nft: item.nft,
                    seller: item.seller,
                    buyer: item.buyer,
                    startTime: String(item.startTime),
                    price: `${Number(item.price) / 10 ** 18} ${CURRENCY[String(item.currency)] ?? 'USDT'}`,
                    priceBN: item.price,
                    status: item.status,
                };
                const isUserSelf = formatHeroInfo.seller.toLowerCase() === (await signer.data?.getAddress())?.toLowerCase();
                console.log(isUserSelf);
                result.push(formatHeroInfo);
                isUserSelf && userSelf.push(formatHeroInfo);
            }

            await Promise.all(items.map(item => getHero(item)));
            return result;
        }
    );
}

export default useSellItems;