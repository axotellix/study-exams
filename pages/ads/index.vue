
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
            <button class = 'CTA center' @click="toggleForm">форма</button>
            <!-- form: add -->
            <form v-if="form_open" action="" ref="form" method = 'POST' @submit="sendForm">
                <select name="type" v-model="type" required>
                    <option value="car" selected>Машины</option>
                    <option value="apt">Квартиры</option>
                </select>
                <!-- general fields -->
                <div v-for="(field, t) in form.fields" :key="field.title" >
                    <input v-if="field.type=='string'"
                        autocomplete="off"
                        :type="field.type" 
                        :placeholder="field.title" 
                        :name="t"
                        v-model="form_data[t]"
                        required
                    >
                    <select v-else-if="t !== 'type'" :name="t" v-model="form_data[t]" required>
                        <option :value="field.title" selected disabled>{{ field.title }}</option>
                        <option v-for="opt in field.values" :key="opt" :value="opt">{{ opt }}</option>
                    </select>
                </div>
                <div v-if="type=='car'">
                    <div v-for="(field, t) in form.reference_fields['type.car']" :key="field.title">
                        <input v-if="field.type=='string'"
                            autocomplete="off"
                            :type="field.type" 
                            :placeholder="field.title" 
                            :name="t"
                            v-model="form_data[t]"
                            required
                        >
                        <select v-else :name="t" v-model="form_data[t]" required>
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
                            v-model="form_data[t]"
                            required
                        >
                        <select v-else :name="t" v-model="form_data[t]" required>
                            <option value="" selected disabled hidden>{{ field.title }}</option>
                            <option v-for="opt in field.values" :key="opt" :value="opt">{{ opt }}</option>
                        </select>
                    </div>
                </div>
                

                <button>создать</button>
            </form>

            <!-- ads list -->
            <ul class = 'ads-list'>
                <div @click="sort( true )" class="comments-sort">
                    <div >
                        <span>Sort by date:</span>
                        <Ico type = 'arrow-sort-up' :params="this.sort_by_date" />
                    </div>
                </div>
                <li v-for="ad in ads" :key="ad.id" class = 'ad-card' :class="ad.type">
                    <div class = 'card-type'>
                        <Ico :type="ad.type" />
                        {{ ad.type == 'car' ? 'Машины' : 'Квартиры' }}
                    </div>
                    <div class = 'card-data'>
                        <p>город: <span>{{ ad.city }}</span></p>
                        <p>адрес: <span>{{ ad.address }}</span></p>
                        <p>тел.: <span>{{ ad.phone }}</span></p>
                        <p>цена: <span>{{ ad.price }}</span></p>
                    </div>
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
        type: function() {
            this.form_data = {}
        }
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
        async getAds() {
            this.ads = await api.get('ads')
            return new Promise(resolve => { resolve() })
        },
        sort( change_order = false ) {

            // change > order
            if(change_order) this.sort_by_date = !this.sort_by_date
            let order = this.sort_by_date || false

            // sort > comments
            this.ads.sort(( c1, c2 ) => ((order + order % 2) - 1) * (c1.id - c2.id))

        },
        async sendForm( e ) {
            // prevent > default behaviour
            e.preventDefault();

            // save > data to result object
            let res = {}
            Object.assign(res, this.form_data)

            // set > type format
            res.type = this.type == 'car' ? 'car' : 'apartment'


            this.$store.commit('save', res)     // save > to Store
            await axios.post('https://demo-api.vsdev.space/api/brom/sales', res)

            // fetch > ads
            this.getAds().then(() => {
                this.sort()
            })

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
            sort_by_date: false,

            form_type: 'type.cars',
            type: 'car',
            ads: [],
            form_data: {

            }
        }
    },

    // [ Hooks ] 
    async created() {

        // fetch > homepage content
        this.content = await api.get('homepage')
        this.form    = await api.get('form')
        this.widget  = await api.get('widget')
        
        // fetch > ads
        this.getAds().then(() => {
            this.sort()
        })


    }
}
</script>
