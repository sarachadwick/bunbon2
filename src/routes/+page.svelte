<script lang="ts">
  import { browser } from '$app/environment';
  import muffinImg from '$lib/assets/simpleMuffin.png';
  import cottontailRabbitImg from '$lib/assets/simpleCottontail.png';
  import BakedGood from './BakedGood.svelte';
  import Baker from './Baker.svelte';

  let getNumFromLocalStorage: (itemName: string) => number = (itemName) => {
    return browser ? parseInt(window.localStorage.getItem(itemName) || '') || 0 : 0;
  };
  let muffins: number = getNumFromLocalStorage('muffins');
  let cookies: number = getNumFromLocalStorage('cookies');
  let cottontailBunNum: number = getNumFromLocalStorage('cottontailBunNum');
  let hollandLopBunNum: number = getNumFromLocalStorage('hollandLopBunNum');
  let shouldHideCottontail: boolean = muffins <= 3;
  let shouldHideHollandLopBunny: boolean = cookies <= 20;
  let shouldHideCookies: boolean = muffins <= 20;

  let reset = () => {
    muffins = 0;
    cookies = 0;
    cottontailBunNum = 0;
    hollandLopBunNum = 0;
    shouldHideCottontail = true;
    shouldHideHollandLopBunny = true;
    shouldHideCookies = true;

    window.localStorage.setItem('muffins', muffins.toString());
    window.localStorage.setItem('cookies', muffins.toString());
    window.localStorage.setItem('cottontailBunNum', cottontailBunNum.toString());
    window.localStorage.setItem('hollandLopBunNum', hollandLopBunNum.toString());
  };

  $: {
    muffins;
    if (muffins > 3) {
      shouldHideCottontail = false;
    }
    if (muffins > 20) {
      shouldHideCookies = false;
    }
    if (browser) {
      window.localStorage.setItem('muffins', muffins.toString());
    }
  }

  $: {
    cookies;
    if (cookies > 20) {
      shouldHideHollandLopBunny = false;
    }
    if (browser) {
      window.localStorage.setItem('cookies', cookies.toString());
    }
  }
</script>

{#if browser}
  <div style="display:flex; justify-content:space-evenly">
    <div id="muffin-stuffs" style="display: flex; align-items: center; flex-direction:column;">
      <p class="muffin-instructions">Click a muffin, make a muffin</p>
      <!-- svelte-ignore a11y-invalid-attribute -->
      <a href="#" class="muffin-instructions" on:click={reset}> reset </a>
      <p>Muffins:</p>
      <p class="muffin-count">{muffins}</p>
      <span class:hidden={shouldHideCookies}>
        <p>Cookies:</p>
        <p class="muffin-count">{cookies}</p>
      </span>
    </div>
    <div id="clickables">
      <div style="display: flex; justify-content: center;">
        <BakedGood
          bind:bakedGood={muffins}
          altText="the muffin makin muffin"
          bakedGoodImg={muffinImg}
        />
        <span class:hidden={shouldHideCookies}>
          <BakedGood
            bind:bakedGood={cookies}
            altText="clicking of the cookie"
            bakedGoodImg={muffinImg}
          />
        </span>
      </div>
      <div style="display: flex; justify-content: center; align">
        <Baker
          shouldHideBaker={shouldHideCottontail}
          bunnyImg={cottontailRabbitImg}
          buyString={'Convince a cottontail bunny to join you: '}
          bakedGoodType={'muffins'}
          bind:bakedGood={muffins}
          bunCost={5}
          bunNum={cottontailBunNum}
          bakerName={'cottontailBunNum'}
        />
        <Baker
          shouldHideBaker={shouldHideHollandLopBunny}
          bunnyImg={cottontailRabbitImg}
          buyString={'Convince a holland lop to join you: '}
          bakedGoodType={'cookies'}
          bind:bakedGood={cookies}
          bunCost={20}
          bunNum={hollandLopBunNum}
          bakerName={'hollandLopBunNum'}
        />
      </div>
    </div>
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
