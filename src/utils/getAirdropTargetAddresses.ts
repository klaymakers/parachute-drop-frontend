// getAirdropTargetAddresses

import { JSONRPC_PROVIDER } from '@src/constants';
import { airdropAbi } from '@src/lib/klaytnAbi';
import { ethers } from 'ethers';

export const getAirdropTargetAddresses = async (airdropAddress: string) => {
  const provider = new ethers.providers.JsonRpcProvider(JSONRPC_PROVIDER);
  const AirdropContract = new ethers.Contract(airdropAddress, airdropAbi, provider);

  return await AirdropContract.getAirdropTargetAddresses();
};
