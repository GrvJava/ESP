# ESP
run game using below command, process will run on port 3000 



HOME_PATH='give path oc current directory' node app.js

Steps to play game : 
1. login - /v1/login : you can choose any id and password from "/ESP/staticfiles/users.js"
2. click on start play, you will see n number of secondary images.
3. provide one of the secondary image in input.
4. you will be able to see active players in "ESP/staticfiles/active_players.json"
5. Again login with another user and repeat same steps for second user too.

Note : Before starting then game content of "ESP/staticfiles/active_players.json" should be an empty json {}
