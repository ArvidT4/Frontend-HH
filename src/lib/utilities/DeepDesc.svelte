<script>
    import {deepDescription} from "../store"

    
    let disabled=true
    function deepFunc(){
        if(disabled){
            disabled=false;
        }
        else{
            disabled=true;
        }
    }
</script>

<div class="row">
    <div class="check col-2 rounded border">
        <div class="form-check form-switch">
            <input on:change={deepFunc} class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault">
            <label class="form-check-label" for="flexSwitchCheckDefault">Djup beskrivning</label>
        </div>
    </div>
    <div class="col">
        <div class="mb-3">
            <label for="formTextarea" class="form-label">Djup beskrivning</label>
            <textarea class="form-control" id="formTextare" rows="3" bind:value={$deepDescription} {disabled}></textarea>
        </div>
    </div>
</div>
<style>
    .check{
        display: flex;
        align-items: center;
        margin: 10px;
        padding: 10px;
        margin-bottom: 16px;
        margin-top:33px;
        height: 85px;
    }
</style>