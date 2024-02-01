import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "media",
      publicFolder: "public",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        name: "author",
        label: "Author",
        path: "content/author",
        fields: [
          {
            type: "string",
            name: "name",
            label: "Name",
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            required: true,
          },
          {
            type: "image",
            name: "image",
            label: "Image",
            required: true,
          },
          {
            type: "string",
            name: "websiteLink",
            label: "Website Link",
            required: false,
          },
          {
            type: "string",
            name: "githubLink",
            label: "GitHub",
            required: false,
          },
          {
            type: "string",
            name: "twitterLink",
            label: "Twitter",
            required: false,
          },
        ],
      },
      {
        name: "community",
        label: "Community",
        path: "content/community",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            required: true,
          },
          {
            type: "image",
            name: "coverImage",
            label: "Cover Image",
            required: true,
          },
          {
            label: "Author",
            name: "author",
            type: "reference",
            collections: ["author"],
          },
          {
            type: "datetime",
            name: "publishedAt",
            label: "Published At",
            required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
        ui: {},
      },
      {
        name: "course",
        label: "Course",
        path: "content/course",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            required: true,
          },
          {
            type: "image",
            name: "coverImage",
            label: "Cover Image",
            required: true,
          },
          {
            label: "Category",
            name: "category",
            type: "string",
            list: true,
            options: [
              {
                value: "htmlCss",
                label: "HTML & CSS",
              },
              {
                value: "javascript",
                label: "JavaScript",
              },
              {
                value: "vuejs",
                label: "Vue.js",
              },
              {
                value: "reactjs",
                label: "React.js",
              },
              {
                value: "database",
                label: "Database",
              },
            ],
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
        ui: {},
      },
    ],
  },
});
