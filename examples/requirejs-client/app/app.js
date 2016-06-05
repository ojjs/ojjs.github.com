define(function (require) {

  var $ = require('jquery'),
    oj = require('oj');

  oj.use(require('oj-twitter-button'));
  oj.use(require('oj-github-button'));
  oj.use(require('oj-markdown'));
  oj.use(require('oj-youtube-video'));

  // Export everything in oj globally so you don't have to prefix everything with `oj.`
  oj.useGlobally()

  // Replace <body> with the following OJ code:
  $('body').oj(function(){

    // (Lowercase) tag functions let you create any element
    h1('An Example OJ Website (using RequireJS)');

    // The markdown plugin was included for your convenience!
    markdown('Object-oriented templating just got *real*.');

    // (Uppercase) Objects create and edit themselves through a returned instance
    var myList = BulletList(
      'Objects',
      'Just',
      'Work'
    );

    // Edit list by moving the elements
    Button('Move Item', {click:function(){
      myList.move(0, myList.length);
    }});

    // Add items to the list
    Button('Add Item', {click:function(){
      myList.add('New Item!');
    }});

    // Add videos to the list
    Button('Add Video', {click:function(){
      myList.add(function(){
        YouTubeVideo('rfh4Mhp-a6U')
      });
    }});

    // In OJ, CSS can be defined in several ways, so don't get caught up in specific examples,
    // and instead do what makes the most sense for your project! =).

    // The easiest way is to simply use .css files like you are use to. Just oj.link them
    // inside your oj.head function and the browser will load them normally.
    // This approach can also work with templating engines like stylus or less.

    // Another way to do it is to require('a/file.oj') that uses oj.css function to create css.
    // This lets you separate your css into separate files and functions, but still use JavaScript
    // variables and functions while making them.

    // The last way is to just call the oj.css function at anytime:

    css({
      h1:{
        color:'orange'
      },
      'li:nth-child(odd)':{
        color:'orange'
      },
      hr:{
        opacity:0.5,
        margin:'20px 0'
      }
    });

    // This is great for very small websites or when testing and debugging larger sites, but keep in mind
    // this last mechanism IS NOT the best organization for a larger sites!

    // The purpose behind the oj.css function is to bring css into a language with variables, loops, and functions.
    // With oj.css you could create a function that styles your entire site at once, or make a different function
    // that conditionally creates css depending on which browser you are targeting.

    // Just remember it is still a good idea to separate content (html) from presentation (css),
    // but now the separation is all in code. The best way to do this is just use separate
    // functions for creating html (templates and partials) and for creating css.

    hr()

    GitHubButton('ojjs', 'oj', {width:'100px'})

    TwitterButton('evanmoran')

  });

});
