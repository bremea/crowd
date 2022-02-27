import * as React from 'react';
import * as Icons from 'react-feather';

import { udata } from '@/lib/typings';

export default class Bubbul extends React.Component<{ data: udata }, unknown> {
  render() {
    return (
      <div className='mt-12 w-full rounded-2xl bg-base-100 p-8  shadow-xl'>
        <div className='flex w-full items-center justify-between'>
          <div className='flex flex-col items-start'>
            <p className='font-bold'>Campus Library</p>
            <p className={getPPData(this.props.data?.percent as number).color}>
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
      </div>
    );
  }
}

function getPPData(percent: number) {
  if (percent >= 66) return { color: 'text-error', text: 'Very Busy' };
  else if (percent >= 33)
    return { color: 'text-warning', text: 'Somewhat Busy' };
  else return { color: 'text-success', text: 'Not Very Busy' };
}
