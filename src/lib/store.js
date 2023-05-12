import {writable} from "svelte/store"

const storedArticles = localStorage.articles 

export const articles = writable(storedArticles||[])

articles.subscribe((value)=>localStorage.articles=value) 



export const amount = writable([])
export const tempArr = writable([])
export const deepDescription = writable("")
