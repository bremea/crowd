import Image from 'next/image';
import Logo from 'public/images/logo.png';
import * as React from 'react';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */

export default function LeaderboardPage() {
  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

      <main>
        <section>
          <div className='layout flex min-h-screen flex-col items-center justify-center text-center'>
            <div className='w-64'>
              <Image src={Logo} alt='logo' />
            </div>
            <h1 className='mt-4'>Calvert Hall CTF</h1>
            <br />
            <div className='form-control'>
              <div className='relative'>
                <input
                  type='text'
                  placeholder='Team Code'
                  className='input-bordered input-primary input w-full pr-16'
                />
                <button className='btn btn-primary absolute top-0 right-0 rounded-l-none'>
                  go
                </button>
              </div>
            </div>
            <footer className='absolute bottom-2 text-gray-700'>
              © {new Date().getFullYear()} Calvert Hall
            </footer>
          </div>
        </section>
      </main>
    </Layout>
  );
}
