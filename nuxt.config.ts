import NuxtConfiguration from "@nuxt/config";

const config: NuxtConfiguration = {
  mode: "universal",
  head: {
    title: "Oswald Labs Platform",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "Oswald Labs Platform"
      }
    ],
    link: [
      { rel: "icon", type: "image/png", href: "https://oswaldlabs.com/images/pwa/favicon-32x32.png" },
      {
        rel: "stylesheet",
        href:
          "https://cdnjs.cloudflare.com/ajax/libs/balloon-css/1.0.0/balloon.min.css"
      }
    ],
    script: [
      {
        type: "text/javascript",
        src:
          "https://polyfill.io/v3/polyfill.min.js?features=es5%2Ces6%2Ces7%2CrequestIdleCallback%2CBlob%2CIntersectionObserver%2CHTMLPictureElement%2CIntersectionObserverEntry%2CMutationObserver%2Cfetch%2ClocalStorage%2CPromise%2CPromise.prototype.finally"
      },
      {
        type: "text/javascript",
        src: "https://public-cdn.oswaldlabs.com/focus-visible.js",
        async: true
      },
      {
        type: "text/javascript",
        src: "https://js.stripe.com/v3/"
      },
      {
        type: "text/javascript",
        src: "https://platform.oswaldlabs.com/_/d1b9d3cd29.js",
        async: true
      }
    ]
  },
  loading: { color: "#3867d6" },
  css: [],
  plugins: [
    "~/plugins/axios",
    { src: "~/plugins/vue-notification", ssr: false },
    "~/plugins/vue-timeago",
    "~/plugins/meta-ctrl-enter",
    "~/plugins/filters",
    { src: "~/plugins/vuex-persist", ssr: false }
  ],
  modules: ["@nuxtjs/axios", "@nuxtjs/pwa", "@nuxtjs/markdownit", "@bazzite/nuxt-netlify"],
  axios: {
    host:
      process.env.NODE_ENV === "production"
        ? "platform-beta.oswaldlabs.com"
        : "localhost",
    https: process.env.NODE_ENV === "production",
    port: process.env.NODE_ENV === "production" ? 443 : 7007
  },
  scrollBehavior: function() {
    return { x: 0, y: 0 };
  },
  build: {
    extend(config, ctx) {
      if (ctx.isDev && ctx.isClient && config && config.module) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/,
          options: {
            fix: true
          }
        });
      }
    }
  }
};

export default config;
