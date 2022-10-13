import { JSONRPC_PROVIDER } from '@src/constants';
import { airdropAbi } from '@src/lib/klaytnAbi';
import { ethers } from 'ethers';

export const getAirdropSnapshotTimestamps = async (airdropAddress: string) => {
  // const provider = ethers.providers.getDefaultProvider('goerli');
  const provider = new ethers.providers.JsonRpcProvider(JSONRPC_PROVIDER);
  const AirdropContract = new ethers.Contract(airdropAddress, airdropAbi, provider);

  // return await AirdropContract.getAirdropSnapshotTimestamps();

  const unixTimeList = await AirdropContract.getAirdropSnapshotTimestamps();

  return unixTimeList.map((item: any) => {
    const unixTime = item._hex;
    const parsedUnixTime = new Date(parseInt(unixTime) * 1000);

    return new Date(parsedUnixTime).toLocaleString();
  });
};
