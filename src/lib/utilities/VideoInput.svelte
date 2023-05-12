<script>
    import {amount} from "../store"
    export let video;
    let videoLink="";
    function updateVideo(){
        $amount.forEach(item => {
        if(item.id==video){
            item.video=videoLink
        
            amount.update(old=>[...$amount])
        }
    });
    }


</script>


<label for="embededVideo" class="form-label">Inbäddad videolänk</label>
<input on:change={updateVideo} type="text" class="form-control" id="embededVideo" bind:value={videoLink}>
