<script lang="ts">
  export let makeABakedGood: () => void;
  export let bakedGoodImg: string;
  export let altText: string;
</script>

<button on:click={makeABakedGood}>
  <img src={bakedGoodImg} alt={altText} height="100" width="100" />
</button>
