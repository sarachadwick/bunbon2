<script lang="ts">
  import { browser } from '$app/environment';
  import muffinImg from '$lib/assets/simpleMuffin.png';
  import cottontailRabbitImg from '$lib/assets/simpleCottontail.png';

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
  let interval;
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

  $: {
    muffins;
    if (browser) {
      window.localStorage.setItem('muffins', muffins.toString());
    }
  }

  $: {
    cookies;
    if (browser) {
      window.localStorage.setItem('cookies', muffins.toString());
    }
  }

  $: {
    cottontailBunNum;
    if (cottontailBunNum != 0) {
      interval = setInterval(muffinIncrement, 1000);
    }
    if (browser) {
      window.localStorage.setItem('cottontailBunNum', cottontailBunNum.toString());
    }
  }

  $: {
    hollandLopBunNum;
    if (hollandLopBunNum != 0) {
      interval = setInterval(cookieIncrement, 1000);
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
      <p>Muffins:</p>
      <p class="muffin-count">{muffins}</p>
      <span class:hidden={shouldHideCookies}>
        <p>Cookies:</p>
        <p class="muffin-count">{cookies}</p>
      </span>
    </div>
    <div id="clickables">
      <div style="display: flex; justify-content: center;">
        <button on:click={makeAMuffin}>
          <img src={muffinImg} alt="the muffin-makin muffin" height="100" width="100" />
        </button>
        <span class:hidden={shouldHideCookies}>
          <button on:click={makeACookie}>
            <img src={muffinImg} alt="clicking of the cookie" height="100" width="100" />
          </button>
        </span>
      </div>
      <div style="display: flex; justify-content: center; align">
        <div
          class="cottontail-rabbit"
          class:hidden={shouldHideCottontail}
          style="display: flex; justify-content: center; flex-direction:column;"
        >
          <button on:click={buyCottontailRabbit} style="display: flex; justify-content: center;">
            <img src={cottontailRabbitImg} alt="buy a bunny" height="200" width="200" />
          </button>
          <p>
            Convince a cottontail bunny to join you: {cottontailBunnyCost} muffins
          </p>
        </div>
        <div
          class="holland-lop-rabbit"
          class:hidden={shouldHideHollandLopBunny}
          style="display: flex; justify-content: center; flex-direction:column;"
        >
          <button on:click={buyHollandLop} style="display: flex; justify-content: center;">
            <img src={cottontailRabbitImg} alt="buy a holland lop" height="200" width="200" />
          </button>
          <p>
            Convince a cottontail bunny to join you: {hollandLopBunnyCost} cookies
          </p>
        </div>
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
