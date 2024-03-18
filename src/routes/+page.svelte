<script lang="ts">
  import { browser } from '$app/environment';
  import muffinImg from '$lib/assets/simpleMuffin.png';
  import cottontailRabbitImg from '$lib/assets/simpleCottontail.png';

  //export let data;
  let muffins: number = browser ? parseInt(window.localStorage.getItem('muffins')) || 0 : 0;
  let bunNum: number = browser ? parseInt(window.localStorage.getItem('bunNum')) || 0 : 0;
  let bunnyCost: number = 5;
  let interval;
  let shouldHideCottontail: boolean = muffins <= 3;

  let increment = () => {
    muffins += bunNum;
  };

  let makeAMuffin = () => {
    muffins += 1;
    if (muffins > 3) {
      shouldHideCottontail = false;
    }
  };

  let buyCottontailRabbit = () => {
    if (muffins >= bunnyCost) {
      muffins -= bunnyCost;
      bunnyCost = Math.trunc(1.2 * bunnyCost);
      bunNum += 1;
    }
  };

  $: {
    muffins;
    if (browser) {
      window.localStorage.setItem('muffins', muffins.toString());
    }
  }

  $: {
    bunNum;
    if (bunNum != 0) {
      interval = setInterval(increment, 1000);
    }
    if (browser) {
      window.localStorage.setItem('bunNum', bunNum.toString());
    }
  }
</script>

{#if browser}
  <button on:click={makeAMuffin}>
    <img src={muffinImg} alt="the muffin-makin muffin" height="100" width="100" />
  </button>
  <p class="muffin-instructions">Click a muffin, make a muffin</p>
  <p class="muffin-count">{muffins}</p>
  <div class="cottontail-rabbit" class:hidden={shouldHideCottontail}>
    <button on:click={buyCottontailRabbit}>
      <img src={cottontailRabbitImg} alt="buy a bunny" height="200" width="200" />
    </button>
    <p>
      Convince a cottontail bunny to join you: {bunnyCost} muffins
    </p>
  </div>
{:else}
  Loading muffins...
{/if}

<style>
  .hidden {
    visibility: hidden;
  }

  .muffin-instructions {
    font-size: x-small;
  }

  .muffin-count {
    font-size: x-large;
    font-weight: 900;
  }
</style>
