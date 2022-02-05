
<!-- [ PAGE: HOME ] -->
<template>
<main class = 'ads-page'>

    <li class = 'ad-card' :class="type">
        <div class = 'card-type'>
            <Ico :type="data.type" />
            {{ data.type == 'car' ? 'Машины' : 'Квартиры' }}
        </div>
        <div class = 'card-data'>
            <p>город: <span>{{ data.city }}</span></p>
            <p>адрес: <span>{{ data.address }}</span></p>
            <p>тел.: <span>{{ data.phone }}</span></p>
            <p>цена: <span>{{ data.price }}</span></p>
        </div>
    </li>

</main>
</template>


<!-- [ SCRIPTS ] -->
<script>
// [ System ]
import api from '@/api/api.js'
import axios from 'axios'


// [ Components: Other ]
import Ico from '@/components/Ico'


export default {
    // [ Component name ]
    name: 'AdCard',

    // [ Props ]
    props: ['data', 'type'],

    // [ Child components ]
    components: {
        // other
        Ico
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

    },

    // [ Components props ]
    data() {
        return {
            
        }
    },

    // [ Hooks ] 
    async created() {

    }
}
</script>
