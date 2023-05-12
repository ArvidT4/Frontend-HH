<script>
    import { articles, tempArr } from "./store";
    import Article from "./article/Article.svelte";
    export let params = {}
    let paramCategory = params.category
    let category, subText;
   
    console.log($articles)
    if(paramCategory=="education"){
        category="Utbildning"
        subText="Här hittar du alla tjänster relaterat till utbildning, här finns allt från video tutorials till texter som djupförklarar problemet/behovet du söker!"
    }
    else if(paramCategory=="order"){
        category="Beställa"
        subText="Här hittar du alla tjänster relaterat till beställningar, en ny mobiltelefon till exempel."
    }
    else{
        category="Support"
        subText="Här hittar du alla tjänster relaterat till support. Vare det sig vara ringa för hjälp/skicka mejl eller få hjälp skrifligt"
    }
     let searchTerm = "";
    

$: filteredList = $articles.filter(item => {
        if(!item.title)return false;

        return item.title.indexOf(searchTerm.toLowerCase()) !== -1
    });
    $:console.log(filteredList)


</script>
<div class="container text-center">
    <div class="row">
        <div class="col ">
            <h1>Alla tjänster relaterat till {category}</h1>
        </div>
    </div>
    <div class="row">
        <div class="col">
            <h4>{subText}</h4>
        </div>
    </div>
</div>


<div class="container px-4 text-center">
    <div class="row ">
        <div class="col-4 search">
            <div class="input-group">
                <span class="input-group-text" id="addon-wrapping"><i class="bi bi-search"></i></span>
                <input type="text" class="form-control" placeholder="Sök" aria-label="Sök" aria-describedby="addon-wrapping" bind:value={searchTerm}>
            </div>
        </div>
    </div>

    <div class="row">
        {#each filteredList as article}
            {#if article.category==paramCategory}
                <Article article={article}></Article>
            {/if}
        {/each}
    </div>
</div>








<style>
    @font-face{
        font-family: 'Font';
        src: url("LT Staircase.otf");
    }

    .container{
        margin-top: 100px;
    }
    h1{
        font-family: 'Font';
    }
    h4{
        margin: auto;
        max-width: 900px;
        font-weight: normal; 
    }
    .search{
        margin-bottom: 20px;
    }
</style>