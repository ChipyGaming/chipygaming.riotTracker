
const express = require('express')
const router = express.Router()
const axios = require("axios")

let summonerId;

const headers = {'X-Riot-Token': process.env.RIOT_API_KEY}
const headers2 = {'X-Riot-Token': process.env.RIOT_API_KEY_TFT}
const headers3= {'X-Riot-Token': process.env.RIOT_API_KEY_LOL}
const lolAPI = {'X-Riot-Token': process.env.RIOT_API_KEY_LOL}

//input summonerName output id
router.get('/:summonerName', async (req, res) => {
    
    try{

        const { summonerName } = req.params;
        console.log(headers3);
        console.log(headers);

        const summonerIdResponse = await axios(`${process.env.RIOT_API_URL}/tft/summoner/v1/summoners/by-name/${summonerName}`, 
        {
        headers: headers2
        }
        );
        const {id} = summonerIdResponse.data;
        const {puuid} = summonerIdResponse.data;
        console.log(id);
        summonerId = summonerIdResponse.data;
        const tftStatsResponse = await axios (`${process.env.RIOT_API_URL}/tft/league/v1/entries/by-summoner/${id}`,
        {
        headers: headers2
        });
        tftStats = tftStatsResponse.data;
        console.log(tftStats);
        res.json({summonerId: summonerId, tftStats: tftStats});
        
        

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