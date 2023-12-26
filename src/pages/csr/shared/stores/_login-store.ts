/*
  DISCLAIMER:
  This file should be inside the "src" folder (src/stores).

  But since this is not for production and for learning purpose only,
  I'll put in here for easy access.
*/

/*
  We will only use "atom" for this example
  There's another one called "maps" but we won't use it for now.
*/
import { atom } from "nanostores";

export const isLoggedIn = atom<boolean>(false);
