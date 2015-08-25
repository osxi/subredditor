# subredditor
Tool for styling subreddits locally

## features
  - SASS
  - livereload when styles change
  - subreddit template provided
  - remote stylesheet retrieval

## usage
  1. (optional) paste reddit.com/r/yoursubreddit/stylesheet.css into `src/custom.scss`
     OR
     run `gulp download --subreddit=<subreddit_name>` to clone the remote stylesheet to `src/custom.scss`
  2. use `gulp` to start the development environment
  3. browse http://localhost:8000
  4. make changes to `src/custom.scss` and your web browser will reload automatically
  5. copy contents of `dist/custom.css` to your subreddit

## TODO
  - upload stylesheet via Reddit API
  - create more generic template
  
## more info
  - https://www.reddit.com/wiki/styling
  - https://www.reddit.com/r/csshelp/wiki/index
