<script lang="ts">
  export let bakedGoodImg: string;
  export let altText: string;
  export let bakedGood: number;

  let makeABakedGood = () => {
    bakedGood += 1;
  };
</script>

<button on:click={makeABakedGood}>
  <img src={bakedGoodImg} alt={altText} height="100" width="100" />
</button>
