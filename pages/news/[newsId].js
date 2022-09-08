// our-domain.com/news/:newsId

import { useRouter } from 'next/router';

function NewsPage(){
    // There are much more to learn about this hook.
    const router = useRouter();

    const dynamicId = router.query.newsId;

    return(<h1>News Page</h1>)
}

export default NewsPage;