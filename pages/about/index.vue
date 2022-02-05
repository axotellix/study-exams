
<!-- [ PAGE: HOME ] -->
<template>
<main class = 'about'>

    <!-- [ section: header ] -->
    <Header />

    <!-- [ section: container ] -->
    <section class="container">

        <!-- sidebar -->
        <Sidebar :widget="widget" />

        <!-- content -->
        <div class="content">
            <h2>О нас.</h2>
            <ul>
                <li class = 'text' v-html="content.text"></li>
            </ul>
        </div>

    </section>

</main>
</template>


<!-- [ SCRIPTS ] -->
<script>
// [ System ]
import api from '@/api/api.js'

// [ Components: Partials ]
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'

// [ Components: Other ]
import Ico from '@/components/Ico'


export default {
    // [ Component name ]
    name: 'About',

    // [ Child components ]
    components: {
        // partials
        Header,
        Sidebar,

        // other
        Ico
    },

    // [ Whatchers ]
    watch: { 

    },

    // [ Head tags ]
    head() {
        return {
            link: [
                { rel: "stylesheet", href: "/css/app.css" },
                { rel: "preconnect", href: "https://fonts.googleapis.com" },
                { rel: "preconnect", href: "https://fonts.gstatic.com" },
                { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;700&display=swap" },
            ]
        }
    },

    // [ Components props ]
    data() {
        return {
            content: {
                image: 'https:/demo-api.vsdev.space/storage/brom/home_page_img.jpg',
                text: 'some'
            },
            widget: {}
        }
    },

    // [ Hooks ] 
    async mounted() {

        // fetch > homepage content
        this.content = await api.get('homepage')
        this.widget = await api.get('widget')

    }
}
</script>
