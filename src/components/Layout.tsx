import * as React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export type Props = {
  children: React.ReactNode
}

export const Layout: React.FC<Props> = (props: Props) => {
  const { children } = props

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
};
