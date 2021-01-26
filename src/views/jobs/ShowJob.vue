<template>
    <div class="container">
        <h3 class="text-center mt-3">Job Details</h3>
        <hr>
        <div v-if="job">
            <div v-if="job.address">
                <h5 class="text-center">Address</h5>
                <h6>Address 1: {{ job.address.address_1 }}</h6>
                <h6>Address 2: {{ job.address.address_2 }}</h6>
                <h6>City: {{ job.address.city }}</h6>
                <h6>Province: {{ job.address.province }}</h6>
                <hr>
            
            </div>
            <div v-else>
                <div class="alert alert-danger">
                    <h5 class="text-center">This job has no address</h5>
                    <h5 class="text-center">Please edit job to add address</h5>
                    
                </div>
            </div>

            <div v-if="job.service">
                <h5 class="text-center">Service</h5>
                <h6 class="text-center">{{ job.service.name }}</h6>
            </div>
            <div v-else>
                <div class="alert alert-danger">
                    <h5 class="text-center">This job has no service</h5>
                    <h5 class="text-center">Please edit this job to add a service</h5>
                </div>
            </div>
            <hr>
            <h5 class="text-center">Details</h5>
            <div>{{ job.details }}</div>
            <hr>
            <h5 class="text-center">Date Scheduled</h5>
            <div>{{ job.scheduled_date }}</div>

            <hr>

            <div v-if="job.images">
                <img v-for="img in job.images" :key="img.id" :src="img.url" alt="">
            </div>
        </div>

        <div class="d-grid gap-2">
            <router-link :to="`/jobs/${$route.params.job}/images`" class="btn btn-primary" >Images</router-link>
            <router-link :to="'/jobs/' + $route.params.job + '/edit'" class="btn btn-warning">Edit Job</router-link>
        </div>
    </div>
</template>

<script>
    export default {
        mounted() {
            this.getJob()
        },
        data() {
            return {
                job: null
            }
        },
        methods: {
            getJob() {
                window.axios.get('jobs/' + this.$route.params.job).then( response => {
                    this.job = response.data.job
                    console.log(this.job)
                })
            }
        }
    }
</script>