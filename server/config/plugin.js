module.exports = ({ env }) => ({
  "vercel-deploy": {
    enabled: true,
    config: {
      deployHook: env("VERCEL_DEPLOY_PLUGIN_HOOK"),
      apiToken: env("VERCEL_DEPLOY_PLUGIN_API_TOKEN"),
      appFilter: env("VERCEL_DEPLOY_PLUGIN_APP_FILTER"),
      //
      // teamFilter: "your-team-id-on-vercel",
      // roles: ["strapi-super-admin", "strapi-editor", "strapi-author"],
    },
  },
});
