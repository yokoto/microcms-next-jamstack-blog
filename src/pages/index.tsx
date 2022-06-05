import type { NextPage, GetStaticProps } from 'next'
import type { Blog } from '../types/blog';
import { Layout } from '../components/Layout';
import Link from "next/link";
import { client } from "../libs/client";
import format from "date-fns/format";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

type Props = {
  blogs: Blog[]
}

const Home: NextPage<Props> = (props: Props) => {
  const { blogs } = props;

  return (
    <Layout>
      <Container maxWidth="lg">
        <Box
          sx={{
            my: 4,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ul>
            {blogs.map((blog: Blog) => (
              <li style={{ listStyleType: "none" }} key={blog.id}>
                <span>
                  {format(Date.parse(blog.publishedAt) as number, "yyyy/MM/dd HH:mm")}&nbsp;
                  <Link href={`/blog/${blog.id}`}>
                    <a>{blog.title}</a>
                  </Link>
                </span>
              </li>
            ))}
          </ul>
        </Box>
      </Container>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const data = await client.get({ endpoint: "blog" });

  return {
    props: {
      blogs: data.contents,
    },
  };
};

export default Home;
