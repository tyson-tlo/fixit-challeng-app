<template>
  <div class="container mt-3">
    <div v-if="results">
      <div v-for="job in results.data" :key="job.id">
        <div class="card mt-3">
          <div class="card-body">
            <h5>{{ job.scheduled_date }}</h5>
            <hr>
            {{ job.details }}
            <router-link :to="`/jobs/${job.id}`" class="btn btn-primary btn-sm mt-3 float-end">View Job</router-link>
          </div>
        </div>
      </div>
    </div>

    <div class="d-grid mt-3">
      <router-link to="/jobs/create" class="btn btn-primary">Create a New Job</router-link>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src


export default {
  mounted() {
    this.getJobs()
  },
  data() {
    return {
      results: null
    }
  },
  methods: {
    getJobs() {
      window.axios.get('jobs', {params: {user_id: window.user.id}}).then(response => {
        this.results = response.data.results
      })
    }
  }
}
</script>
