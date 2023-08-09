export default {
  server: {
    port: 3000,
  },
  proxy: {
    '/graphql': {
      target: 'http://127.0.0.1:8000',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/graphql/, ''),
    },
  },
};

