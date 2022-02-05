
<!-- [ PAGE: HOME ] -->
<template>
<main class = 'home'>

    <!-- article -->
    <ul class = 'articles'>
        <li v-for="article in articles" :key="article.id">{{ article.title }}</li>
    </ul>

</main>
</template>


<!-- [ SCRIPTS ] -->
<script>
// [ System ]
import api from '../api/api.js'

// [ Components ]
// import Article from '@/components/Article'
import Ico from '@/components/Ico'

export default {
    // [ Component name ]
    name: 'Home',

    // [ Child components ]
    components: {
        // Article,
        Ico
    },

    // [ Whatchers ]
    watch: { 

    },

    // [ Head tags ]
    head() {
        return {
            link: [
                { rel: "stylesheet", href: "/css/app.css" } 
            ]
        }
    },

    // [ Components props ]
    data() {
        return {
            articles: [1, 2, 3, 4],
            src_query: ''
        }
    },

    // [ Hooks ] 
    async mounted() {

        // fetch > articles
        this.articles = await api.get('articles')
        this.$store.commit('keep_local', this.articles)

    }
}
</script>
