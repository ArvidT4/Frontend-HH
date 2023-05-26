<script>
    import DeepDesc from "./utilities/DeepDesc.svelte";
    import {articles, amount, deepDescription} from "./store"
    import VideoInput from "./utilities/VideoInput.svelte";
    import {push} from "svelte-spa-router"
    let title="", description="", email="", phone,img, titleClass, descClass,imgClass, categoryClass;
    let selected = '';
	$:console.log(selected)
	function onChange(event) {
		selected = event.currentTarget.value;
	}
    let favorited=false;
    let orderForm=false;
    $:console.log(favorited)
	function onChangeFav() {
		if(favorited==false){
            favorited=true;
        }
        else{
            favorited=false;
        }
	}
    function onChangeOrderForm() {
		if(orderForm==false){
            orderForm=true;
        }
        else{
            orderForm=false;
        }
	}
    
    let disableVariable=0;
    let disabled=true
    function contactFunc(){
        if(disableVariable==0){
            disableVariable+=1;
            disabled=false;
        }
        else{
            disableVariable-=1;
            disabled=true;
        }
    }
    $:console.log(disableVariable)
    let temporary=0;
    function addVideo(){
        amount.update(prev=>[...prev,{id:temporary,video:""}])
        temporary+=1;
    }
    function removeVideo(){
        if($amount.length==0){
            return;
        }
        amount.update(old=>old.filter(a=>a.id!=($amount.length-1)))
        temporary-=1;
    }
    $:console.log($amount)
    $:console.log(img)
    
    let arr = [];
    async function sendImg(event){

        if(title==""){
            titleClass="bg-danger-subtle border-danger-subtle"
            arr.push({problem:"titel"})
        }
        if(description==""){
            descClass="bg-danger-subtle border-danger-subtle"
            arr.push({problem:"description"})
        }
        if(!img){
            arr.push({problem:"bild"})
        }
        if(selected==""){
            categoryClass="bg-danger-subtle border-danger-subtle"
            arr.push({problem:"category"})
        }
        if(arr.length==0){
            event.preventDefault();
            let url = "http://127.0.0.1:5000/addArticle"
            let data = new FormData(event.target)
            data.append('title',title);
            data.append( 'category',selected);
            data.append( 'description',description);
            data.append( 'deepDescription',$deepDescription);
            data.append( 'contact',JSON.stringify({email,phone}));
            data.append('favorite',JSON.stringify(favorited));
            data.append("orderForm",JSON.stringify(orderForm))
            data.append("videos",JSON.stringify($amount))
            let response = await fetch(url,{
                method: 'POST',
                body:data
            })
            const json = await response.json()
            //console.log(json)
            amount.set([])
            deepDescription.set("")
            articles.update(old=>[...old,json])
            
            push("/")
        }
        else{
            arr.forEach(item=>{alert("Du måste fylla i " + item.problem)})
        }
        
    }
    

</script>

<div class="container text-center">
    <div class="row header">
        <div class="col-2 kol-2 rounded border">
            <div class="form-check form-switch">
                <input on:change={onChangeFav} class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault">
                <label class="form-check-label" for="flexSwitchCheckDefault">Favorit</label>
            </div>
        </div>
        <div class="col">
            <h1>Skapa ny tjänst</h1>
        </div>
        <div class="col-3 order rounded border">
            <div class="form-check form-switch">
                <input on:change={onChangeOrderForm} class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault">
                <label class="form-check-label" for="flexSwitchCheckDefault">Beställings-formulär</label>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-5">
            <div class="mb-3">
                <label for="form" class="form-label">Titel</label>
                <input type="Titel" class="form-control {titleClass}" placeholder="Titel" bind:value={title}>
            </div>


            <div class="btn-group {categoryClass}" role="group" aria-label="Basic radio toggle button group">
                <input checked={selected==="support"} on:change={onChange} type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off" value="support" />
                <label class="btn btn-outline-primary" for="btnradio1">Support</label>

                <input checked={selected==="order"} on:change={onChange} type="radio" class="btn-check" name="btnradio" id="btnradio2" autocomplete="off" value="order" />
                <label class="btn btn-outline-primary" for="btnradio2">Beställa</label>

                <input checked={selected==="education"} on:change={onChange} type="radio" class="btn-check" name="btnradio" id="btnradio3" autocomplete="off" value="education" />
                <label class="btn btn-outline-primary" for="btnradio3">Utbildning</label>
            </div>


        </div>
        <div class="col">
                <div class="mb-3">
                    <label for="formTextarea" class="form-label">Beskrivning</label>
                    <textarea class="form-control {descClass}" id="exampleFormControlTextarea1" rows="3" bind:value={description}></textarea>
                  </div>
        </div>
        </div>
        
            <DeepDesc></DeepDesc>
        
        <div class="row">
            <div class="col-2 kol-2 rounded border">
                <div class="form-check form-switch">
                    <input on:change={contactFunc} class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault">
                    <label class="form-check-label" for="flexSwitchCheckDefault">Kontakt</label>
                </div>
            </div>
            <div class="col">
                    <label for="emailInput" class="form-label">Email</label>
                    <input type="text" class="form-control" id="emailInput" bind:value={email} {disabled}>    
            </div>
            <div class="col">
                <label for="numberInput" class="form-label">Telefonnummer</label>
                <input type="number" class="form-control" bind:value={phone} id="numberInput" {disabled}>
            </div>
        </div>
        <div class="row">
        </div>
        <div class="row">
            <div class="col-2 kol-2">
                <div class="btn-group">
                    <button type="button" class="btn btn-outline-secondary" on:click={addVideo}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-square-fill" viewBox="0 0 16 16">
                            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z"></path>
                        </svg>
                      <span class="visually-hidden">Button</span>
                    </button>
            
                    <button type="button" class="btn btn-outline-secondary" on:click={removeVideo}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash-square-fill" viewBox="0 0 16 16">
                            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm2.5 7.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1z"/>
                        </svg>
                      <span class="visually-hidden">Button</span>
                    </button>
                  </div>
            </div>
            <div class="col video">
                {#each $amount as video}
                <VideoInput video={video.id}></VideoInput>
                {/each}
                {#if $amount.length==0}
                <label for="embededVideo" class="form-label">Inbäddad videolänk</label>
                <input type="text" class="form-control" id="embededVideo" disabled>
                {/if}
                
            </div>
        </div>
        <form on:submit={sendImg}>
            <div class="row imgSend">
                <div class="col">
                    <label for="img">ladda upp bild</label>
                    <input class="test form-control" type="file" name="img" accept=".jpg, .jpeg, .png" bind:value={img}>
                </div>
                <div class="col-2 savebtn">
                    <input type="submit" class="btn btn-primary" value="Upload">
                </div>
            </div>
        </form>
    </div>
    
<div>
    {#each arr as item}
        <h4>{item.problem}</h4>
    {/each}
</div>

<style>
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }   
    .imgSend{
        margin-top: 10px;
    }
    .savebtn{
        display: flex;
        justify-content: center;
    }
    .order{
        margin: 10px;
        margin-top: 5px;
        padding: 15px;
    }
    .container{
        margin-top: 40px;
        max-width: 900px;
    }
    .kol-2{
        margin: 10px;
        padding: 15px;
        margin-top:16px;
        height: 54px;
    }
    .header{
        display: flex;
        align-items: center;
    }
</style>