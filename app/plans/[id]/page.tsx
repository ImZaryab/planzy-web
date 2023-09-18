import Plan from "@/components/Plan";

type Props = {
  params: {
    id: string;
  };
};

export default function page({ params: { id } }: Props) {
  return (
    <>
      <a href="/plans" className="absolute text-white top-2 left-4">
        go back
      </a>
      <main className="flex flex-col justify-center items-center min-h-screen w-full">
        <Plan params={{ id }} />
      </main>
    </>
  );
}
