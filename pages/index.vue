
<!-- [ PAGE: HOME ] -->
<template>
<main class = 'home'>

    <!-- [ section: header ] -->
    <section class="header">
        <div class="left-side">Brom</div>
        <div class="right-side">Доска объявлений</div>
    </section>

    <!-- [ section: sidebar ] -->
    <section class="sidebar">
        <div class="nav">navbar</div>
        <div class="widget">widget</div>
    </section>

    <!-- [ section: content ] -->
    <section class="content">
        <h2>Content</h2>
    </section>

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
                { rel: "stylesheet", href: "/css/app.css" } //TODO: add fonts
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
        this.articles = await api.get('homepage')
        this.$store.commit('func', this.articles)

    }
}
</script>
