/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  const tweetData = [];

  //tweet submitted input to /tweets
  const submitTweet = (input) => {
    
    const errMsg = dataValidator(input);

    // console.log("client.js>>>",input);
    // console.log("client.js value>>>",decodeURI(input));
    if (errMsg === "Tweet is is not present") {
      $(".isa_error_none").slideDown("slow");
    }
    if (errMsg === "Tweet is too long") {
      $(".isa_error_long").slideDown("slow");
    }
    else {

      $.post("/tweets", $(input).serialize()).then(function () {
        $("#tweets-container").trigger("reload");
      });
    }
  };

  //validates the tweet data
  const dataValidator = (inputtedData) => {
    const data = inputtedData.elements["text"].value;
    console.log("inputted data >>>",data)
     if (!data) {
     return "Tweet is is not present";
    }
    if (data.length > 140) { //140 + 5 for text=
      return "Tweet is too long"; 
    }
    return false;
  };

  //event listener that calls the submit tweet function
  $("form").on("submit", function (event) {
    // console.log("data", data.length)
    //function that checks
    event.preventDefault();
    submitTweet(this);
  });

  //get tweet from /tweets function
  const loadTweets = () => {
    $.ajax({
      url: "/tweets",
      method: "GET",
    }).then((res) => {
      $("#tweets-container").empty();
      renderTweets(res);
    });
  };

  //causes the reload after a new tweet is posted
  $("#tweets-container").on("reload", loadTweets).trigger("reload");

  //runs input against cross site scripting
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  //creates the tweet in HTML
  const createTweetElement = (tweetObject) => {
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
      <div class="left-side"><span>${new Date(tweetObject.created_at).toLocaleString()}</span></div>
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
      $("#tweets-container").prepend($tweet);
    }
  };
  renderTweets(tweetData);
});
