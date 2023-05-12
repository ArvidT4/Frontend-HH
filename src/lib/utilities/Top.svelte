<script>
    import {pop, push} from "svelte-spa-router"
    
    function create(){
        push("/createArticle")
    }
    function back(){
        pop()
    }

</script>

<div class="container text-center">
    <div class="row">
        <div class="col p-2">
            <h3><a href="/#/">Halmstad Högskola</a></h3>
        </div>
        <div class="col p-2 ">
            <button class="btn btn-primary" on:click={create}>Skapa ny tjänst</button>
        </div>
            <div class="col-1 p-2 "><button on:click={back} class="btn btn-primary border">Backa</button></div>
    </div>
</div>

<style>
    @font-face{
        font-family: 'searchFont';
        src: url("searchFont.otf");
    }

    h3{
        color: rgb(10, 120, 236);
        
    }
    a{
        font-family: 'searchFont';
        text-decoration: none;
        transition: 0.4s;
    }
    .container{
        margin-top: 30px;
        max-width: 900px;
        
    }
    .row{
        padding: 0px;
        margin: 0px;
    }
</style>