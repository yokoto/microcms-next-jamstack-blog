import type { NextPage, GetStaticProps, GetStaticPropsContext } from 'next'
import type { Blog } from '../types/blog';

import Link from "next/link";
import { client } from "../libs/client";

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
// import Link from '../src/Link';
// import ProTip from '../src/ProTip';
import Copyright from '../Copyright';

type Props = {
  blogs: Blog[]
}

const Home: NextPage<Props> = (props: Props) => {
  const { blogs } = props;

  return (
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
        <Typography variant="h4" component="h1" gutterBottom>
          yokoto's tech blog
        </Typography>
        <ul>
        {blogs.map((blog: Blog) => (
          <li key={blog.id}>
            <Link href={`/blog/${blog.id}`}>
              <a>{blog.title}</a>
            </Link>
          </li>
        ))}
        </ul>
        <Copyright />
      </Box>
    </Container>
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
