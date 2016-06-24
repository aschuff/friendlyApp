window.addEventListener('load', function() {
    console.log('page has loaded');
    setInterval(getAFriend, 2000);
})
let friendsArray = [];
var request = new XMLHttpRequest();
// GET FRIENDS FROM API AND INSERT IT INTO THE DOM
function getAFriend() {
    // THIS IS THE AJAX REQUEST
    var request = new XMLHttpRequest();
    console.log('got a friend');
    request.addEventListener('load', function() {
        // TAKE THE DATA FROM THE API AND PARSE IT INTO A JSON OBJECT
        let friend = JSON.parse(this.responseText);
        // NOW friend = RESULTS WE GOT BACK FROM THE JSON DATA
        friend = friend.results[0];
        console.log('friend');
        if (friendsArray.length < 5) {
          console.log('adding new friend');

            let buttonName = 'Add me'
            var friendOptions = document.createElement('div');
            friendOptions.innerHTML = `<div class="friends">
                                      <img src='${friend.picture.medium}'/>
                                      <h3>${friend.name.first} ${friend.name.last}</h3>
                                      <button>${buttonName}</button>
                                      </div>`
                // ADDED A CLASS OF ROW TO friendOptions DIV
            friendOptions.classList.add('newFriendRow')
                // GRABBED SECTION CALLED friendFeed; MADE IT = VAR CALLED FEED

            let button = friendOptions.querySelector('button');
            button.addEventListener('click', function() {
                console.log(`${friend.name.first} was clicked`);

                // ADD THE PERSON CLICKED ON
                // getAFriend(friend);
                addFriend(friend);
            });
            var feed = document.getElementById('friendFeed')
                // APPENDED friendOptions TO THE FEED
            feed.appendChild(friendOptions)
            friendsArray.push(friend);
        } else {
            console.log('skipping this person')
        }

        // LOGGING THE DATA
        // console.log(friendsArray);

        // MADE A DIV ELEMENT IN THE HTML CALLED friendOptions

        // PUT FRIEND'S NAME IN THE DIV IN THE HTML





        //  EVENT HANDLER: BUTTON


        //NEED TO REMOVE THE PERSON CLICKED ON

        // APPEND THE CHILD TO THE PARENT
        // let parent = document.getElementById('friendFeed');
        // parent.appendChild(child);
    });
    // REQUESTING THE API
    request.open('GET', 'https://randomuser.me/api/')
        // USING THE api
    request.send();
}

// FRIENDS LIST
function addFriend(friend) {
    let myFriendsList = document.getElementById('friendsList');
    let myFriends = document.createElement('div');
    myFriends.innerHTML = `<div class="myFriends">
                      <img src= '${friend.picture.medium}' />
                      <div class = 'info'>
                        <h3>${friend.name.first} ${friend.name.first}</h3>
                        <h4>Friends since June 23, 2016</h4>
                        </div>
                      </div>`;
    myFriendsList.appendChild(myFriends);
}
