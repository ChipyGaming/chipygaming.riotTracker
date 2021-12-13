//take user summonerName
//summonerName inputted to pull ID from summonerv4
//use "summoner" ID to find stats from leaguev4
//U
const express = require('express');
const morgan = require ('morgan');
const dotenv = require ('dotenv');

//Load env
dotenv.config({ path: './config.env'});

const app = express();

//Dev Log: Shows the path + time to execute
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev')); 
}

const port = process.env.PORT || 8000;

//Profile routes
app.use('/lol/summoner/v4/summoners/by-name', require('./routes/profile'));

// Handle production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static(__dirname + '/public/'));
  // Handle SPA
  app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}

app.listen(port, () => {
   console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}!`);

});