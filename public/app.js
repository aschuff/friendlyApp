(function e(t, n, r) {
    function s(o, u) {
        if (!n[o]) {
            if (!t[o]) {
                var a = typeof require == "function" && require;
                if (!u && a) return a(o, !0);
                if (i) return i(o, !0);
                throw new Error("Cannot find module '" + o + "'")
            }
            var f = n[o] = {
                exports: {}
            };
            t[o][0].call(f.exports, function(e) {
                var n = t[o][1][e];
                return s(n ? n : e)
            }, f, f.exports, e, t, n, r)
        }
        return n[o].exports
    }
    var i = typeof require == "function" && require;
    for (var o = 0; o < r.length; o++) s(r[o]);
    return s
})({
    1: [function(require, module, exports) {
        'use strict';

        window.addEventListener('load', function() {
            console.log('page has loaded');
            setInterval(getAFriend, 2000);
        });
        var friendsArray = [];
        var realFriends = [];
        // GET FRIENDS FROM API AND INSERT IT INTO THE DOM
        function getAFriend() {
            // THIS IS THE AJAX REQUEST
            var request = new XMLHttpRequest();
            console.log('got a friend');
            request.addEventListener('load', function() {
                // TAKE THE DATA FROM THE API AND PARSE IT INTO A JSON OBJECT
                var friend = JSON.parse(this.responseText);
                // NOW friend = RESULTS WE GOT BACK FROM THE JSON DATA
                friend = friend.results[0];
                console.log('friend');
                if (friendsArray.length < 5) {
                    console.log('adding new friend');

                    var buttonName = 'Add me';
                    var friendOptions = document.createElement('div');
                    friendOptions.innerHTML = '<div class="friends">\n                                      <img src=\'' + friend.picture.medium + '\'/>\n                                      <h3>' + friend.name.first + ' ' + friend.name.last + '</h3>\n                                      <button>' + buttonName + '</button>\n                                      </div>';
                    // friendOptions.classList.add('newFriendRow')
                    var feed = document.getElementById('friendFeed');
                    // APPENDED friendOptions TO THE FEED
                    feed.appendChild(friendOptions);
                    friendsArray.push(friend);

                    var button = friendOptions.querySelector('button');
                    button.addEventListener('click', function() {
                        console.log(friend.name.first + ' was clicked');
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
                        });
                        realFriends.push(friend);
                        friend.hobbies = ['swimming', 'drawing', 'fishing'];
                        console.log(friend.hobbies);
                        // let hobby = document.getElementById('hobbiesView')
                        // hobby[0].addEventListener('click', function(){
                        //   console.log('clicked hobby tab');
                        // }
                    });
                } else {
                    console.log('skipping this person');
                }
            });
            // REQUESTING THE API
            request.open('GET', 'https://randomuser.me/api/');
            // USING THE api
            request.send();
        }
        // FRIENDS LIST
        function addFriend(friend) {
            var myFriendsList = document.getElementById('friendsList');
            var myFriends = document.createElement('div');
            myFriends.innerHTML = '<div class="myFriends">\n                      <img src= \'' + friend.picture.medium + '\' />\n                      <div class = \'info\'>\n                        <h3>' + friend.name.first + ' ' + friend.name.last + '</h3>\n                        <h4>Friends since June 23, 2016</h4>\n                        </div>\n                      </div>';
            myFriendsList.appendChild(myFriends);
        }
    }, {}]
}, {}, [1])