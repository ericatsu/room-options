export default {
  server: {
    port: 3000,
  },
  proxy: {
    '/graphql': {
      target: 'http://localhost:8000',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/graphql/, ''),
    },
  },
};

