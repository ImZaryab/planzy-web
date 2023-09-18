"use client";

import useGetPlan from "@/hooks/useGetPlan";
import pb from "@/lib/pocketbase";
import { useState, useEffect } from "react";

type Props = {
  params: {
    id: string;
  };
};

export default function Plan({ params: { id } }: Props) {
  const { data: Plan, isLoading } = useGetPlan(id);
  const [voteCasted, setVoteCasted] = useState(false);
  const [vote, setVote] = useState("");
  const userID = pb.authStore.model?.id;

  if (isLoading) {
    return <p>Loading...</p>;
  }
  //   console.log(Plan);

  if (!Plan) {
    return <>Plan is undefined</>;
  }

  let planStatus = "";
  if (Plan.hasVoted.length < Plan.participants.length + 1) {
    planStatus = "Voting In-progress ⏳";
  } else {
    planStatus = "Voting Completed ✔️";
  }

  async function handleRegisterVote(e: any) {
    e.preventDefault();
    if (!Plan) {
      return;
    }

    let newPollData = Plan.pollData;

    // console.log(newPollData.pollCount[vote], newPollData.pollCount[vote]+1)

    newPollData = {
      ...newPollData,
      pollCount: {
        ...newPollData.pollCount,
        [vote]: newPollData.pollCount[vote] + 1,
      },
    };

    const record = await pb.collection("plans").update(id, {
      pollData: newPollData,
      hasVoted: [...Plan.hasVoted, userID],
    });
    if (record) {
      alert("Vote Submitted!");
      setVoteCasted(true);
    }
    setVote("");
  }
  return (
    <div className="bg-blue-500 h-[40rem] flex flex-col justify-between w-4/5 rounded-xl relative px-4 pb-10">
      {Plan && (
        <>
          <h1 className="absolute top-2 left-4 text-xl font-semibold text-white">
            {Plan.planName}
          </h1>
          <h1 className="absolute top-2 right-4 text-xl text-white">
            {planStatus}
          </h1>
          <div className="w-full">
            <section className="flex flex-col w-full mt-16">
              {/* <p className="text-center py-2 px-2 bg-green-500 text-white">
              General Details
            </p> */}
              <p className="font-semibold text-xl">
                Location: <span className="font-normal">{Plan.location}</span>
              </p>
              <p className="font-semibold text-xl">
                Created By:{" "}
                <span className=" font-normal">{Plan.createdBy}</span>
              </p>
              <p className="font-semibold text-xl">Participants:</p>
              <div className="flex gap-1 mt-1">
                {Plan.participants.map((item: string, index: any) => (
                  <p
                    className="pb-2 rounded-2xl max-w-max py-1 px-2 bg-yellow-500 text-white"
                    key={index}
                  >
                    {item}
                  </p>
                ))}
              </div>
            </section>
            <section className="flex flex-col w-full">
              <div className="">
                <div className="w-full">
                  <p className="font-semibold text-xl">
                    Poll-Item:{" "}
                    <span className="font-normal">
                      {Plan?.pollData?.pollItem}
                    </span>
                  </p>
                  {/* <p className="font-semibold text-xl">Poll Votes:</p> */}
                  <p className="w-full mt-4 text-center text-xl py-2 px-2 bg-green-500 text-white">
                    Votes
                  </p>
                  <div className="flex flex-col gap-1 mt-4">
                    {Plan?.pollData?.pollOptions
                      .split(", ")
                      .map((item: string, index: any) => (
                        <p key={index} className="text-xl">
                          {item}
                          {": "}
                          {Plan.pollData.pollCount[item]}
                        </p>
                      ))}
                  </div>
                </div>
                <div className="mt-10">
                  {!Plan.hasVoted.includes(userID) ? (
                    <form>
                      <p className="w-full mt-4 text-center text-xl py-2 px-2 bg-green-500 text-white">
                        Cast Vote
                      </p>
                      {Plan?.pollData?.pollOptions
                        .split(", ")
                        .map((item: string, index: any) => (
                          <div key={index} className="flex gap-1 items-center">
                            <input
                              onChange={(e) => setVote(e.target.value)}
                              type="radio"
                              id={item}
                              name={Plan?.pollData?.pollItem}
                              value={item}
                            />{" "}
                            <label htmlFor={item}>{item}</label>
                          </div>
                        ))}
                    </form>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </section>
          </div>
          <section className="mt-2 flex justify-center items-center">
            <button
              onClick={handleRegisterVote}
              disabled={Plan.hasVoted.includes(userID)}
              className={`py-2 px-3 ${
                Plan.hasVoted.includes(userID)
                  ? "cursor-not-allowed bg-slate-600 text-slate-400"
                  : "bg-yellow-500 text-white"
              }`}
            >
              {Plan.hasVoted.includes(userID) ? "Vote Casted" : "Cast Vote"}
            </button>
          </section>
        </>
      )}
    </div>
  );
}
