import { AppContext } from 'context/user';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';

import Logo from '../../../public/images/logo.png';

export default function Nav() {
  return (
    <div className='navbar mb-2 bg-neutral pr-8 text-neutral-content shadow-lg'>
      <div className='mx-2 w-28 flex-none px-2'>
        <Image src={Logo} alt='logo' />
      </div>
      <div className='mx-2 flex-1 items-center px-2'>
        <div className='hidden items-stretch lg:flex'>
          <Link href='/challenges' passHref>
            <a className='btn btn-ghost rounded-btn btn-sm'>Challenges</a>
          </Link>
          <Link href='/leaderboard' passHref>
            <a className='btn btn-ghost rounded-btn btn-sm'>Leaderboard</a>
          </Link>
        </div>
      </div>
      <AppContext.Consumer>
        {({ points }) => (
          <div className='flex-none text-sm font-bold uppercase'>
            {points} PTS
          </div>
        )}
      </AppContext.Consumer>
    </div>
  );
}
