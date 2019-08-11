<template>
  <div class="home">
    <div class="home-container">
      <div class="hero">
        <h1 class="display-3">poolboi</h1>
        <p class="lead">A cryptcurrency pooling service</p>
        <router-link tag="a" to="/pools"><b-button variant="primary" size="lg">Active Pools</b-button></router-link>
      </div>
      <vue-particles
        color="#666"
        :particlesNumber="80"
        shapeType="triangle"
        :particleSize="4"
        linesColor="#888"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="150"
        :moveSpeed="2"
      >
      </vue-particles>
    </div>
    <b-card-group deck class="mb-4">
      <b-card bg-variant="primary" text-variant="white" header="Step 1" class="text-center">
        <b-card-text>
          <font-awesome-icon icon="coins" size="4x" class="mb-3" />
          <p>Create a pool. Specify a product and set a funding goal.</p>
        </b-card-text>
      </b-card>
      <b-card bg-variant="primary" text-variant="white" header="Step 2" class="text-center">
        <b-card-text>
          <font-awesome-icon icon="users" size="4x" class="mb-3" />
          <p>Gather contributions towards your goal.</p>
        </b-card-text>
      </b-card>
      <b-card bg-variant="primary" text-variant="white" header="Step 3" class="text-center">
        <b-card-text>
          <font-awesome-icon icon="box" size="4x" class="mb-3" />
          <p>Once your goal is reached, your product is purchased and distributed to contributors.</p>
        </b-card-text>
      </b-card>
    </b-card-group>
    <b-card-group>
      <b-card bg-variant="dark" text-variant="white" class="text-center">
        <b-card-text>
          <b-row align-v="center">
            <b-col cols="2"><font-awesome-icon :icon="['fab','bitcoin']" size="4x" color="#FF9900" /></b-col>
            <b-col cols="10"><span class="float-left">We verify transactions using Bitcoin. New to Bitcoin? <a target="_blank" href="https://www.coinbase.com/join/579415ce6bfea66475e18140">Get started here</a>.</span></b-col>
          </b-row>
        </b-card-text>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
export default {
  name: "Home"
}
</script>

<style>
#particles-js{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 30rem;
  z-index: -1;
}

.home-container {
  text-align: center;
  align-items: center;
  justify-content: center;
  height:30rem;
}

.hero {
  position: relative;
  top: 10rem;
}
</style>