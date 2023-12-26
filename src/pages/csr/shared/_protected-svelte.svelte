<!-- 
  This is a Protected Page (Top Component)
  Made with Svelte
-->
<script lang="ts">
  import { isLoggedIn } from "@/pages/csr/shared/stores/_login-store";
  import { navigate } from "astro:transitions/client";
  import { onMount } from "svelte";

  onMount(() => {
    if (!isLoggedIn.value) {
      // If not logged in, clear token and redirect to login page
      localStorage.clear();
      navigate("/csr/shared/public-react", {
        history: "replace",
      });
    }
  });
</script>

<p class="text-xl font-semibold">This is the protected routes</p>
<p>
  This route is protected using ONLY a nanostore "shared-state" named
  <b>isLoggedIn</b>
</p>
<p>Since the state will be reverted on refresh (we're not persisting it) ...</p>
<p>Try to refresh this page, and see what will happen !</p>
<p>Remember: you need to enable javascript for this one ~</p>
