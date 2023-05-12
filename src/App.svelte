<script>
  import Router from "svelte-spa-router"
  import Home from "./lib/Home.svelte";
  import NextPage from "./lib/NextPage.svelte";
    import ArticleInfo from "./lib/article/ArticleInfo.svelte";
    import Search from "./lib/utilities/Top.svelte";
    import CreateArticle from "./lib/CreateArticle.svelte";
  import OrderingForm from "./lib/utilities/orderingForm.svelte";

  let routes = {
    "/": Home,
    "/nextPage/:category": NextPage,
    "/nextPage/:category/Article/:id": ArticleInfo,
    "/CreateArticle": CreateArticle,
    "/OrderPage":OrderingForm,

    "*": Home
  }

</script>
<Search></Search>
<Router {routes}/>