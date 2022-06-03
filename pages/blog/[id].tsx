import type { NextPage, GetStaticProps, GetStaticPropsContext } from 'next'
import  { Blog } from '../../types/blog';
import  { Category } from '../../types/category';
import  { Content } from '../../types/content';

import { client } from '../../libs/client';
import styles from '../../styles/Home.module.scss';

type Props = {
  blog: Blog
}

const BlogId: NextPage<Props> = (props: Props) => {
  const { blog } = props;

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>{blog.title}</h1>
      <p className={styles.publishedAt}>{blog.publishedAt}</p>
      <p className="category">{blog.category && `${blog.category.name}`}</p>
      <div
        dangerouslySetInnerHTML={{
          __html: `${blog.body}`,
        }}
        className={styles.post}
      />
    </main>
  );
}

// 静的生成のためのパスを指定します
// Next.js側ではブログのidを知り得ないため、事前に生成するべきHTMLのパスが分かりません
// そこでこの関数内でデータを取得し、パスを定義してあげる必要があります
export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "blog" });

  const paths = data.contents.map((content: Content) => `/blog/${content.id}`);
  return { paths, fallback: false };
};

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps: GetStaticProps<Props> = async (
  context: GetStaticPropsContext<{ id?: string }>
) => {
  const params = context.params!
  const data = await client.get({ endpoint: "blog", contentId: params.id });

  return {
    props: {
      blog: data,
    },
  };
};

export default BlogId
