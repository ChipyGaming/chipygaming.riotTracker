<template>
    <section class="search">
        <h1>Track Player Stats</h1>
        <form v-on:submit.prevent="onSubmit">
            <div class="form-group">
                <label for="summonerName">SummonerName</label>
                <input type="text" name="text" v-model="summonerName" id="summonerName" placeholder="Enter Summoner Name">
            </div>
            <div class="form-group">
                <input type="submit" value="Submit" class="btn">
            </div>
        </form>
    </section>
</template>

<script>
export default{
    name: 'Search',
    data(){
        return{
            summonerName: ""
        };
    },
    beforeCreate(){
        document.body.className = "body-bg-image";
    },
    methods: {
        onSubmit(){
            if(!this.summonerName){
                this.$toasted.show("Please enter a Summoner Name", {
                    duration:3000
                })

            }else{
                this.$router.push(`/profile/${this.summonerName}`)
            }
        }
    }
};
</script>
