import pb from "@/lib/pocketbase";
import { useQuery } from "@tanstack/react-query";

export default function useVerified() {
  const userID = pb.authStore.model?.id;

  async function checkVerified() {
    if (userID !== undefined) {
      const userData = await pb.collection("users").getOne(userID);
      return userData.verified;
    }
  }

  // queryKey stores data to serve on same calls, but here even though we are performing the same function,
  // it may have different results because of the userID being different.
  // and so, this syntax then caches the data against this composite key.
  return useQuery({
    queryFn: checkVerified,
    queryKey: ["check-verified", userID],
  });
}

export async function requestVerification() {
  const email = pb.authStore.model?.email;
  const response = await pb.collection("users").requestVerification(email);
  if (response) {
    alert("Verification email sent! Please check your inbox.");
  }
}
