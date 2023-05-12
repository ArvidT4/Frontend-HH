<script>
    import { each } from "svelte/internal";
import {articles, deepDescription} from "../store"
    import { push } from "svelte-spa-router";
    export let params = {}
    let id = params.id
    let article = $articles.find(a=>a._id==id)
    $:console.log(article)
    const orderForm =()=>{
        push("/OrderPage")
    }

</script>

<div class="container text-center">
    <div class="row">
        <div class="col ">
            <h2 class=" title rounded border">{article.title}</h2>
        </div>
    </div>
    <div class="row">
        <div class="col-5 align-self-start">
            <img class=" rounded border" src="http://localhost:5000/{article.url}" alt="">
        </div>
        <div class="col ">
            
            <div class="desc rounded border text-start">
                <h5>Beskrivning</h5>
                {article.description}
            </div>
        </div>
    </div>
    <!-- svelte-ignore empty-block -->
    {#if !article.deepDescription}
    {:else}
    <div class="row">
        <div class="col deepDesc align-self-start">
            <div class="rounded border deepDiv ">
                <h5>Djup beskrivning</h5>
                <p class="">{article.deepDescription}</p>
            </div>
            
        </div>
    </div>
    {/if}
    <!-- svelte-ignore empty-block -->
    {#if !article.contact.email}
    {:else}
    <div class="row">
        <div class="col contact"><div class="rounded border"><p>Kontakt:</p><p>Telefonnummer: {article.contact.phone}</p><p>Email: {article.contact.email}</p></div></div>
    </div>
    {/if}
    {#if article.orderForm==true}
        <button on:click={orderForm} class="orderBtn btn btn-primary">Beställningsformulär</button>
    {/if}
    {#each article.videos as video}
        <div class="row">
            <div class="col ">
                <div class="rounded videoDiv border iframeContainer">
                    <div class="videoD">{@html video.video}</div>
                </div>
                
            </div>
        </div>
    {/each}
    
    
</div>

<style>
    .orderBtn{
        margin-top: 10px;
        margin-bottom: 10px;
    }
    .container{
        margin-top: 100px;
        max-width: 800px;
    }
    .title{
        padding: 20px;
    }
    .desc{
        padding: 30px;
        height: 320px;
    }
    img{
        margin: 0px;
        width: 320px;
        height: 320px;
        object-fit: cover;
    }
    .deepDesc{
        margin-top: 10px;
    }
    .deepDiv{
        padding: 30px;
    }
    .contact{
        margin-top: 10px;
    }
    .videoDiv{
        margin-top: 10px;
    }
    .videoD{
        margin-top: 10px;
    }


</style>