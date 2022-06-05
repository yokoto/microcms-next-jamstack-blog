import { NextPage } from 'next'
import { Layout } from '../components/Layout';

const Custom404: NextPage= () => {
  return (
    <Layout>
      <main className="main">
        <p>ページがありません。</p>
      </main>
    </Layout>
  );
}

export default Custom404;
