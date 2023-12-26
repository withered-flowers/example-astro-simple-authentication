<!-- 
  This is a Protected Page (Bottom Component)
  Made with Svelte
-->
<script lang="ts">
  import { isLoggedIn } from "@/pages/csr/shared/stores/_login-store";
  import { navigate } from "astro:transitions/client";

  const buttonClick = () => {
    // Clear token and redirect to login page
    localStorage.clear();
    isLoggedIn.set(!$isLoggedIn);

    navigate("/csr/shared/public-vue", {
      history: "replace",
    });
  };
</script>

<p>Press the button below to "gracefully logout" from here</p>

<button
  id="logout-svelte-ssr"
  class="rounded bg-blue-500 px-4 py-2 font-bold text-white transition-colors duration-300 hover:bg-blue-700"
  on:click={buttonClick}>Press this to logout</button
>
