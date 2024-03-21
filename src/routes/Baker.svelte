<script lang="ts">
  import { browser } from '$app/environment';

  export let shouldHideBaker: boolean;
  export let bunnyImg: string;
  export let buyString: string;
  export let bakedGood: number;
  export let bunNum: number;
  export let bakedGoodType: string;
  export let bakerName: string;
  export let bunCost: number;

  let interval: number;

  let buyBun = () => {
    if (bakedGood >= bunCost) {
      bakedGood -= bunCost;
      bunCost = Math.trunc(1.2 * bunCost);
      bunNum += 1;
    }
  };

  let increment = () => {
    bakedGood += bunNum;
  };

  $: {
    bunNum;
    if (bunNum != 0) {
      interval = setInterval(increment, 1000);
    }
    if (browser) {
      window.localStorage.setItem(bakerName, bunNum.toString());
    }
  }
</script>

<div
  class="cottontail-rabbit"
  class:hidden={shouldHideBaker}
  style="display: flex; justify-content: center; flex-direction:column;"
>
  <button on:click={buyBun} style="display: flex; justify-content: center;">
    <img src={bunnyImg} alt="buy a bunny" height="200" width="200" />
  </button>
  <p>
    {buyString + bunCost + ' ' + bakedGoodType}
  </p>
</div>
