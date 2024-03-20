<script lang="ts">
  export let shouldHideBaker: boolean;
  export let buyBun: () => void;
  export let bunnyImg: string;
  export let buyString: string;
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
    {buyString}
  </p>
</div>
