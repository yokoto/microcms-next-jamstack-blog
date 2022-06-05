import type { NextPage, GetStaticProps, GetStaticPropsContext } from 'next'
import  { Blog } from '../../types/blog';
import  { Content } from '../../types/content';
import { Layout } from '../../components/Layout';
import { client } from '../../libs/client';
import format from "date-fns/format";
import styles from '../../../styles/Home.module.scss';

type Props = {
  blog: Blog
}

const BlogId: NextPage<Props> = (props: Props) => {
  const { blog } = props;

  return (
    <Layout>
      <main className={styles.main}>
        <h1 className={styles.title}>{blog.title}</h1>
        <p className={styles.publishedAt}>{format(Date.parse(blog.publishedAt) as number, "yyyy/MM/dd HH:mm")}</p>
        <p className="category">{blog.category && `${blog.category.name}`}</p>
        <div
          dangerouslySetInnerHTML={{
            __html: `${blog.body}`,
          }}
          className={styles.post}
        />
      </main>
    </Layout>
  );
}

export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "blog" });

  const paths = data.contents.map((content: Content) => `/blog/${content.id}`);
  return { paths, fallback: false };
};

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
