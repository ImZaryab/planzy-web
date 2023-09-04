import pb from "../lib/pocketbase";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function useLogout(LoggedInStateSetter: any) {
  const router = useRouter();

  function logout() {
    pb.authStore.clear();
    LoggedInStateSetter(false);
    Cookies.remove("loggedIn")
    router.push('/');
  }

  return logout;
}
