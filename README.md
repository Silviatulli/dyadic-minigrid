# dyadic-minigrid
multiplayer game and chat for collecting data on human counterfactual explanations in a collaborative learning task

# environment setup
* clone the repository with <code>git glone</code>
* initialize the folder with <code>npm init -y</code>
* install express and socket.io with <code>npm install express socket.io</code>
* install nodemon with <code>npm install nodemon --save-dev</code>

## dependencies setup on package.json 
* set the main script to <code>server.js</code> by modifying <code>"main": "server.js"</code>
* make sure that the script type is "module" by adding <code>"type": "module"</code>
* set the start and dev scripts by adding <code>"start": "node server.js", "dev": "nodemon server.js"</code> before <code>"test"</code>


# database setup
* install mongodb using <code>npm install mongodb</code>
* install mongoose using <code>pip install mongoose</code>
* important: comment the database code if you are running the code locally
