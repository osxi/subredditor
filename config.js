'use-strict';

export default {
  css: {
    minifyCompatability: 'ie8',
    downloadToFile: './src/custom.scss'
  },

  defaultFile: 'subreddit.html',

  paths: {
    distDir: './dist',
    srcGlob: './src/**',
    sassGlob: './src/**/*.scss'
  },

  cleanPaths: [
    'src/custom.scss',
    './dist/**'
  ]
};
