<template>
  <form
    class="flex w-10/12 flex-col gap-4 rounded bg-gray-200 p-4 md:w-1/2 xl:w-1/4"
    id="form-login"
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
</template>
