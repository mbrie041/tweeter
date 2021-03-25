/*
* Client-side JS logic goes here
* jQuery is already loaded
* Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/



$(document).ready(function () {

  //tweet submission function
  $('form').on('submit', function (event) {
    event.preventDefault();
    console.log('Button clicked, performing ajax call...');

    const data = $(this).serialize();

    $.post('/tweets', data).then(function () {
      console.log("Outputting something.");
      $('#tweets-container').trigger('reload');
    });
  });

  //get tweet from /tweets function
  const loadTweets = () => {

    $.ajax({
      url: "/tweets",
      method: "GET"
    })
      .then(res => {
        $('#tweets-container').empty()
        renderTweets(res)
      })
  }

  // causes the reload after a new tweet is posted
  $('#tweets-container').on('reload', loadTweets).trigger('reload');


  const tweetData =
    [
      // {
      //   "user": {
      //     "name": "Newton",
      //     "avatars": "https://i.imgur.com/73hZDYK.png",
      //     "handle": "@SirIsaac"
      //   },
      //   "content": {
      //     "text": "If I have seen further it is by standing on the shoulders of giants"
      //   },
      //   "created_at": 1616454275063
      // },
      // {
      //   "user": {
      //     "name": "Descartes",
      //     "avatars": "https://i.imgur.com/nlhLi3I.png",
      //     "handle": "@rd"
      //   },
      //   "content": {
      //     "text": "Je pense , donc je suis"
      //   },
      //   "created_at": 1616540675064
      // }
    ]


  const createTweetElement = (tweetObject) => {
    const $tweet = $(`
    <article class="tweet-container">
    <header class="tweet-container-header">
      <div class="left-side">
        <img class="avatar" img src=${tweetObject.user.avatars}>
        <div class="username">${tweetObject.user.name} </div>
      </div>
      <div class="right-side"> ${tweetObject.user.handle}</div>

    </header>
    <div class="tweet-text"> ${tweetObject.content.text}
    </div>

    <footer class="tweet-container-footer">
      <div class="left-side"><span>${tweetObject.created_at}</span></div>
      <div class="right-side">
        <img class="icon" src=https://raw.githubusercontent.com/mpizzaca/tweeter/master/public/images/flag.png>
        <img class="icon" src=https://raw.githubusercontent.com/mpizzaca/tweeter/master/public/images/retweet.png>
        <img class="icon" src=https://raw.githubusercontent.com/mpizzaca/tweeter/master/public/images/heart.png>
      </div>
    </footer>

  </article>`);
    return $tweet;
  }

  //adds the new tweet to the page
  const renderTweets = (givenArray) => {

    for (let tweet of givenArray) {
      const $tweet = createTweetElement(tweet);
      $('#tweets-container').prepend($tweet);
    }
  }
  renderTweets(tweetData);
})

