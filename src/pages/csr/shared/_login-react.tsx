/**
 * This is the CSR Page for Login
 * Made with React
 */
import type {
  LoginError,
  LoginFormData,
  LoginResponse,
} from "@/definitions/global";
import { isLoggedIn } from "@/pages/csr/shared/stores/_login-store";
import { useStore } from "@nanostores/react";
import { navigate } from "astro:transitions/client";
import { useRef, useState } from "react";

const Page = () => {
  // Based on nanostores documentation, we can use the useStore hook to get the value of the "atom" (in this case, isLoggedIn)
  // And based on astro documentation about nanostores, every state inside nanostore will be declared using a "$" prefix
  const $isLoggedIn = useStore(isLoggedIn);
  const formRef = useRef<HTMLFormElement>(null);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsError(false);
    setErrorMessage("");

    try {
      const formData = new FormData(formRef.current as HTMLFormElement);
      const email = formData.get("email");
      const password = formData.get("password");

      if (!email || !password) {
        // TODO: Show error message
        return;
      }

      const data: LoginFormData = {
        email: email.toString(),
        password: password.toString(),
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
      localStorage.setItem("token", responseJson.data.token);
      // ! Be careful !
      // ! We're calling the "atom.set($atomValue)", not the "$atomValue.set($atomValue)" here !
      isLoggedIn.set(!$isLoggedIn);

      // Navigate to the protected page
      navigate("/csr/shared/protected-svelte");
    } catch (err) {
      if (err instanceof Error) {
        setIsError(true);
        setErrorMessage(err.message);
      }
    }
  };

  return (
    <>
      <form
        className="flex w-10/12 flex-col gap-4 rounded bg-gray-200 p-4 md:w-1/2 xl:w-1/4"
        id="form-login"
        onSubmit={handleSubmit}
        ref={formRef}
      >
        <p className="text-xl font-semibold">Login (CSR - React)</p>
        <label htmlFor="email" className="w-full">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="rounded px-4 py-2"
          placeholder="admin@mail.com"
          required
          aria-required="true"
        />

        <label htmlFor="password" className="w-full">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="administrator"
          className="rounded px-4 py-2"
          minLength={8}
          required
          aria-required="true"
        />

        <section className="flex w-full justify-between">
          <button
            type="submit"
            className="rounded bg-blue-500 px-4 py-2 font-bold text-white transition-colors duration-300 hover:bg-blue-700"
          >
            Sign In
          </button>
          <button
            disabled
            className="rounded bg-blue-500 px-4 py-2 font-bold text-white transition-colors duration-300 hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-red-400 disabled:opacity-50"
          >
            Register
          </button>
        </section>
      </form>

      {isError && (
        <section className="animate-pulse text-red-400" id="flash-error">
          {errorMessage}
        </section>
      )}
    </>
  );
};

export default Page;
