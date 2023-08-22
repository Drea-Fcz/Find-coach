<template>
  <section>
    <base-card>
      <h2>{{ fullName }}</h2>
      <h3>${{ rate }}/hour</h3>
    </base-card>
  </section>
  <section>
    <base-card>
      <header>
        <h2>Interested ? Reach out now !</h2>
        <base-button
          link
          :to='contactLink'
        >Contact
        </base-button>
      </header>
      <router-view></router-view>
    </base-card>
  </section>
  <section>
    <base-card>
      <base-badge
        v-for='area in areas'
        :key='area'
        :type='area'
        :title='area'
      ></base-badge>
      <p>{{ description }}</p>
    </base-card>
  </section>
</template>
<script>
import BaseCard from '@/components/ui/BaseCard.vue';
import BaseBadge from '@/components/ui/BaseBadge.vue';

export default {
  components: { BaseBadge, BaseCard },
  props: ['id'],
  computed: {
    fullName() {
      return this.selectedCoach.firstName + ' ' + this.selectedCoach.lastName;
    },
    rate() {
      return 30;
    },
    areas() {
      return this.selectedCoach.areas;
    },
    description() {
      return this.selectedCoach.description;
    },
    contactLink() {
      return this.$route.path  + '/contact';
    },
  },
  data() {
    return {
      selectedCoach: null
    }
  },
  created() {
    this.selectedCoach = this.$store.getters['filteredCoaches'].find( res => res.id === this.id);
  }
};
</script>
