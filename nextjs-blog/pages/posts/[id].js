import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../lib/posts';

// Returns the data for the page using its id.
export async function getStaticProps({ params }) {
    const postData = getPostData(params.id);
    return {
        props: {
            postData,
        },
    };
}


// Returns list of possible values for [id]
export async function getStaticPaths() {
    const paths = getAllPostIds();

    return {
        paths,
        fallback: false,
    };
}


export default function Post({ postData }) {
    return (
        <Layout>
            {postData.title}
            <br />
            {postData.id}
            <br />
            {postData.date}
        </Layout>
    );
}