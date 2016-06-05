require.config({
  baseUrl: "lib",
  paths: {
    "jquery": "jquery/jquery",
    "underscore": "underscore-amd/underscore",
    "backbone": "backbone-amd/backbone",
    "oj": "oj/oj",
    "oj-twitter-button": "oj-twitter-button/oj.TwitterButton",
    "oj-github-button": "oj-github-button/oj.GitHubButton",
    "oj-markdown": "oj-markdown/oj.markdown",
    "oj-youtube-video": "oj-youtube-video/oj.YouTubeVideo",
    "app": "../app"
  }
});
require(["app/app"]);