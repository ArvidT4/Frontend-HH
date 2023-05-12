<script>
    import {push} from "svelte-spa-router"
    export let article;

    function articleInfo(){
        push(`/nextPage/`+article.category+"/Article/"+article._id)
        console.log(article._id)
    }

</script>

<div class="col-3">
    <div class="card" style="width: 18rem;" on:keypress on:click={articleInfo}>
        <div class="square">
            {#if article.url}
            <img src="http://localhost:5000/{article.url}" class="card-img-top" alt="...">
            {:else}
            <img src={"src/lib/pictures/placeholderPic.avif"} class="card-img-top" alt="...">
            {/if}
         </div>
        {#if article.favorite}
            <div class="card-body text-bg-warning">
                <h5 class="card-title ">{article.title}</h5>
            </div>
            {:else}
            <div class="card-body">
                <h5 class="card-title ">{article.title}</h5>
            </div>
            {/if}
        
    </div>
</div>

<style>
    .card-title{
        font-size: 25px;
    }
    .card{
        margin-bottom: 40px;
        height: 380px;
        transition: 0.4s;
    }
    img{

        height:100%;
        width:100%;
        object-fit: cover;
    }
    .card:hover{
        box-shadow: 0px 2px 2px 0px;
    }

    .square{
        aspect-ratio: 1/1;
        
        background:#eee;

    }
</style>
