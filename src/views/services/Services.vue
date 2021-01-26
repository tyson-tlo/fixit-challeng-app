<template>
    <div>
        <div class="container">
            <div v-if="results">
                <ServiceCard
                    v-for="service in results.data"
                    :key="service.id"
                    :service="service" />
            </div>
        </div>
    </div>
</template>

<script>
    import ServiceCard from './partials/ServiceCard.vue'

    export default {
        components: {
            ServiceCard
        },
        mounted() {
            this.getServices()
        },
        data() {
            return {
                results: null
            }
        },
        methods: {
            getServices() {
                window.axios.get('services').then( response => this.results = response.data.results )
            }
        }
    }
</script>