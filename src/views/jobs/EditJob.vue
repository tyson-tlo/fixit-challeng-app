<template>
    <div class="container mt-3">
        <router-link class="btn btn-outline-primary" :to="`/jobs/${this.$route.params.job}`">&lt;-- View Job</router-link>
        <div class="alert alert-warning mt-3" v-if="errors.length">
            <ul>
                <li v-for="(error, i) in errors" :key="i">{{ error }}</li>
            </ul>
        </div>

        <form action="#" v-if="addresses.length" class="mt-3">
            <h3 class="text-center">Edit Job</h3>
            <div class="form-group">
                <select class="form-control" v-model="data.client_address_id">
                    <option :value="null">Please Select an Address</option>
                    <option v-for="address in addresses" :key="address.id" :value="address.id">{{ address.address_1 }} {{ address.city }}</option>
                </select>
            </div>

            <div class="form-group mt-3">
                <h5 class="text-center">Service</h5>
                <select v-model="data.service_id" class="form-control">
                    <option :value="null">Please Select a service</option>
                    <option v-for="service in services" :key="service.id" :value="service.id">{{ service.name }}</option>
                </select>
            </div>

            <div class="form-group mt-3">
                <h5 class="text-center">Job Details</h5>
                <textarea v-model="data.details" cols="30" rows="10" class="form-control" placeholder="Enter the details of your job here!"></textarea>
            </div>

            <div class="form-group mt-3">
                <h5 class="text-center">Date Scheduled</h5>
                <input type="date" class="form-control" v-model="data.scheduled">
            </div>

            <div class="d-grid mt-3">
                <button class="btn btn-primary" @click.prevent="updateJob()">Update Job</button>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        mounted() {
            this.getJob()
            this.getAddresses()
            this.getServices()
        },
        data() {
            return {
                addresses: [],
                services: [],
                data: {
                    service_id: null,
                    client_address_id: null,
                    details: null,
                    scheduled: null
                },
                errors: []
            }
        },
        methods: {
            getAddresses() {
                if (window.user) {
                    window.axios.get('addresses', {params: {
                        user_id: window.user.id
                    }}).then(response => {
                        this.addresses = response.data.addresses
                    })
                } else {
                    this.$router.push('/login')
                }                
            },
            getServices() {
                window.axios.get('services').then( response => {
                    this.services = response.data.results.data
                })
            },
            updateJob() {
                if (this.validated()) {
                    window.axios.put(`jobs/${this.$route.params.job}`, {...this.data, user_id: window.user.id}).then( response => {
                        this.$router.push('/jobs/' + response.data.job.id)
                    })
                }
            },
            getJob() {                
                window.axios.get('jobs/' + this.$route.params.job).then( response => {                    
                    Object.keys(this.data).forEach( key => this.data[key] = response.data.job[key])
                })
            },
            validated() {
                this.errors = []
                if (!this.data.client_address_id) {
                    this.errors.push("Please provide an address")
                }

                if (!this.data.details) {
                    this.errors.push("Please provide details of the project")
                }

                if (!this.data.scheduled) {
                    this.errors.push("Please provide a valid date")
                }

                return this.errors.length === 0
            }
        }
    }
</script>