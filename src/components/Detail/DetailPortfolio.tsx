import AirdropMacro from '@src/assets/AirdropMacro.svg';
import CurrentRound from '@src/assets/CurrentRound.svg';
import LoyaltyCheck from '@src/assets/LoyaltyCheck.svg';
import React from 'react';

import Title from '../CreateSpace/Title';

function DetailPortfolio() {
  return (
    <section className="flex flex-col justify-center">
      <div className="mt-[37.5px] mb-[32.5px]">
        <Title>Current Round</Title>
        <CurrentRound />
      </div>
      {/* <IBC className="mb-[106px]" /> */}
      <div className="mt-[37.5px] mb-[32.5px]">
        <Title>Airdrop Macro</Title>
        <AirdropMacro />
      </div>
      <div className="mt-[37.5px] mb-[32.5px]">
        <Title>Loyalty Check</Title>
        <LoyaltyCheck />
      </div>
    </section>
  );
}

export default DetailPortfolio;
