<template>
    <div class="container mt-3">
        <router-link class="btn btn-outline-primary" to="/addresses">&lt;-- Addresses</router-link>

        <h3 class="text-center mt-3">Edit Address</h3>

        <div class="alert alert-warning mt-3" v-if="errors.length">
            <ul>
                <li v-for="(error, i) in errors" :key="i">{{ error }}</li>
            </ul>
        </div>

        <form action="#">
            <div class="form-group mt-3">
                <input type="text" class="form-control" v-model="data.address_1" placeholder="Please provide your address">
            </div>
            <div class="form-group mt-3">
                <input type="text" class="form-control" v-model="data.address_2" placeholder="Additional line for address">
            </div>
            <div class="form-group mt-3">
                <input type="text" class="form-control" v-model="data.city" placeholder="Please enter the city">
            </div>
            <div class="form-group mt-3">
                <input type="text" class="form-control" v-model="data.province" placeholder="Please enter the province">
            </div>
            <div class="form-group mt-3">
                <label for="">Would you like to make this your default address?</label>
                <select v-model="data.is_primary" class="form-control">
                    <option :value="null">Please Select</option>
                    <option :value="0">No</option>
                    <option :value="1">Yes</option>
                </select>
            </div>

            <div class="form-group mt-3">
                <textarea v-model="data.notes" cols="30" rows="5" class="form-control" placeholder="Please add any additional notes you think your service provider would find useful"></textarea>
            </div>

            <div class="d-grid gap-2 mt-3">
                <button class="btn btn-primary" @click.prevent="updateAddress()">Save Address</button>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        mounted() {
           this.getAddress()
        },
        data() {
            return {
                errors: [],
                data: {
                    address_1: '',
                    address_2: '',
                    city: '',
                    province: '',
                    is_primary: 0,
                    notes: ''
                }
            }
        },
        methods: {
            getAddress() {
                window.axios.get(`addresses/${this.$route.params.address}`).then( response => {
                    Object.keys(this.data).forEach(key => {
                        this.data[key] = response.data.address[key]
                    })
                })
            },
            updateAddress() {
                window.axios.put(`addresses/${this.$route.params.address}`, {...this.data, user_id: window.user.id}).then( () => {
                    this.$router.push('/addresses')
                })
            }
        }
    }
</script>