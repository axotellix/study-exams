
<!-- [ PAGE: HOME ] -->
<template>
<main class = 'ads-page'>

    <!-- [ section: header ] -->
    <Header />

    <!-- [ section: container ] -->
    <section class="container">

        <!-- sidebar -->
        <Sidebar :widget="widget" />

        <!-- content -->
        <div class="content">
            <!-- form: add -->
            <form action="" method = 'POST'>
                <input v-for="field in form.fields" :key="field.title"
                    :type="field.type" 
                    :placeholder="field.title" 
                >
                <input v-for="field in form.reference_fields['type.car']" :key="field.title"
                    :type="field.type" 
                    :placeholder="field.title" 
                >

                <button>создать</button>
            </form>

            <!-- ads list -->
            <ul class = 'ads-list'>
                <li v-for="ad in ads" :key="ad.id" class = 'ad-card'>
                    <p>{{ ad.type }}</p>
                    <p>{{ ad.city }}</p>
                    <p>{{ ad.address }}</p>
                    <p>{{ ad.phone }}</p>
                    <p>{{ ad.price }}</p>
                </li>
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
    name: 'Ads',

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
                { rel: "stylesheet", href: "/css/app.css" } //TODO: add fonts
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
            widget: {
                cars: '',
                apartments: ''
            },
            form: {
                reference_fields: {
                    "type.car": {}
                }
            },
            form_type: 'type.cars',
            ads: []
        }
    },

    // [ Hooks ] 
    async created() {

        // fetch > homepage content
        this.content = await api.get('homepage')
        this.ads     = await api.get('ads')
        this.form    = await api.get('form')
        this.widget  = await api.get('widget')

    }
}
</script>
