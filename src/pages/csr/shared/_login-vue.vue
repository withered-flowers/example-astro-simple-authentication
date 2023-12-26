<script setup lang="ts">
import type {
  LoginError,
  LoginFormData,
  LoginResponse,
} from "@/definitions/global";
import { ref, onMounted } from "vue";
import { isLoggedIn } from "@/pages/csr/shared/stores/_login-store";
import { useStore } from "@nanostores/vue";
import { navigate } from "astro:transitions/client";

const $isLoggedIn = useStore(isLoggedIn);
const email = ref("");
const password = ref("");
const isError = ref<boolean>(false);
const errorMessage = ref<string>("");

onMounted(() => {
  // If the user is already logged in, navigate to the protected page
  if ($isLoggedIn.value) {
    navigate("/csr/shared/protected-svelte");
  }
});

const handleSubmit = async () => {
  isError.value = false;
  errorMessage.value = "";

  try {
    const data: LoginFormData = {
      email: email.value,
      password: password.value,
    };

    const response = await fetch("/auth-server/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const responseJson: LoginResponse & LoginError = await response.json();

    /*
      DISCLAIMER: 
      Since we're using a simple JWT Authentication, we're not using any refresh token, so the token will expire in 1 hour.
      
      If you want to use a refresh token, you can use the same approach as the SSR Page, but you need to store the refresh token in the localStorage.
      Then, you can use the refresh token to get a new access token when the access token is expired.
    */

    // Since this is a full CSR Page, and the server is not involved at all for storing credentials, We need to store the token in the localStorage
    if (!responseJson.data) {
      throw new Error(responseJson.error);
    }

    /*
        Since we're now using token AND nanostores, we need to use both of them to login the user.
        - Store the token in the localStorage
        - Set the isLoggedIn "atom" in the nanostore to true
      */
    localStorage.setItem("shared-token", responseJson.data.token);
    // ! Be careful !
    // ! We're calling the "atom.set($atomValue)", not the "$atomValue.set($atomValue)" here !
    isLoggedIn.set(!$isLoggedIn.value);

    // Navigate to the protected page
    navigate("/csr/shared/protected-svelte");
  } catch (err) {
    if (err instanceof Error) {
      isError.value = true;
      errorMessage.value = err.message;
    }
  }
};
</script>

<template>
  <form
    class="flex w-10/12 flex-col gap-4 rounded bg-gray-200 p-4 md:w-1/2 xl:w-1/4"
    id="form-login"
    v-on:submit.prevent="handleSubmit"
  >
    <p class="text-xl font-semibold">Login (CSR - Vue)</p>
    <label for="email" class="w-full">Email</label>
    <input
      type="email"
      id="email"
      name="email"
      class="rounded px-4 py-2"
      placeholder="admin@mail.com"
      required
      aria-required="true"
      v-model="email"
    />

    <label for="password" class="w-full">Password</label>
    <input
      type="password"
      id="password"
      name="password"
      placeholder="administrator"
      class="rounded px-4 py-2"
      minlength="8"
      required
      aria-required="true"
      v-model="password"
    />

    <section class="flex w-full justify-between">
      <button
        type="submit"
        class="rounded bg-[#42b883] px-4 py-2 font-bold text-white transition-colors duration-300 hover:bg-[#42b883]/80"
      >
        Sign In
      </button>
      <button
        disabled
        class="rounded bg-blue-500 px-4 py-2 font-bold text-white transition-colors duration-300 hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-red-400 disabled:opacity-50"
      >
        Register
      </button>
    </section>
  </form>

  <section
    v-if="isError"
    className="animate-pulse text-red-400"
    id="flash-error"
  >
    {{ errorMessage }}
  </section>
</template>
