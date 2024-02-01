---
title: 'Hello, World!'
description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non lorem diam.'
coverImage: /media/calculator.png
author: content/author/eric-hu.md
publishedAt: 2023-11-14T16:00:00.000Z
---

## Hello World!

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non lorem diam. Quisque vulputate nibh sodales eros pretium tincidunt. Aenean porttitor efficitur convallis. Nulla sagittis finibus convallis. Phasellus in fermentum quam, eu egestas tortor. Maecenas ac mollis leo. Integer maximus eu nisl vel sagittis.

Suspendisse facilisis, mi ac scelerisque interdum, ligula ex imperdiet felis, a posuere eros justo nec sem. Nullam laoreet accumsan metus, sit amet tincidunt orci egestas nec. Pellentesque ut aliquet ante, at tristique nunc. Donec non massa nibh. Ut posuere lacus non aliquam laoreet. Fusce pharetra ligula a felis porttitor, at mollis ipsum maximus. Donec quam tortor, vehicula a magna sit amet, tincidunt dictum enim. In hac habitasse platea dictumst. Mauris sit amet ornare ligula, blandit consequat risus. Duis malesuada pellentesque lectus, non feugiat turpis eleifend a. Nullam tempus ante et diam pretium, ac faucibus ligula interdum.

```javascript
import { MDXRemote } from "next-mdx-remote/rsc";
import { readFile } from "fs/promises";
import matter from "gray-matter";
import rehypeHighlight from "rehype-highlight";
import client from "@/../tina/__generated__/client";
import { TinaMarkdown } from "tinacms/dist/rich-text";

export default async function RemoteMdxPage({
  params,
}: {
  params: { slug: string };
}) {
  const options = {
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [rehypeHighlight],
    },
  };

  try {
    const article = await client.queries.community({
      relativePath: `${params.slug}.md`,
    });

    console.log(JSON.stringify(article.data.community));
    // const markdown = await readFile(`src/content/community/${params.slug}.md`);
    // const { content, data } = matter(markdown);

    return (
    );
  } catch (err) {
    console.error(err);
  }
}

```

```javascript
<div className="grid grid-cols-12 gap-4">
  <div className="content col-span-12 md:col-span-9">
    {/* <MDXRemote source={article.data} options={options} /> */}
    <TinaMarkdown content={article.data.community.body} />
  </div>
  <aside className="col-span-12 md:col-span-8 md:col-start-5 lg:col-span-3 flex flex-col space-y-8 mt-5">
    <div>
      <div className="font-bold text-xl mb-2">📝 Recent Posts</div>
      <ul className="flex flex-col space-y-2"></ul>
    </div>

    <div>
      <div className="font-bold text-xl mb-2">
        📧 Subscribe to Our Newsletter
      </div>
    </div>
  </aside>
</div>
```

![](/media/calculator.png)
