"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import useCreatePlan from "@/hooks/useCreatePlan";
import useVerified, { requestVerification } from "@/hooks/useVerified";

const formSchema = z.object({
  name: z.string().min(3, {
    message: "name of plan must be at least 3 characters.",
  }),
  location: z.string().min(3, {
    message: "should be at least 3 characters in length",
  }),
  participants: z.string().nonempty({
    message: "Participants list can't be empty",
  }),
  pollData: z.object({
    pollItem: z.string().nonempty(),
    pollOptions: z.string().nonempty(),
  }),
});

export default function CreatePlanForm() {
  const { mutate: createPlan, isLoading } = useCreatePlan();
  const { data: isVerified } = useVerified();
  const { toast } = useToast();
  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      location: "",
      participants: "",
      pollData: {
        pollItem: "",
        pollOptions: "",
      },
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: any) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // console.log(values);

    toast({
      title: "Values have been submitted ✅",
      // description: (
      //   <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
      //     <code className="text-white">{JSON.stringify(values, null, 2)}</code>
      //   </pre>
      // ),
    });

    const planResponse = createPlan(values, {
      onSuccess: () => {
        alert("new plan created!");
        form.reset();
      },
      onError: (error) => {
        alert("plan creation failed due to some error!");
        console.log(error);
      },
    });
  }

  if (isLoading) {
    return <h1 className="text-white text-2xl">Loading.....</h1>;
  }

  return (
    <>
      {isVerified ? (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>name</FormLabel>
                    <FormControl>
                      <Input placeholder="hiking" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="buildspace hq, sf" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="participants"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>participants</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="add participants by thier email, seperate multiple entries with comma."
                        className="resize-none w-[20rem]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pollData.pollItem"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>poll-item</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="game, day, time, track etc"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pollData.pollOptions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>poll-options</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="add poll options, seperate multiple entries with comma."
                        className="resize-none w-[20rem]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="">
                create
              </Button>
            </form>
          </Form>
        </>
      ) : (
        <>
          <div className="flex flex-col justify-center items-center gap-2">
            <span className="block">please verify your email to create plans</span>
            <button onClick={requestVerification} className="rounded-md px-3 py-1 bg-slate-500 text-white">verify</button>
          </div>
        </>
      )}
    </>
  );
}
