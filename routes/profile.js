
const express = require('express')
const router = express.Router()
const axios = require("axios")

let summonerId;


const headers = {'X-Riot-Token': process.env.RIOT_API_KEY}

//input summonerName output id
router.get('/:summonerName', async (req, res) => {
    
    try{

        const { summonerName } = req.params;

        const summonerIdResponse = await axios(`${process.env.RIOT_API_URL}/lol/summoner/v4/summoners/by-name/${summonerName}`, 
        {
         headers
        }
        );
        const {id} = summonerIdResponse.data;
        const {puuid} = summonerIdResponse.data;
        console.log(puuid);
        summonerId = summonerIdResponse.data;
        const tftStatsResponse = await axios (`${process.env.RIOT_API_URL}/tft/league/v1/entries/by-summoner/${id}`,
        {
        headers
        });
        tftStats = tftStatsResponse.data;
        const summonerStatsResponse = await axios (`${process.env.RIOT_API_URL}/lol/league/v4/entries/by-summoner/${id}`,
        {
            headers
        });
        summonerStats = summonerStatsResponse.data;
        console.log(summonerStats);
        res.json({summonerId: summonerId, tftStats: tftStats, summonerStats: summonerStats});
        
        

    } catch(err){
        console.error(err);
        res.status(500).json({
            message:'Server Error'
        });
    }
    //console.log(req.params.summonerName);
    //res.send('Hello');
});
module.exports = router;