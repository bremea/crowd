import * as React from 'react';
import * as Icons from 'react-feather';
import Cookies from 'universal-cookie';

import { udata } from '@/lib/typings';

export default class Bubbul extends React.Component<
  { data: udata; starred: boolean; updateStarred: (id: string) => void },
  { showNotifs: number; height: number; phoneNum: string }
> {
  constructor(props: {
    data: udata;
    starred: boolean;
    updateStarred: () => void;
  }) {
    super(props);

    this.state = { showNotifs: 0, height: 0, phoneNum: '' };
  }

  render() {
    if (this.state.showNotifs === 1) {
      return (
        <div className='relative mt-12 flex w-full flex-col items-center justify-center rounded-2xl bg-base-100 p-8 shadow-xl'>
          <p>
            Enter your phone number to get notified for{' '}
            <span className='font-bold'>{this.props.data.name}</span>
          </p>
          <p className='text-sm'>
            We&apos;ll send you a text message when crowd levels are low.
          </p>
          <div className='form-control mt-4'>
            <div className='input-group'>
              <input
                type='tel'
                placeholder='Phone Number'
                defaultValue='+1'
                className='input-bordered input'
                id={`phone-${this.props.data.id}`}
              />
              <a
                className='btn input-bordered btn-square bg-base-200'
                onClick={async () => {
                  const val = (
                    document.getElementById(
                      `phone-${this.props.data.id}`
                    ) as HTMLInputElement
                  ).value;
                  this.setState({ phoneNum: val });
                  await fetch('/api/phone', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      id: this.props.data.id,
                      phoneNum: val,
                    }),
                  });
                  this.setState({ showNotifs: 2 });
                }}
              >
                <Icons.ArrowRight />
              </a>
            </div>
          </div>
        </div>
      );
    } else if (this.state.showNotifs === 2) {
      return (
        <div className='relative mt-12 flex w-full flex-col items-center justify-center rounded-2xl bg-base-100 p-8 shadow-xl'>
          <p>
            You&apos;re now getting notifs for{' '}
            <span className='font-bold'>{this.props.data.name}</span>
          </p>
          <p className='text-sm'>Reply at any time with STOP to opt-out.</p>
        </div>
      );
    } else {
      return (
        <div className='mt-12 w-full rounded-2xl bg-base-100 p-8 shadow-xl'>
          <div className='flex w-full items-center justify-between'>
            <div className='flex flex-col items-start'>
              <div className='flex'>
                <p className='font-bold'>{this.props.data.name}</p>
                <a
                  className='btn btn-ghost btn-square btn-xs ml-2 opacity-70'
                  onClick={() => this.setState({ showNotifs: 1 })}
                >
                  <Icons.Bell className='h-4 w-4' />
                </a>
                <a className='btn btn-ghost btn-square btn-xs ml-1 opacity-70'>
                  <Icons.Star
                    className={`h-4 w-4 ${
                      this.props.starred ? 'text-warning' : ''
                    }`}
                    onClick={() => {
                      const cookies = new Cookies();
                      cookies.set('starred', this.props.data.id, { path: '/' });
                      this.props.updateStarred(this.props.data.id);
                    }}
                  />
                </a>
              </div>
              <p
                className={getPPData(this.props.data?.percent as number).color}
              >
                {getPPData(this.props.data?.percent as number).text}
              </p>
            </div>
            <div
              className={`radial-progress ${
                getPPData(this.props.data?.percent as number).color
              }`}
              style={
                {
                  '--value': this.props.data?.percent,
                } as React.CSSProperties
              }
            >
              {this.props.data?.percent}%
            </div>
          </div>
          <div className='divider'></div>
          <div className='flex flex-col items-center justify-between md:flex-row'>
            <div className='flex items-center'>
              <div className='flex h-10 w-10 items-center justify-center rounded-full bg-info bg-opacity-20'>
                <Icons.Clock className='text-info' />
              </div>
              <p className='ml-2'>
                The busiest hour here is{' '}
                <span className='text-info'>
                  {(this.props.data?.maxHour as number) > 12
                    ? (this.props.data?.maxHour as number) - 12
                    : (this.props.data?.maxHour as number)}
                  {(this.props.data?.maxHour as number) > 12 ? 'pm' : 'am'}
                </span>
              </p>
            </div>
            <div className='mt-4 flex w-full flex-col md:mt-0 md:w-1/3'>
              <div className='flex items-center'>
                <progress
                  className='progress progress-info my-1 w-full opacity-20'
                  value={this.props.data.hourly[0]}
                  max={this.props.data.max}
                ></progress>
                <p className='ml-2 text-xs opacity-70'>12a</p>
              </div>
              <div className='flex items-center'>
                <progress
                  className='progress progress-info my-1 w-full opacity-20'
                  value={this.props.data.hourly[4]}
                  max={this.props.data.max}
                ></progress>
                <p className='ml-2 text-xs opacity-70'>4a</p>
              </div>
              <div className='flex items-center'>
                <progress
                  className='progress progress-info my-1 w-full opacity-20'
                  value={this.props.data.hourly[8]}
                  max={this.props.data.max}
                ></progress>
                <p className='ml-2 text-xs opacity-70'>8a</p>
              </div>
              <div className='flex items-center'>
                <progress
                  className='progress progress-info my-1 w-full opacity-20'
                  value={this.props.data.hourly[12]}
                  max={this.props.data.max}
                ></progress>
                <p className='ml-2 text-xs opacity-70'>12p</p>
              </div>
              <div className='flex items-center'>
                <progress
                  className='progress progress-info my-1 w-full opacity-20'
                  value={this.props.data.hourly[16]}
                  max={this.props.data.max}
                ></progress>
                <p className='ml-2 text-xs opacity-70'>4p</p>
              </div>
              <div className='flex items-center'>
                <progress
                  className='progress progress-info my-1 w-full opacity-20'
                  value={this.props.data.hourly[20]}
                  max={this.props.data.max}
                ></progress>
                <p className='ml-2 text-xs opacity-70'>8p</p>
              </div>
            </div>
          </div>
        </div>
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
