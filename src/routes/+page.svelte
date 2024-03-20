<script lang="ts">
  import { browser } from '$app/environment';
  import muffinImg from '$lib/assets/simpleMuffin.png';
  import cottontailRabbitImg from '$lib/assets/simpleCottontail.png';
  import BakedGood from './BakedGood.svelte';
  import Baker from './Baker.svelte';

  let muffins: number = browser ? parseInt(window.localStorage.getItem('muffins')) || 0 : 0;
  let cookies: number = browser ? parseInt(window.localStorage.getItem('cookies')) || 0 : 0;
  let cottontailBunNum: number = browser
    ? parseInt(window.localStorage.getItem('cottontailBunNum')) || 0
    : 0;
  let hollandLopBunNum: number = browser
    ? parseInt(window.localStorage.getItem('hollandLopBunNum')) || 0
    : 0;
  let cottontailBunnyCost: number = 5;
  let hollandLopBunnyCost: number = 20;
  let muffinInterval: number;
  let cookieInterval: number;
  let shouldHideCottontail: boolean = muffins <= 3;
  let shouldHideHollandLopBunny: boolean = cookies <= 20;
  let shouldHideCookies: boolean = muffins <= 20;

  let muffinIncrement = () => {
    muffins += cottontailBunNum;
  };
  let cookieIncrement = () => {
    cookies += hollandLopBunNum;
  };

  let makeAMuffin = () => {
    muffins += 1;
    if (muffins > 3) {
      shouldHideCottontail = false;
    }
    if (muffins > 20) {
      shouldHideCookies = false;
    }
  };

  let makeACookie = () => {
    cookies += 1;
    if (cookies > 20) {
      shouldHideHollandLopBunny = false;
    }
  };

  let buyCottontailRabbit = () => {
    if (muffins >= cottontailBunnyCost) {
      muffins -= cottontailBunnyCost;
      cottontailBunnyCost = Math.trunc(1.2 * cottontailBunnyCost);
      cottontailBunNum += 1;
    }
  };

  let buyHollandLop = () => {
    if (cookies >= hollandLopBunnyCost) {
      cookies -= hollandLopBunnyCost;
      hollandLopBunnyCost = Math.trunc(1.2 * hollandLopBunnyCost);
      hollandLopBunNum += 1;
    }
  };

  let reset = () => {
    muffins = 0;
    cookies = 0;
    cottontailBunNum = 0;
    hollandLopBunNum = 0;
    shouldHideCottontail = true;
    shouldHideHollandLopBunny = true;
    shouldHideCookies = true;
    clearInterval(muffinInterval);
    clearInterval(cookieInterval);

    window.localStorage.setItem('muffins', muffins.toString());
    window.localStorage.setItem('cookies', muffins.toString());
    window.localStorage.setItem('cottontailBunNum', cottontailBunNum.toString());
    window.localStorage.setItem('hollandLopBunNum', hollandLopBunNum.toString());
  };

  $: {
    muffins;
    if (browser) {
      window.localStorage.setItem('muffins', muffins.toString());
    }
  }

  $: {
    cookies;
    if (browser) {
      window.localStorage.setItem('cookies', cookies.toString());
    }
  }

  $: {
    cottontailBunNum;
    if (cottontailBunNum != 0) {
      muffinInterval = setInterval(muffinIncrement, 1000);
    }
    if (browser) {
      window.localStorage.setItem('cottontailBunNum', cottontailBunNum.toString());
    }
  }

  $: {
    hollandLopBunNum;
    if (hollandLopBunNum != 0) {
      cookieInterval = setInterval(cookieIncrement, 1000);
    }
    if (browser) {
      window.localStorage.setItem('hollandLopBunNum', hollandLopBunNum.toString());
    }
  }
</script>

{#if browser}
  <div style="display:flex; justify-content:space-evenly">
    <div id="muffin-stuffs" style="display: flex; align-items: center; flex-direction:column;">
      <p class="muffin-instructions">Click a muffin, make a muffin</p>
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
          makeABakedGood={makeAMuffin}
          altText="the muffin makin muffin"
          bakedGoodImg={muffinImg}
        />
        <span class:hidden={shouldHideCookies}>
          <BakedGood
            makeABakedGood={makeACookie}
            altText="clicking of the cookie"
            bakedGoodImg={muffinImg}
          />
        </span>
      </div>
      <div style="display: flex; justify-content: center; align">
        <Baker
          shouldHideBaker={shouldHideCottontail}
          bunnyImg={cottontailRabbitImg}
          buyBun={buyCottontailRabbit}
          buyString={'Convince a cottontail bunny to join you: ' + cottontailBunnyCost + ' muffins'}
        />
        <Baker
          shouldHideBaker={shouldHideHollandLopBunny}
          bunnyImg={cottontailRabbitImg}
          buyBun={buyHollandLop}
          buyString={'Convince a holland lop to join you: ' + hollandLopBunnyCost + ' cookies'}
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
