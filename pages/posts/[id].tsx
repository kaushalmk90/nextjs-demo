import Layout from "../../components/layout";
import { GetStaticPaths, GetStaticProps, GetServerSideProps } from "next";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Head from "next/head";
import utilStyles from "../../styles/utils.module.scss";

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <p>{postData.date}</p>
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}

// /**
//  * @note This function gets called at build time and lets you specify which paths you want to pre-render.
//  */
// export const getStaticPaths: GetStaticPaths = async () => {
//   // Return a list of possible value for id. Our route is pages/[id]
//   // { fallback: false } means other routes should result in 404.
//   const paths = getAllPostIds();
//   return {
//     paths,
//     fallback: false,
//   };
// };

// /**
//  * @note  This function gets called at build time and lets you pass fetched data to the page's props on pre-render.
//  */
// export const getStaticProps: GetStaticProps = async ({ params }) => {
//   // Fetch necessary data for the blog post using params.id. If route is /posts/1, then params.id = 1
//   console.log(params);
//   const postData = await getPostData(params.id);
//   return {
//     props: {
//       postData,
//     },
//   };
// };

/**
 * 
 * @note This function gets called at request time
 */
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const postData = await getPostData(params.id);
    return {
      props: {
        postData,
      },
    };
  };