

import { getCollection } from 'astro:content';



/**
 * 获取指定目录下的所有文章
 *
 * @async
 * @returns {unknown}
 */
export const getBlogPosts = async (...args:any) => {
    const posts = (await getCollection('blog',...args)).sort(
        (a, b) => a.data.pubDate.valueOf() - b.data.pubDate.valueOf()
    );
    return posts;
}

