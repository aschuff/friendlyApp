window.addEventListener('load', function() {
    console.log('page has loaded');
    setInterval(getAFriend, 2000);
})
let friendsArray = [];
let realFriends = [];
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
                        // friendOptions.classList.add('newFriendRow')
                    var feed = document.getElementById('friendFeed')
                        // APPENDED friendOptions TO THE FEED
                    feed.appendChild(friendOptions)
                    friendsArray.push(friend);

                    let button = friendOptions.querySelector('button');
                    button.addEventListener('click', function() {
                            console.log(`${friend.name.first} was clicked`);
                            // ADD THE PERSON CLICKED ON
                            addFriend(friend);
                            // HIDE PERSON CLICKED
                            friendOptions.remove();
                            friendsArray = friendsArray.filter(function(element) {
                                if (friend.name.first === element.name.first) {
                                    return false;
                                } else {
                                    return true;
                                }
                            })
                            realFriends.push(friend);
                            friend.hobbies = ['swimming', 'drawing', 'fishing']
                            console.log(friend.hobbies);
                        } else {
                            console.log('skipping this person')
                        }
                        let hobby = document.getElementById('hobbiesView')
                        hobby.addEventListener('click', function() {
                                console.log('clicked hobby tab');
                                // hobby.removeClass('hidden');
                                // hobby(friend);
                            }
                        });
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
                        <h3>${friend.name.first} ${friend.name.last}</h3>
                        <h4>Friends since June 23, 2016</h4>
                        </div>
                      </div>`;
        myFriendsList.appendChild(myFriends);
    }
