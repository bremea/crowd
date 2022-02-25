import { AppProps } from 'next/app';
import App from 'next/app';

import '@/styles/globals.css';

import Layout from '@/components/layout/Layout';

import { AppContext } from '../../context/user';
import { AppState } from '../../types/states';

class MyApp extends App {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      points: 100,
    } as AppState;
  }

  async componentDidMount() {
    const userData = await (await fetch('api.')).json();
    if (userData.code === 403) {
      window.location.replace(
        'https://discord.com/api/oauth2/authorize?client_id=874820005722742804&redirect_uri=http%3A%2F%2Flocalhost%3A3002%2Fapi%2Fv2%2Fauth&response_type=code&scope=identify%20guilds.join'
      );
    } else {
      this.setState({ loading: false, userData: userData });
    }
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Layout>
        <AppContext.Provider value={this.state}>
          <Component {...pageProps} />
        </AppContext.Provider>
      </Layout>
    );
  }
}

export default MyApp;
