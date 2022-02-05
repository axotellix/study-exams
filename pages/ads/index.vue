
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
            <button class = 'CTA' @click="toggleForm">форма</button>
            <!-- form: add -->
            <form v-if="form_open" action="" ref="form" method = 'POST' @submit="sendForm">
                <select name="type" v-model="type">
                    <option value="car" selected>Машины</option>
                    <option value="apt">Квартиры</option>
                </select>
                <div v-for="(field, t) in form.fields" :key="field.title" >
                    <input v-if="field.type=='string'"
                        autocomplete="off"
                        :type="field.type" 
                        :placeholder="field.title" 
                        :name="t"
                    >
                    <select v-else-if="t !== 'type'" :name="t">
                        <option value="" selected disabled hidden>{{ field.title }}</option>
                        <option v-for="opt in field.values" :key="opt" :value="opt">{{ opt }}</option>
                    </select>
                </div>
                <div v-if="type=='car'">
                    <div v-for="(field, t) in form.reference_fields['type.car']" :key="field.title" >
                        <input v-if="field.type=='string'"
                            autocomplete="off"
                            :type="field.type" 
                            :placeholder="field.title" 
                            :name="t"
                        >
                        <select v-else :name="t">
                            <option value="" selected disabled hidden>{{ field.title }}</option>
                            <option v-for="opt in field.values" :key="opt" :value="opt">{{ opt }}</option>
                        </select>
                    </div>
                </div>
                <div v-if="type=='apt'">
                    <div v-for="(field, t) in form.reference_fields['type.apartment']" :key="field.title" >
                        <input v-if="field.type=='string'"
                            autocomplete="off"
                            :type="field.type" 
                            :placeholder="field.title" 
                            :name="t"
                        >
                        <select v-else :name="t">
                            <option value="" selected disabled hidden>{{ field.title }}</option>
                            <option v-for="opt in field.values" :key="opt" :value="opt">{{ opt }}</option>
                        </select>
                    </div>
                </div>
                

                <button>создать</button>
            </form>

            <!-- ads list -->
            <ul class = 'ads-list'>
                <li v-for="ad in ads" :key="ad.id" class = 'ad-card' :class="ad.type">
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
import axios from 'axios'

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

    // [ Methods ]
    methods: {
        toggleForm() {
            this.form_open = !this.form_open
        },
        async sendForm( e ) {
            e.preventDefault();
            let data = this.$refs.form
            let res = {}
            let res_car = {
                // general
                type: '',
                city: '',
                address: '11',
                phone: '',
                // car
                model: '',
                car_type: '',
                engine_volume: '',
                engine_power: '',
            }
            let res_apt = {
                // general
                type: '',
                city: '',
                address: '11',
                phone: '',
                // apartments
                rooms: '',
                square: ''
            }
            if(this.$refs.form.type.value == 'car') {
                Object.keys(data).forEach(f => {
                    res_car[data[f].name] = data[f].value
                    res = res_car
                })
            } else if (this.$refs.form.type.value = 'apartment') {
                Object.keys(data).forEach(f => {
                    res_apt[data[f].name] = data[f].value
                    res = res_apt
                })
            }
            this.$store.commit('save', res)     // save > to Store
            axios.post('https://demo-api.vsdev.space/api/brom/sales', res)

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
            form_open: false,
            type: 'car',

            form_type: 'type.cars',
            ads: []
        }
    },

    // [ Hooks ] 
    async mounted() {

        // fetch > homepage content
        this.content = await api.get('homepage')
        this.ads     = await api.get('ads')
        this.form    = await api.get('form')
        this.widget  = await api.get('widget')

    }
}
</script>
