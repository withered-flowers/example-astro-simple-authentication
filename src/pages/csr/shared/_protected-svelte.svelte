<!-- 
  This is a Protected Page (Top Component)
  Made with Svelte
-->
<script lang="ts">
  import { isLoggedIn } from "@/pages/csr/shared/stores/_login-store";
  import { navigate } from "astro:transitions/client";
  import { onMount } from "svelte";

  // !! IMPORTANT NOTE !!
  onMount(() => {
    /*
      This is NOT the best way to do this, especially on production.

      If you're using in production, the simplest way is you should always use the token to check if the user is logged in or not, not via the state !
    */
    if (!isLoggedIn.value) {
      // If not logged in, clear token and redirect to login page
      localStorage.clear();
      navigate("/csr/shared/public-react", {
        history: "replace",
      });
    }
  });
</script>

<p class="text-xl font-semibold">
  This is the protected routes, made with Svelte
</p>
<p>
  This route is protected using ONLY a nanostore "shared-state" named
  <b>isLoggedIn</b>, and shared between the Login Page made with React and Vue +
  This Page (Svelte)
</p>
<p>Since the state will be reverted on refresh (we're not persisting it) ...</p>
<p>Try to refresh this page, and see what will happen !</p>
<p>Remember: you need to enable javascript for this one ~</p>
