import type { NextPage, GetStaticProps, GetStaticPropsContext } from 'next'
import type { Blog } from '../types/blog';

import Link from "next/link";
import { client } from "../libs/client";

type Props = {
  blogs: [Blog]
}

const Home: NextPage<Props> = (props: Props) => {
  const { blogs } = props;

  return (
    <div>
      <ul>
        {blogs.map((blog: Blog) => (
          <li key={blog.id}>
            <Link href={`/blog/${blog.id}`}>
              <a>{blog.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// データをテンプレートに受け渡す部分の処理を記述します
// これは、ビルド時にサーバー側で呼ばれる関数です
// この部分の処理は最終的にバンドルJSに含まれません
// ビルド時にデータを取得し、静的なHTMLを出力するために必要です
export const getStaticProps: GetStaticProps<Props> = async () => {
  const data = await client.get({ endpoint: "blog" });

  return {
    props: {
      blogs: data.contents,
    },
  };
};

export default Home;
