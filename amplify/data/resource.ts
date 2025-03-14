import { defineData } from "@aws-amplify/backend";
export const data = defineData({
  migratedAmplifyGen1DynamoDbTableMappings: [
    {
      // Replace the environment name (dev) with the corresponding branch name. Use "sandbox" for your sandbox environment.
      branchName: "sandbox",
      modelNameToTableNameMapping: {
        Blog: "Blog-g4q2ym2gebfpdirygsd4kcffba-dev",
        Post: "Post-g4q2ym2gebfpdirygsd4kcffba-dev",
        Comment: "Comment-g4q2ym2gebfpdirygsd4kcffba-dev",
      },
    },
    {
      // Replace the environment name (dev) with the corresponding branch name. Use "sandbox" for your sandbox environment.
      branchName: "main",
      modelNameToTableNameMapping: {
        Blog: "Blog-g4q2ym2gebfpdirygsd4kcffba-dev",
        Post: "Post-g4q2ym2gebfpdirygsd4kcffba-dev",
        Comment: "Comment-g4q2ym2gebfpdirygsd4kcffba-dev",
      },
    },
  ],
  schema: `
    input AMPLIFY { globalAuthRule: AuthRule = { allow: public } } # FOR TESTING ONLY!


type Blog @model {
  id: ID!
  name: String!
  posts: [Post] @hasMany
}

type Post @model {
  id: ID!
  title: String!
  blog: Blog @belongsTo
  comments: [Comment] @hasMany
}

type Comment @model {
  id: ID!
  post: Post @belongsTo
  content: String!
}
`,
});
