<template>
    <div>
        <div class="container">
            <div class="alert alert-warning mt-3" v-if="errors.length">
                <ul>
                    <li v-for="(value, i) in errors" :key="i">{{ value }}</li>
                </ul>
            </div>

            <h1 class="text-center">Login</h1>
            <form action="#">
                <div class="form-group">
                    <label for="">Email</label>
                    <input type="email" class="form-control" v-model="data.email" required>
                </div>
                <div class="form-group">
                    <label for="">Password</label>
                    <input type="password" class="form-control" v-model="data.password" required>
                </div>
                <div class="d-grid gap-2">
                    <button class="btn btn-primary mt-3" @click.prevent="login()">Login</button>
                </div>
                
            </form>
        </div>
    </div>
</template>

<script>


    export default {
        mounted() {
            console.log("Login vue mounted")
        },
        data() {
            return {
                data: {
                    email: null,
                    password: null
                },
                errors: []
            }
        },
        methods: {
            login() {
                if (this.validated()) {
                    window.axios.post('login', this.data).then( response => {
                        window.localStorage.setItem('bearerToken', response.data.token)
                        window.axios.defaults.headers.common['Authorization'] = "Bearer " + response.data.token
                        this.$router.push('/')
                        window.axios.get('user').then( response => {
                            window.user = response.data
                            window.localStorage.setItem('user', JSON.stringify(response.data))
                        })
                    }).catch( errors => {
                        if (errors.response.status === 401) {
                            this.errors.push("Credentials could not be verified. Please verify your credentials are correct!")
                        }
                    })
                }
            },
            validated() {
                this.errors = []
                if (!this.data.email) {
                    this.errors.push('Please provide an email address')
                }
                if (!this.data.password) {
                    this.errors.push("Please provide a valid password")
                }

                return this.errors.length === 0
            }
        }
    }
</script>