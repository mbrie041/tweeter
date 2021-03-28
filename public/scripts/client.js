$(document).ready(function () {
  const tweetData = [];

  //checks inputted data and posts
  const submitTweet = (input) => {
    const errMsg = dataValidator(input);

    if (errMsg === "Tweet is is not present") {
      $(".isa_error_none").slideDown("slow");
    }
    if (errMsg === "Tweet is too long") {
      $(".isa_error_long").slideDown("slow");
    } else {
      $.post("/tweets", $(input).serialize()).then( () => {
        $("#tweets-poster").trigger("reload");
      });
      input.reset();
      input.elements["counter"].value = 140;
    }
  };

  //validates the tweet data
  const dataValidator = (inputtedData) => {
    const data = inputtedData.elements["text"].value;
    if (!data) {
      return "Tweet is is not present";
    }
    if (data.length > 140) {
      return "Tweet is too long";
    }
    return false;
  };
 
  //event listener that calls the submit tweet function
  $("form").on("submit", function (event) {
    event.preventDefault();
    submitTweet(this);

    
  });

  //function that gets the posted input after submitTweet reloads
  const loadTweets = () => {
    $.ajax({
      url: "/tweets",
      method: "GET",
    }).then((res) => {
      $("#tweets-poster").empty();
      renderTweets(res);
    });
  };

  //causes the reload after a new tweet is posted
  $("#tweets-poster").on("reload", loadTweets).trigger("reload");

  //runs input against cross site scripting
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  //creates the tweet in HTML
  const createTweetElement = (tweetObject) => {
    const relativeDate = moment(new Date(tweetObject.created_at)).fromNow(); //uses moment to add flair to the date
    const $tweet = `<article class="tweet-container">
    <header class="tweet-container-header">
      <div class="left-side">
        <img class="avatar" img src=${escape(tweetObject.user.avatars)}>
        <div class="username">${escape(tweetObject.user.name)} </div>
      </div>
      <div class="right-side"> ${escape(tweetObject.user.handle)}</div>

    </header>
    <div class="tweet-text"> ${escape(tweetObject.content.text)}
    </div>

    <footer class="tweet-container-footer">
      <div class="left-side"><span>${relativeDate}</span></div>
      <div class="right-side">
        <img class="icon" src=https://raw.githubusercontent.com/mpizzaca/tweeter/master/public/images/flag.png>
        <img class="icon" src=https://raw.githubusercontent.com/mpizzaca/tweeter/master/public/images/retweet.png>
        <img class="icon" src=https://raw.githubusercontent.com/mpizzaca/tweeter/master/public/images/heart.png>
      </div>
    </footer>
    </article>`;
    return $tweet;
  };

  //adds the new tweet to the page
  const renderTweets = (givenArray) => {
    for (let tweet of givenArray) {
      const $tweet = createTweetElement(tweet);
      $("#tweets-poster").prepend($tweet);
    }
  };
  renderTweets(tweetData);
});
