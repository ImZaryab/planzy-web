"use client";

import pb from "@/lib/pocketbase";
import { useQuery } from "@tanstack/react-query";
import useVerified from "@/hooks/useVerified";

const user = pb.authStore.model?.email;

export default function PlansList() {
  const userID = pb.authStore.model?.id;
  const { data: isVerified } = useVerified();

  async function getPlans() {
    let userPlans: Record<any, any>[] = [];
    const plans = await pb.collection("plans").getFullList();
    plans.map((plan) => {
      if (plan.participantIDs.includes(userID) || plan.createdBy == user) {
        userPlans.push(plan);
      }
    });
    return userPlans;
  }

  const plans = useQuery({
    queryFn: getPlans,
    queryKey: ["get-Plans", userID],
  });

  if (plans.isLoading) {
    return <h1>Loading ...</h1>;
  }

  const Plans = plans.data;
  // console.log(Plans[0].pollData)
  // if(Plans[0]?.pollData){
  //   const stringifiedObj = JSON.stringify(Plans[0].pollData)
  //   const parsedObj = JSON.parse(stringifiedObj);
  //   console.log(parsedObj.pollOptions[1])
  // }

  return (
    <>
      <div className="">
        <div className="text-white flex gap-8">
          {Plans && Plans.length ? 
            Plans.map((item, index) => {
              return (
                <a href={`/plans/${item.id}`} key={index} className="h-56 w-56 bg-yellow-500 flex items-center justify-center rounded-lg relative">
                  {item.status == "Completed" ? <p className="absolute top-2 right-2">✔️</p>:<p className="absolute top-2 right-2">⏳</p>}
                  <span className="text-black">{item.planName}</span>
                </a>
              );
            }) : <p>Looks like you don't have any plans :(</p>}
        </div>
      </div>
    </>
  );
}
