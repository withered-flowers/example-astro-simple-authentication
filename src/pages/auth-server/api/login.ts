import type {
  LoginFormData,
  LoginPayload,
  LoginResponseData,
} from "@/definitions/global";
import { ERR_INVALID_CREDS_CODE, errorCreator } from "@/lib/error-creator";
import { signPayload } from "@/lib/jwt";
import type { APIRoute } from "astro";

// ! This is a super simple login API Route
// ! You need to use database to store and validate user credentials
export const POST: APIRoute = async ({ request }) => {
  try {
    // { email: string, password: string }
    const body: LoginFormData = await request.json();

    // Sleep for 500ms to simulate fetching data from database
    await new Promise((resolve) => setTimeout(resolve, 500));

    const { email, password } = body;

    // We will just simulating the login process here
    if (email === "admin@mail.com" && password === "administrator") {
      const payload: LoginPayload = {
        email,
        date: new Date(),
      };

      // Create a JWT token
      const token = await signPayload(payload);

      return Response.json({
        statusCode: 200,
        data: {
          token: token,
        } as LoginResponseData,
      });
    } else {
      throw new Error(ERR_INVALID_CREDS_CODE);
    }
  } catch (error) {
    return errorCreator(error);
  }
};
