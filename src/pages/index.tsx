import * as React from 'react';

import Bubbul from '@/components/Bubbul';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

export default class HomePage extends React.Component<
  unknown,
  {
    loading: boolean;
    data: {
      library: udata;
      study: udata;
      cyber: udata;
      music: udata;
    } | null;
  }
> {
  constructor(props: unknown) {
    super(props);

    this.state = {
      loading: true,
      data: null,
    };
  }

  async componentDidMount() {
    const library = await (await fetch('/api/level/library')).json();
    const study = await (await fetch('/api/level/study')).json();
    const cyber = await (await fetch('/api/level/cyber')).json();
    const music = await (await fetch('/api/level/music')).json();
    this.setState({
      loading: false,
      data: { library: library, study: study, cyber: cyber, music: music },
    });
  }

  render() {
    if (this.state.loading || !this.state.data) {
      return (
        <Layout>
          <Seo />
          <main className='w-full'>
            <section className='w-full'>
              <div className='flex h-screen w-screen items-center justify-center'>
                <div className='loading btn btn-primary btn-square btn-lg'></div>
              </div>
            </section>
          </main>
        </Layout>
      );
    } else {
      return (
        <Layout>
          <Seo />
          <main className='w-full bg-base-200'>
            <section className='w-full'>
              <div className='layout flex min-h-screen w-full flex-col items-center justify-center text-center'>
                <h1 className='mt-4 text-primary'>Crowd</h1>
                <p>
                  Check real-time crowd levels on campus with Crowd. Know before
                  you go.
                </p>

                <Bubbul data={this.state.data?.library} />
                <Bubbul data={this.state.data?.study} />
                <Bubbul data={this.state.data?.cyber} />
                <Bubbul data={this.state.data?.music} />
              </div>

              <footer className='mt-24 pb-2 text-center text-sm text-gray-700'>
                © {new Date().getFullYear()} Brett Meadows
                <br />
                Made for Buildergroop Hackathon Season 1
              </footer>
            </section>
          </main>
        </Layout>
      );
    }
  }
}

interface udata {
  current: number;
  max: number;
  maxHour: number;
  hourly: Array<number>;
  percent: number;
}
