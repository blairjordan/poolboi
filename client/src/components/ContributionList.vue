<template>
  <div>
    <span v-if="!loading">
      <span v-if="this.contributions.length">
        <b-table :items="this.contributions" :fields="['status', 'amount', 'notes']">
          <template slot="status" slot-scope="row">
            <b-badge v-if="row.item.status === 'unknown'" variant="dark">{{ row.item.status }}</b-badge>
            <b-badge v-else-if="row.item.status === 'confirmed'" variant="success">{{ row.item.status }}</b-badge>
            <b-badge v-else-if="row.item.status === 'pending'" variant="warning">{{ row.item.status }}</b-badge>
          </template>
        </b-table>
      </span>
      <div v-else>
        <b-alert show variant="info">No contributions found.</b-alert>
      </div>
    </span>
    <b-spinner v-else variant="primary" label="Spinning" />
  </div>
</template>

<script>
export default {
  name: "ContributionList",
  data() {
    return {
      contributions: [],
      loading: true
    };
  },
  props: {
    pool: Object
  },
  mounted() {
    this.fetchAll();
  },
  methods: {
    async fetchAll() {
      this.$http
        .get(`http://localhost:3000/pool/${this.pool.id}/contributions`)
        .then(response => {
          response.data.items.forEach(contribution => {
            const meta = JSON.parse(contribution.meta);
            contribution.notes = meta.notes;
            contribution.amount = meta.amt;
            if (!contribution.status) {
              contribution.status = "unknown";
            }
            this.contributions.push(contribution);
          });
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }

};
</script>
