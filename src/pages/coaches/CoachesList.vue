<template>
  <base-dialog :show='!!error' title='An error occurred!' @close='handleErrors'>
    <p>{{ error }}</p>
  </base-dialog>
  <section>
    <coach-filter @change-filter='setFilter'></coach-filter>
  </section>
  <section>
   <base-card>
     <div class='controls'>
       <base-button
         @click='loadCoaches'
         :mode='"outline"'
         :link='false'
       >Refresh
       </base-button>
       <base-button
         v-if='!isCoach && !isLoading'
         link
         :to='"/register"'
       >Register as Coach</base-button>
     </div>
     <div v-if='isLoading'>
       <base-spinner></base-spinner>
     </div>
     <ul v-else-if='hasCoaches'>
       <coach-item
         v-for='coach in filterList'
         :key='coach.id'
         :id='coach.id'
         :lastName='coach.lastName'
         :firstName='coach.firstName'
         :rate='coach.hourlyRate'
         :areas='coach.areas'
       ></coach-item>
     </ul>
     <h3 v-else> No coaches found !!</h3>
   </base-card>
  </section>
</template>
<script>

import { mapGetters } from 'vuex';
import CoachItem from '@/components/coaches/CoachItem.vue';
import CoachFilter from '@/components/coaches/CoachFilter.vue';
import BaseDialog from '@/components/ui/BaseDialog.vue';
import { handleError } from 'vue';

export default {
  components: { BaseDialog, CoachItem, CoachFilter },
  data() {
    return {
      isLoading: false,
      error: null,
      activeFilters: {
        frontend: true,
        backend: true,
        career: true
      }
    };
  },
  computed: {
    filterList() {
      return this.filteredCoaches.filter(coach => {
        if (this.activeFilters.frontend && coach.areas.includes('frontend')) {
          return true;
        }
        if (this.activeFilters.backend && coach.areas.includes('backend')) {
          return true;
        }
        if (this.activeFilters.career && coach.areas.includes('career')) {
          return true;
        }
        return false;
      })
    },
    isCoach() {
      return !this.isLoading && this.$store.getters['isCoach'];
    },
    ...mapGetters(['filteredCoaches', 'hasCoaches'])
  },
  created() {
    this.loadCoaches();
  },
  methods: {
    handleError,
    setFilter(updatedFilter) {
      this.activeFilters = updatedFilter;
    },
    async loadCoaches() {
      this.isLoading = true;
      try {
        await this.$store.dispatch('loadCoaches');
      } catch (error) {
        this.error = error.message || 'Something went wrong';
      }
      this.isLoading = false;
    },
    handleErrors() {
      this.error = null;
    }
  }
};
</script>
<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
