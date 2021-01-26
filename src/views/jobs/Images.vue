<template>
    <div class="container mt-3">
        <router-link :to="`/jobs/${this.$route.params.job}`" class="btn btn-outline-primary btn-sm">&lt;-- Back to Job</router-link>
        <div class="alert alert-warning" v-if="errors.length">
            <ul>
                <li v-for="(error, i) in errors" :key="i">{{ error }}</li>
            </ul>
        </div>
        <div class="d-grid mt-3">
            <button class="btn btn-primary" v-if="!active.addImage" @click.prevent="active.addImage = true">Add an Image</button>
        </div>
        <div v-if="active.addImage" class="mt-3">
            <h5 class="text-center">Add an Image</h5>
            <hr>
            <form action="#">
                <div class="form-group">                    
                    <input type="file" class="form-control-file" ref="image">
                </div>
                <div class="form-group mt-3">
                    <label for="">Description</label>
                    <textarea cols="30" rows="5" class="form-control" v-model="data.description"></textarea>
                    <h6 :class="{'text-danger': data.description.length > 190}">{{ data.description.length }} Characters <span v-if="data.description.length > 190">(The description is too long!)</span></h6>
                </div>
                <button class="btn btn-primary mt-3" @click.prevent="storeImage()">Save Image</button>
                <button class="btn btn-warning mt-3 ms-3" @click.prevent="this.active.addImage = false">Cancel</button>
            </form>

        </div>

        <ClientJobImageCard 
            v-for="img in images" 
            :key="img.id" 
            :img="img"
            v-on:image-removed="removeImageFromList($event)" />
    </div>
</template>

<script>
    import ClientJobImageCard from './partials/ClientJobImageCard'

    export default {
        components: {
            ClientJobImageCard
        },
        mounted() {
            this.getJobImages()
        },
        data() {
            return {
                images: [],
                data: {
                    description: ''
                },
                active: {
                    addImage: false
                },
                errors: []
            }
        },
        methods: {
            getJobImages() {
                window.axios.get(`jobs/${this.$route.params.job}/images`).then( response => {
                    this.images = response.data.images
                })
            },
            storeImage() {
                if (this.validated()) {
                    const file = this.$refs.image.files[0]
                    const formData = new FormData
                    formData.append('description', this.data.description)
                    formData.append('image', file)

                    window.axios.post(`jobs/${this.$route.params.job}/images`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }).then( response => {
                        this.images.push(response.data.image)
                        Object.keys(this.data).forEach( key => this.data[key] = '')
                        this.active.addImage = false
                    })
                }
                
            },
            validated() {
                this.errors = []

                const validFiles = ['image/jpeg', 'image/png', 'image/jpg', 'image/bmp']

                const file = this.$refs.image.files[0]

                if (file) {
                    if (file.size > 5000000) {
                    this.errors.push("The files size can not exceed 5MB. File is too large")
                    }

                    if (!validFiles.includes(file.type)) {
                        this.errors.push("File must be of type: jpg, jpeg, png, bmp. File submitted is of type: " + file.type.split('/')[1])
                    }
                } else {
                    this.errors.push("You must provide a file for upload!")
                }

                

                if (this.data.description.length > 190) {
                    this.errors.push("Description can be no greater than 190 characters!")
                }

                return this.errors.length === 0
            },
            removeImageFromList(event) {
                this.images = this.images.filter( img => img.id !== event)
            }
        }
    }
</script>