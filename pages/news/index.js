import Link from 'next/link'
import {Fragment} from "react";


// our-domain/news
function NewsPage(){

    return(
        <Fragment>
            <ul>
                <li>
                    <Link href="/news/nextjs-is-a-great-framework">NextJS is a great framework</Link>
                </li>
            </ul>
            <h1>News Page</h1>
        </Fragment>


    )
}

export default NewsPage;