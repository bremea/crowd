import * as React from 'react';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

export default function HomePage() {
  return (
    <Layout>
      <Seo />
      <main className='w-full'>
        <section className='w-full'>
          <div className='layout flex min-h-screen w-full flex-col items-center justify-center text-center'>
            <h1 className='mt-4 text-primary'>Crowd</h1>
            <div className='mt-12 flex w-full items-center justify-between rounded-full p-8 shadow-xl'>
              <div className='flex flex-col items-start'>
                <p className='font-bold'>Dining Hall</p>
                <p className='text-warning'>Very Busy</p>
              </div>
              <div
                className='radial-progress text-warning'
                style={{ '--value': '72' } as React.CSSProperties}
              >
                72%
              </div>
            </div>
            <footer className='absolute bottom-2 text-sm text-gray-700'>
              © {new Date().getFullYear()} Brett Meadows
              <br />
              Made for Buildergroop Hackathon #1
            </footer>
          </div>
        </section>
      </main>
    </Layout>
  );
}
