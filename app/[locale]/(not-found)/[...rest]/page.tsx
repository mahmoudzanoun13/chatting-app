import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return [{ rest: ["not-found"] }];
}

export async function generateMetadata() {
  return {
    title: "404 - Not Found",
  };
}

export default function CatchAll() {
  notFound();
}
