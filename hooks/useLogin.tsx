import Cookies from "js-cookie";
import pb from "../lib/pocketbase";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

export default function useLogout(LoggedInStateSetter: any) {
  const router = useRouter();
  async function login({ email, password }: any) {
    const authData = await pb
      .collection("users")
      .authWithPassword(email, password)
      .then((res) => {
        if (res) {
          LoggedInStateSetter(true);
          Cookies.set("loggedIn", "true");
          router.push("/menu");
        }
      });
  }
  return useMutation(login);
}
