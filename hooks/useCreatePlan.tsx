import pb from "@/lib/pocketbase";
import { useMutation } from "@tanstack/react-query";

type TPollOptions = {
  pollItem: string;
  pollOptions: string;
};

type TFormValues = {
  name: string;
  location: string;
  participants: string;
  pollData: TPollOptions;
};

const currentUser = pb.authStore.model?.email;

export default function useCreatePlan() {
  async function createPlan(data: TFormValues) {    

    const allUsers = await pb.collection("users").getFullList();

    const userEmails = data.participants.split(", ");

    let participantIDs: string[] = [];
    userEmails.forEach((email) => {
      allUsers.map((user) => {
        if (user.email == email) {
          participantIDs.push(user.id);
        }
      });
    });

    let pollCount = {};
    data.pollData.pollOptions.split(", ").map((item) => {
      pollCount = { ...pollCount, [item]: 0 };
    });

    let allPollData = { ...data.pollData, "pollCount": { ...pollCount } };

    const planResponse = await pb.collection("plans").create({
      planName: data.name,
      location: data.location,
      createdBy: currentUser,
      participants: participantIDs,
      pollData: JSON.stringify(allPollData),
    });
  }
  return useMutation({ mutationFn: createPlan });
}
