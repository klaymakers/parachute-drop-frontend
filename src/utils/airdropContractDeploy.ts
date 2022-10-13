import { infoStoreContractAddress } from '@src/constants';
import { airdropAbi } from '@src/lib/klaytnAbi';
import { airdropByteCode } from '@src/lib/klaytnByteCode';
import { NewAirdropType } from '@src/pages/new_airdrop';
import { ethers, utils } from 'ethers';

import { getTimestampArray } from './getTimstampArray';
export const airdropContractDeploy = async ({
  treasuryAddress,
  startDate,
  rounds,
  interval,
  duration,
  isDelegate,
  delegationList,
  whiteList,
}: any) => {
  console.log('startDate, interval, rounds', startDate, interval, rounds);
  const airdropTimestamp = getTimestampArray(startDate, interval, rounds);

  console.log('airdropTimestamp', airdropTimestamp);
  const targetAddresseList = whiteList?.map((o) => ethers.utils.getAddress(o?.address));
  let totalValue = 0;
  const targetAmountList = whiteList?.map((o) => {
    if (o?.amounts === undefined) {
      throw Error('invalid csv file format');
    }
    totalValue += Number(o?.amounts);
    console.log('totalValue', totalValue);

    return utils.parseEther(o?.amounts?.toString());
  });

  const tokenContractAddress = localStorage.getItem('tokenContractAddress');

  const totalValuePerRound = utils.parseEther(totalValue.toString());
  const signer = new ethers.providers.Web3Provider((window as any).ethereum).getSigner();

  console.log('SIGNER >>>>>>>>>>>>>>>>>>>>>>>>>>>>', signer);
  const airdropFactory = new ethers.ContractFactory(airdropAbi, airdropByteCode, signer);

  console.log('>>>>>>>>>>>>>>>>>>> AIRDROP FACTORY >>>>>>>>>>>>>>>>>', airdropFactory);

  console.log(
    'tokenContractAddr',
    tokenContractAddress,
    'airdrop',
    airdropTimestamp,
    'duration',
    duration,
    'rounds',
    rounds,
    'targetList',
    targetAddresseList,
    'targetAmount',
    targetAmountList,
    'perRound',
    totalValuePerRound,
    'store',
    infoStoreContractAddress,
  );

  const result = await airdropFactory.deploy(
    tokenContractAddress,
    airdropTimestamp,
    duration,
    rounds,
    targetAddresseList,
    targetAmountList,
    totalValuePerRound,
    infoStoreContractAddress,
  );

  // const receipt = await result.deployed();

  // const receipt2 = await result.deployTransaction.wait();

  // console.log('>>>>>>>>>> RESULT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', receipt2);

  console.log(result.address);

  return result.address;
};
