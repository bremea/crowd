import * as React from 'react';
import * as Icons from 'react-feather';
import Cookies from 'universal-cookie';

import { udata } from '@/lib/typings';

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
      gym: udata;
    } | null;
    starred: null | string;
  }
> {
  constructor(props: unknown) {
    super(props);

    this.updateStarred = this.updateStarred.bind(this);

    this.state = {
      loading: true,
      data: null,
      starred: null,
    };
  }

  updateStarred(id: string) {
    this.setState({ starred: id });
  }

  async componentDidMount() {
    const library = await (await fetch('/api/level/library')).json();
    const study = await (await fetch('/api/level/study')).json();
    const cyber = await (await fetch('/api/level/cyber')).json();
    const music = await (await fetch('/api/level/music')).json();
    const gym = await (await fetch('/api/level/gym')).json();
    this.setState({
      loading: false,
      data: {
        library: library,
        study: study,
        cyber: cyber,
        music: music,
        gym: gym,
      },
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
      const cookies = new Cookies();
      let keys = Object.keys(
        this.state.data as {
          [key: string]: udata;
        }
      );
      const s = this.state.starred ?? cookies.get('starred');
      if (keys.includes(s)) {
        keys = keys.filter((item) => item !== s);
        keys.unshift(s);
      }
      return (
        <Layout>
          <Seo />
          <main className='w-full bg-top'>
            <section className='w-full'>
              <div className='layout flex min-h-screen w-full flex-col items-center justify-center text-center'>
                <h1 className='mt-24 text-xl font-black text-white'>Crowd @</h1>
                <h1 className='mb-7 text-5xl font-black text-white'>
                  Bremea University
                </h1>
                <p className='mb-12 text-white'>
                  Check real-time crowd levels on campus with Crowd.
                  <br />
                  Know before you go.
                </p>

                <div className='mt-12 w-full cursor-pointer rounded-2xl bg-base-100 p-8 shadow-xl'>
                  <div className='flex flex-wrap justify-between'>
                    <div className='flex'>
                      <Icons.AlertCircle className='mr-4' />
                      <p>Important COVID Updates</p>
                    </div>
                    <Icons.ArrowRight />
                  </div>
                </div>

                {keys.map((keyName, i) => (
                  <Bubbul
                    key={i}
                    data={
                      (
                        this.state.data as {
                          [key: string]: udata;
                        }
                      )[keyName]
                    }
                    starred={cookies.get('starred') === keyName}
                    updateStarred={this.updateStarred}
                  />
                ))}
              </div>

              <footer className='mt-24 pb-2 text-center text-sm text-white opacity-70'>
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
