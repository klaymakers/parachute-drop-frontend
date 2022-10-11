import { NFTStorage } from 'nft.storage';

interface uploadDelegationListProps {
  delegationList: File;
  name: string;
  description?: string;
}
export const uploadDelegationList = async ({
  delegationList,
  name,
  description = 'delegation List',
}: uploadDelegationListProps) => {
  const apiKey = process.env.NEXT_PUBLIC_DAO_FORCE_IMG_KEY;

  if (apiKey) {
    const delegationListStorage = new NFTStorage({ token: apiKey });

    const prefix = 'https://ipfs.io/ipfs/';

    const returnData = await delegationListStorage.store({
      image: delegationList,
      name,
      description,
    });

    const ipfsUrl = returnData?.data?.image?.pathname;

    return prefix + ipfsUrl.slice(2);
  }

  throw new Error('No API key found');
};
