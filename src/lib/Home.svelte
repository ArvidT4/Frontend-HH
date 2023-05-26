<script>
  import Welcome from "./utilities/Welcome.svelte";
  import {push} from "svelte-spa-router"
  import {articles, tempArr} from "./store"



  getArticles()
    async function getArticles(){
        let response = await fetch("http://127.0.0.1:5000/")
        let json = await response.json()
        json.forEach(item=>{if(item.favorite==true){
                tempArr.update(old=>[item,...old])
            }
            else{
                tempArr.update(old=>[...old,item])
            }
        })
        articles.set($tempArr)
        tempArr.set([])
        //articles.set(json)
        
    }

  function nextPage(type){

    push("/nextPage/"+type)

  }


  
</script>
<Welcome/>
<div class="container px-4 text-center">
  <div class="row">
      <div class="col ">
          <div class="div card" on:keypress on:click={()=>nextPage("support")}>
              <div class="card-body">
                <h5 class="card-title">Support</h5>
              </div>
              <img src="/src/lib/pictures/support.jpg" class=" img-fluid card-img-bottom" alt="...">
          </div>
      </div>
      <div class="col">
              <div class="div card" on:keypress on:click={()=>nextPage("order")}>
                  <div class="card-body" >
                      <h5 class="card-title">Beställa</h5>
                  </div>
                  <img src="/src/lib/pictures/order.jpg" class=" img-fluid card-img-bottom" alt="...">
              </div>
      </div>
      <div class="col">
          <div class="div card" on:keypress on:click={()=>nextPage("education")}>
              <div class="card-body">
                <h5 class="card-title">Utbildning</h5>
              </div>
              <img src="/src/lib/pictures/education.jpg" class="img-fluid card-img-bottom" alt="...">
          </div>
      </div>
  </div>
</div>



<style>
  .container{
    margin-bottom:100px;
  }
  @font-face{
      font-family: 'Font';
      src: url("LT Staircase.otf");
  }
  h5{
      font-family: 'Font';
      font-size: 25px;
      color: rgb(10, 120, 236);
  }
  img{
      object-fit: cover;
      height: 600px;
      filter: brightness(50%);
      transition: 0.4s;
      
  }
  .div{
      width:250px;
      height: 500px;
      transition: 0.4s;
      margin: auto;
      

  }
  .container{
      margin-top: 40px;
      max-width: 1000px;
  }
  img:hover{
      filter: brightness(100%);
  }

  .card-body:hover ~ img{
    filter: brightness(100%);
  }

/*   .div:hover img{
    filter: brightness(100%);
  } */

</style>