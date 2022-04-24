upvotes = document.querySelectorAll(".upvote-div");
downvotes = document.querySelectorAll(".downvote-div");

upvotes.forEach(function(upvote) {
    upvote.addEventListener("click", function(event) {
        console.log(upvote.classList);
        upvote.classList.add("pulsate-vote");
        console.log(upvote.classList);

        setTimeout(function() {
            upvote.classList.remove("pulsate-vote");
        }, 500);
    })
})

downvotes.forEach(function(downvote) {
    downvote.addEventListener("click", function(event) {
        console.log(downvote.classList);
        downvote.classList.add("pulsate-vote");
        console.log(downvote.classList);

        setTimeout(function() {
            downvote.classList.remove("pulsate-vote");
        }, 500);
    })
})