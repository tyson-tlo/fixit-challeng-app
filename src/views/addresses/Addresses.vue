<template>
    <div class="container mt-3">
        <div class="d-grid">
            <button class="btn btn-primary" @click.prevent="active.addAddress = !active.addAddress">Add an Address</button>
        </div>

        <AddAddressForm
            v-if="active.addAddress"
            v-on:close-form="active.addAddress = false"
            v-on:stored-address="getAddresses(); active.addAddress = false" />

        <AddressCard
            v-for="address in addresses"
            :key="address.id"
            :address="address"
            v-on:address-removed="removeAddressFromList($event)" />
    </div>
</template>

<script>
    import AddAddressForm from './partials/AddAddressForm'
    import AddressCard from './partials/AddressCard.vue'

    export default {
        components: {
            AddAddressForm,
            AddressCard
        },
        mounted() {
            this.getAddresses()
        },
        data() {
            return {
                addresses: [],
                active: {
                    addAddress: false
                }
            }
        },
        methods: {
            getAddresses() {
                window.axios.get('addresses', {params: {user_id: window.user.id}}).then( response => this.addresses = response.data.addresses)
            },
            removeAddressFromList(event) {
                this.addresses = this.addresses.filter( address => address.id !== event)
            }
        }
    }
</script>