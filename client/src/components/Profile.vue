<template>
    <div>
        <div v-if ="loading">
            <h3>Loading...</h3>
        </div>
        <div v-if="error">
            <h1> {{error}} </h1>
            <router-link to="/"> Go back </router-link>
        </div>
        <div v-if="profileData" class="container">
            <h1 class="summonerInfo">
                <img :src="iconUrl" alt="" class="summonerIcon">
                {{this.profileData.summonerId.name}}
            </h1>
            <div class = "grid">
                <div>
                    <img v-bind:src="require(`./assets/${tftRankedStatsUrl.tier}.png`)">
                </div>
                <ul>
                    <li>
                        <h2>Current Rank:</h2>
                        <h4>{{tftRankedStatsUrl.tier}} {{tftRankedStatsUrl.rank}} - {{tftRankedStatsUrl.leaguePoints}} LP</h4>
                    </li>
                    <li>
                        <h2>Wins: {{tftRankedStatsUrl.wins}}</h2>
                        <h2>Losses: {{tftRankedStatsUrl.losses}}</h2>
                    </li>
                    <li>
                        <h2>Win Streak? {{tftRankedStatsUrl.hotStreak}}</h2>
                    </li>
                </ul>

                <div v-if="tftHyperRollUrl">
                    <img v-bind:src="require(`./assets/${tftHyperRollUrl.ratedTier}.png`)">
                </div>
                <ul v-if="tftHyperRollUrl">
                    <li>
                        <h2>Current Rank:</h2>
                        <h4>{{tftHyperRollUrl.ratedTier}} - {{tftHyperRollUrl.ratedRating}}</h4>
                    </li>
                    <li>
                        <h2>Wins: {{tftHyperRollUrl.wins}}</h2>
                        <h2>Losses: {{tftHyperRollUrl.losses}}</h2>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>

import axios from 'axios';
export default {
    name: 'Profile',
    data(){
        return{
            loading: false,
            error: null,
            profileData: null,
            iconUrl: null,
            tftRankedStatsUrl: null,
            tftHyperRollUrl: null
        }
    },
    beforeCreate(){
        document.body.className = "body-bg-no-image";
    },
    async created(){
        this.loading = true;
        //request to backend
        try{
            const res = await axios.get(`/lol/summoner/v4/summoners/by-name/${this.$route.params.summonerName}`);
            this.profileData = res.data;
            let tempQueueType = "RANKED_TFT";
            let tempQueueType2 = "RANKED_TFT_TURBO";
            if(this.profileData.tftStats[0].queueType == tempQueueType){
                this.tftRankedStatsUrl = this.profileData.tftStats[0];
            }
            else{
                this.tftRankedStatsUrl = this.profileData.tftStats[1];
            }
            if(this.profileData.tftStats[0].queueType == tempQueueType2){
                this.tftHyperRollUrl = this.profileData.tftStats[0];
            }
            else{
                this.tftHyperRollUrl = this.profileData.tftStats[1];
            }
            console.log(this.rankTier);
            console.log(this.profileData);
            this.loading = false;
            this.iconUrl = `https://ddragon.leagueoflegends.com/cdn/11.24.1/img/profileicon/${this.profileData.summonerId.profileIconId}.png`
        } catch(err){
            this.loading = false;
            this.error = err.response.data.message;

        }

    }
}
</script>

<style scoped>
.container {
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  max-width: 700px;
  margin: 1rem auto;
  padding: 2rem 1.5rem;
  border-radius: 20px;
}
h1.summonerInfo {
  font-size: 2rem;
  background: rgba(0, 0, 0, 0.6);
  padding: 0.3rem 0.5rem;
  text-align: center;
  border-radius: 20px;
  margin-bottom: 3rem;
  display: flex;
  align-items: center;
}
a {
  display: inline-block;
  margin-top: 2rem;
  border: #fff 2px solid;
  padding: 0.5rem 0.8rem;
}
a:hover {
  border: #ccc 2px solid;
  color: #ccc;
}
.summonerIcon {
  width: 40px;
  margin-right: 0.7rem;
}
img {
  width: 100%;
}
.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1rem;
}
li {
  background: rgba(0, 0, 0, 0.6);
  padding: 1rem;
  margin-bottom: 0.7rem;
  border-radius: 10px;
}
li p {
  font-size: 2rem;
}
li:first-child p {
  font-size: 1.5rem;
}
li span {
  font-size: 1rem;
  color: #ccc;
}
@media (max-width: 500px) {
  h1 {
    font-size: 1.5rem;
    display: block;
    text-align: center;
  }
  .summonerIcon {
    display: none;
  }
  .grid {
    grid-template-columns: 1fr;
  }
  li p {
    font-size: 1.5rem;
  }
}
</style>