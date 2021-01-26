<template>
    <div>
        <div class="card mt-3">
            <div class="card-body">
                <div>
                    <img :src="img.image" style="width: 100%; max-width: 450px;" alt="">
                </div>
                <hr>
                <p class="mt-3 text-center" style="font-weight: 500">{{ img.description }}</p>
                <div class="d-grid">
                    <button class="btn btn-sm btn-danger" @click.prevent="deleteImage()">Delete Image</button>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['img'],
        methods: {
            deleteImage() {
                if (confirm("Are you sure you want to remove this image?")) {
                    window.axios.delete(`jobs/${this.$route.params.job}/images/${this.img.id}`).then( () => {
                        this.$emit('image-removed', this.img.id)
                    })
                }
            }
        }
    }
</script>