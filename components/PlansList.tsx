"use client";

import pb from "@/lib/pocketbase";
import { useQuery } from "@tanstack/react-query";
import useVerified, { requestVerification } from "@/hooks/useVerified";

const user = pb.authStore.model?.email;

export default function PlansList() {
  const userID = pb.authStore.model?.id;
  const { data: isVerified } = useVerified();

  async function getPlans() {
    let userPlans: Record<any, any>[] = [];
    const plans = await pb.collection("plans").getFullList();
    plans.map((plan) => {
      if (plan.participants.includes(userID) || plan.createdBy == user) {
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
                <div key={index} className="h-56 w-56 bg-yellow-500 flex items-center justify-center rounded-lg">
                  <span className="text-black">{item.planName}</span>
                </div>
              );
            }) : <p>Looks like you don't have any plans :(</p>}
        </div>
      </div>
    </>
  );
}
