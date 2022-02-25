import Image from 'next/image';
import Logo from 'public/images/logo.png';
import * as React from 'react';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

export default function HomePage() {
  return (
    <Layout>
      <Seo />
      <main>
        <section>
          <div className='layout flex min-h-screen w-96 flex-col items-center justify-center text-center'>
            <div className='w-64'>
              <Image src={Logo} alt='logo' />
            </div>
            <h1 className='mt-4'>CHC Crowd</h1>
            <footer className='absolute bottom-2 text-gray-700'>
              © {new Date().getFullYear()} Brett Meadows
            </footer>
          </div>
        </section>
      </main>
    </Layout>
  );
}
