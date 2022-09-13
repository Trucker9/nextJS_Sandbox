import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

// This function fetches data from markdown files. but usually we use a database to fetch data.

export function getSortedPostsData() {
    // Instead of the file system,
    // fetch post data from an external API endpoint
    // const res = await fetch('..');
    // return res.json();

    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map((fileName) => {

        const id = fileName.replace(/\.md$/, '');


        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');


        const matterResult = matter(fileContents);

        return {
            id,
            ...matterResult.data,
        };
    });

    return allPostsData.sort(({ date: a }, { date: b }) => {
        if (a < b) {
            return 1;
        } else if (a > b) {
            return -1;
        } else {
            return 0;
        }
    });
}