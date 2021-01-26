<template>
    <div class="card mt-3">
        <div class="card-body">
            <h5 class="text-center">{{ service.name }}</h5>
            <h6>First hour: ${{ service.initial_hour_rate}}</h6>
            <h6>Additional hour: ${{ service.additional_hour_rate }}</h6>
            <router-link :to="`/jobs/create/${service.id}`" class="btn btn-primary">Book Job</router-link>
        </div>
        
    </div>
</template>

<script>
export default {
    props: ['service']
}
</script>