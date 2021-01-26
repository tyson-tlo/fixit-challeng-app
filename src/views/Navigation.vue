<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">Welcome <small v-if="user" class="text-muted">{{ user.name }}</small></a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <router-link class="nav-link" to="/">Home</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" to="/services">Services</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" to="/addresses">Adresses</router-link>
                        </li>                        
                        <li class="nav-item" v-if="!user">
                            <router-link class="nav-link" to="/login" >Login</router-link>
                        </li>

                        <li class="nav-item" v-if="user">
                            <router-link class="nav-link" to="/logout">Logout</router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
    export default {
        mounted() {
            this.verifyLoggedIn()
            this.user = window.user
        },
        data() {
            return {
                user: null,
                active: {
                    login: true
                }
            }
        },
        methods: {
            verifyLoggedIn() {
                window.axios.get('user').then( response => {
                    window.localStorage.setItem('user', JSON.stringify(response.data))
                    window.user = response.data
                }).catch( errors => {
                    console.dir(errors)
                    if (errors.response.status === 401) {
                        this.$router.push('/login')
                    }
                })
            }
        }
    }
</script>