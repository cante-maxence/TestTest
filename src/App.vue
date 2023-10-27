<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from './lib/supabaseClient'
import { RouterLink, RouterView } from 'vue-router'

const countries = ref([])

async function getCountries() {
  const { data } = await supabase.from('countries').select()
  countries.value = data
}

onMounted(() => {
  getCountries()
})
</script>

<template>
  <RouterView />
  <div class="links">
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/secret">Secret</RouterLink>
    <RouterLink to="/login">Login</RouterLink>
    <RouterLink to="/unauthorized">Unauthorized</RouterLink>
    <RouterLink to="/insert">Insert</RouterLink>
  </div>

  <ul class="text-red-600">
    <li v-for="country in countries" :key="country.id">{{ country.name }}</li>
  </ul>
</template>

<style scoped>
.links {
  display: flex;
  flex-direction: column;
}
</style>