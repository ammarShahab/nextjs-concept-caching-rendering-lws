import Image from "next/image";

export default function Home() {
  return (
    <>
      <h1 className="text-3xl font-bold">What is Next.js?</h1>
      <p className="mt-4">
        Next.js is a React framework for building full-stack web applications.
        You use React Components to build user interfaces, and Next.js for
        additional features and optimizations. It also automatically configures
        lower-level tools like bundlers and compilers. You can instead focus on
        building your product and shipping quickly. Whether you're an individual
        developer or part of a larger team, Next.js can help you build
        interactive, dynamic, and fast React applications.
      </p>
    </>
  );
}
