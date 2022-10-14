import { infoStoreContractAddress, JSONRPC_PROVIDER } from '@src/constants';
import { infoStoreAbi } from '@src/lib/klaytnAbi';
import { ethers } from 'ethers';

export const findAllEligibleAirdroppedTokenByUser = async (userAddress: Nullable<string>) => {
  // const provider = ethers.providers.getDefaultProvider('goerli');
  // const provider = new ethers.providers.JsonRpcProvider('https://eth.bd.evmos.dev:8545');
  // const ContractInfoStore = new ethers.Contract(STORE_ADDRESS, abi, provider);
  const provider = new ethers.providers.JsonRpcProvider(JSONRPC_PROVIDER);
  const ContractInfoStore = new ethers.Contract(infoStoreContractAddress, infoStoreAbi, provider);

  return await ContractInfoStore.findAirdropTokenAddressListByUserAddr(userAddress);
};
