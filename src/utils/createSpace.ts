import { infoStoreContractAddress, JSONRPC_PROVIDER } from '@src/constants';
import { tokenAbi } from '@src/lib/klaytnAbi';
import { tokenByteCode } from '@src/lib/klaytnByteCode';
import { CreateSpaceFormType } from '@src/pages/create_space';
// import Caver from 'caver-js';
import { ethers } from 'ethers';

export const createSpace = async ({
  homepage,
  image,
  intro,
  ownerAddress,
  spaceName,
  tokenName,
  tokenSupply,
  tokenSymbol,
}: CreateSpaceFormType) => {
  // const provider = new ethers.providers.JsonRpcProvider(JSONRPC_PROVIDER);
  // // Prompt user for account connections
  // console.log(' PROVIDER >>>>>>>>> ', provider);

  // const signer = provider.getSigner(ownerAddress);

  // console.log('Account:', await signer.getAddress());
  // const caver = new Caver(window.klaytn);

  // const signer = await caver.wallet.sign(ownerAddress, infoStoreContractAddress);
  // const signer = new ethers.providers.Web3Provider(window.klaytn).getSigner();

  const signer = new ethers.providers.Web3Provider((window as any).ethereum).getSigner();

  console.log(' signer >>>>>>>>> ', signer);

  const tokenFactory = new ethers.ContractFactory(tokenAbi, tokenByteCode, signer);

  const tokenContract = await tokenFactory.deploy(
    tokenName,
    tokenSymbol,
    spaceName,
    intro,
    image,
    homepage,
    tokenSupply,
    infoStoreContractAddress,
  );

  console.log(
    '>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> TOKEN CONTRACT ',
    tokenName,
    tokenSymbol,
    spaceName,
    intro,
    image,
    homepage,
    tokenSupply,
    infoStoreContractAddress,
  );

  localStorage.setItem('tokenContractAddress', tokenContract.address);
  console.log('token contract address', tokenContract.address);
};
