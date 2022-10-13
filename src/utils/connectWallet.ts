import { KeplrWallet } from '@src/types';
import networkInfo from '@src/utils/chainInfo';
const KLAYTN_TESTNET_INFO = networkInfo['klaytn_1001'];

export type walletIdType = 'metamask' | 'kaikas';

export const isLogout = () => {
  return (
    localStorage.getItem('ownerAddress') === '' ||
    localStorage.getItem('ownerAddress') === undefined
  );
};

export const communicateWithWallet = async (
  walletId: walletIdType,
): Promise<string | undefined> => {
  console.log('walletId', walletId);

  if (walletId === 'metamask') {
    const address = await getMetamaskAddress();

    return address;
  }

  // kaikas wallet
  const address = await getKaikasAddress();

  return address;
};

export const getMetamaskAddress = async () => {
  try {
    const { ethereum } = window;

    if (!ethereum) {
      alert('Get MetaMask!');

      return;
    }

    const accounts = (await ethereum.request({ method: 'eth_requestAccounts' })) as Array<string>;

    console.log('Connected', accounts[0]);
    localStorage.setItem('ownerAddress', accounts[0]);

    return accounts[0];
  } catch (error) {
    console.log(error);
  }
};

export const getKaikasAddress = async () => {
  try {
    if (!window.klaytn) {
      alert('Please install kaikas extension');

      return;
    }

    if (window.klaytn.experimentalSuggestChain) {
      try {
        await window.klaytn.experimentalSuggestChain(KLAYTN_TESTNET_INFO);
      } catch {
        alert('Failed to suggest the chain');
      }
    }

    const addressList = await window.klaytn.enable(KLAYTN_TESTNET_INFO.chainId);

    localStorage.setItem('ownerAddress', addressList[0]);

    return addressList[0];
  } catch (error) {
    console.log(error);
  }
};
