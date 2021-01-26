<template>
    <div class="card mt-3">
        <div class="card-body">
            <h5>Address: {{ address.address_1 }} <span class="badge badge-success ms-3" v-if="address.is_primary">Primary</span></h5>
            <h6>Address 2: {{ address.address_2 }}</h6>
            <h6>City: {{ address.city }}</h6>
            <h6>Province: {{ address.province }}</h6>
            <h6>Notes:</h6>
            <p>{{ address.notes }}</p>

            <div class="d-grid gap-2">
                <router-link :to="`/addresses/${address.id}/edit`" class="btn btn-sm btn-warning">Edit</router-link>
                <button class="btn btn-sm btn-danger" @click.prevent="deleteAddress()">Delete</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['address'],
        methods: {
            deleteAddress() {
                if (confirm('Are you sure you want to delete this address?')) {
                    window.axios.delete(`addresses/${this.address.id}`).then( () => {
                        this.$emit('address-removed', this.address.id)
                    })
                }
            }
        }
    }
</script>