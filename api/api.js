
// [ IMPORTS ]
import axios from 'axios'


// [ MAIN ]
const api = {
    server: 'https://demo-api.vsdev.space',
    routes: {

        // [ GET requests ]
        GET: {
            widget:     ctx => "/api/brom/left_widget",
            homepage:   ctx => "/api/brom/home_page",
            aboutpage:  ctx => "/api/brom/about_page",
            ads:        ctx => "/api/brom/sales",
            form:       ctx => "/api/brom/sales/form",
        },

        // [ POST requests ]
        POST: {
            dynamic: {
                ad_type: 1,
                city: '',
                comment: '',
                address: '',
                phone: '',
            },

            ads: ctx => `/api/brom/sales/
                ?type=${ctx?.routes?.POST?.dynamic.name}
                &city=${ctx?.routes?.POST?.dynamic.city}
                &address=${ctx?.routes?.POST?.dynamic.address}
                &phone=${ctx?.routes?.POST?.dynamic.phone}
            `
        }

    },
    config: {
        mode: "no-cors",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Method": "no-cors",
        }
    },

    //@ define > GET method 
    get: async function( route, dynamic_data = {} ) {

        // update > dynamic data in routes
        this.routes.GET.dynamic = dynamic_data

        // define > request params
        let endpoint = this.server + this.routes.GET[route](this)
        let config = this.config

        // send > request
        let req = await axios.get(endpoint, { config })
        return req.data

    },

    //@ define > GET method 
    post: async function(route, dynamic_data ) {
        
        // update > dynamic data in routes
        this.routes.POST.dynamic = dynamic_data

        // define > request params
        let endpoint = this.server + this.routes.POST[route](this)
        let config = this.config

        // send > request
        let req = await axios.post(endpoint, { config })

        return req;

    }
 
};

export default api;