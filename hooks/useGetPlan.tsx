import pb from "@/lib/pocketbase"
import { useQuery } from "@tanstack/react-query";

const user = pb.authStore.model?.email;

export default function useGetPlan(id: string) {
    const userID = pb.authStore.model?.id;

    async function getPlanById(){
        const plan = await pb.collection("plans").getOne(id, { requestKey: null });
        return plan
    }

    return useQuery({
        queryFn: getPlanById,
        queryKey: ["get-plan-by-id", userID],
      });
}

export async function getParticipants(id: string){
    const plan = await pb.collection("plans").getOne(id);
    var participants: any = []
    plan.participants.map(async (item: any) => {
        let user = await pb.collection("users").getOne(item)
        participants.push(user.email)
    })
    console.log(participants)
    return participants
}