import * as React from 'react';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

export default class HomePage extends React.Component<
  unknown,
  {
    loading: boolean;
    data: {
      library: { current: number; max: number; percent: number };
      study: { current: number; max: number; percent: number };
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
    this.setState({ loading: false, data: { library: library, study: study } });
  }

  render() {
    if (this.state.loading) {
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
          <main className='w-full'>
            <section className='w-full'>
              <div className='layout flex min-h-screen w-full flex-col items-center justify-center text-center'>
                <h1 className='mt-4 text-primary'>Crowd</h1>
                <p>
                  Check real-time crowd levels with Crowd. Know before you go.
                </p>

                <div className='mt-12 flex w-full items-center justify-between rounded-full p-8 shadow-xl'>
                  <div className='flex flex-col items-start'>
                    <p className='font-bold'>Campus Library</p>
                    <p
                      className={
                        getPPData(this.state.data?.library.percent as number)
                          .color
                      }
                    >
                      {
                        getPPData(this.state.data?.library.percent as number)
                          .text
                      }
                    </p>
                  </div>
                  <div
                    className={`radial-progress ${
                      getPPData(this.state.data?.library.percent as number)
                        .color
                    }`}
                    style={
                      {
                        '--value': this.state.data?.library.percent,
                      } as React.CSSProperties
                    }
                  >
                    {this.state.data?.library.percent}%
                  </div>
                </div>
                <div className='mt-12 flex w-full items-center justify-between rounded-full p-8 shadow-xl'>
                  <div className='flex flex-col items-start'>
                    <p className='font-bold'>Study Hall</p>
                    <p
                      className={
                        getPPData(this.state.data?.study.percent as number)
                          .color
                      }
                    >
                      {getPPData(this.state.data?.study.percent as number).text}
                    </p>
                  </div>
                  <div
                    className={`radial-progress ${
                      getPPData(this.state.data?.study.percent as number).color
                    }`}
                    style={
                      {
                        '--value': this.state.data?.study.percent,
                      } as React.CSSProperties
                    }
                  >
                    {this.state.data?.study.percent}%
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
  }
}

function getPPData(percent: number) {
  if (percent >= 66) return { color: 'text-error', text: 'Very Busy' };
  else if (percent >= 33)
    return { color: 'text-warning', text: 'Somewhat Busy' };
  else return { color: 'text-success', text: 'Not Very Busy' };
}
