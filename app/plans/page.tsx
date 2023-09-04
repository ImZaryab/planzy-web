import PlansList from "@/components/PlansList"

export default function page() {
  return (
    <main className="flex justify-center items-center min-h-screen">
      <a href="/menu" className="absolute text-white top-2 left-4">go back</a>
      <section className="bg-blue-500 h-[40rem] w-4/5 flex justify-center items-center rounded-xl relative">
        <h1 className="absolute top-2 left-4 text-xl font-semibold text-white">plans</h1>
        <PlansList />
      </section>
    </main>
  )
}
