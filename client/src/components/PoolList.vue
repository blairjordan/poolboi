<template>
  <div class="pools" v-if="!loading">
    <b-row>
      <b-col>
        <b-table
          :items="this.pools"
          :fields="['title', 'goal', 'history', 'contribute']"
        >
          <template slot="history" slot-scope="row">
            <b-button
              size="sm"
              class="mr-2"
              variant="outline-primary"
              @click="row.toggleDetails"
            >
              <font-awesome-icon icon="table"/> Show
            </b-button>
          </template>
          <template slot="contribute" slot-scope="row">
            <b-button 
              size="sm"
              class="mr-2"
              variant="success"
              @click="selected = row.item"
            ><font-awesome-icon icon="plus-circle"/>
                Contribute
            </b-button>
          </template>
          <template slot="row-details" slot-scope="row">
            <b-card>
              <ContributionList :pool="row.item" />
              <b-button size="sm" class="mb-2" @click="row.toggleDetails">Hide Details</b-button>
            </b-card>
          </template>
          <b-row v-for="pool in this.pools" :key="pool.id" class="clearfix" style="min-width:25em">
            <b-col>{{ pool.title }}</b-col>
          </b-row>
        </b-table>
      </b-col>
      <b-col>
        <b-card
          v-if="isSelected"
          :header="selected.title"
          header-bg-variant="primary"
          header-text-variant="white"
        >
          <ContributeForm :pool="selected" />
        </b-card>
      <b-alert v-else show variant="primary">Select a pool to contribute to.</b-alert>
      </b-col>
    </b-row>
    
    <div>
      <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage" size="sm"></b-pagination>
    </div>
  </div>
  <b-spinner v-else variant="primary" label="Spinning" />
</template>

<script>
import ContributionList from '@/components/ContributionList.vue'
import ContributeForm from '@/components/ContributeForm.vue'

export default {
  name: "PoolList",
  components: {
    ContributionList,
    ContributeForm
  },
  data() {
    return {
      pools: [],
      loading: true,
      selected: {},
      perPage: 10,
      currentPage: 1,
      rows: 0,
    };
  },
  computed: {
    validation() {
      return !isNaN(parseFloat(this.form.amt));
    },
    isSelected() {
      return this.selected.hasOwnProperty("id");
    }
  },
  mounted() {
    this.fetch();
  },
  watch: {
    currentPage: {
      handler: function() {
        this.fetch();
      }
    }
  },
  methods: {
    toggle(pool) {
      this.$root.$emit('bv::toggle::collapse', `pool-${pool.id}`)
    },
    async fetch() {
      this.$http
        .get("http://localhost:3000/pool",
        {
          params: {
            page: this.currentPage,
            pageSize: this.perPage
          }
        })
        .then(response => {
          this.pools = [];
          response.data.items.forEach(pool => {
            this.pools.push(pool);
          });
          this.rows = response.data.resultCount;
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
  }
};
</script>
