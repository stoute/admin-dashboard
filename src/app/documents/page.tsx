import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Link from "next/link";
import DocumentsDashboard from "@/components/Documents/DocumentsDashboard";
import CrudInterface from "@/components/CrudInterface/CrudInterface";

export const metadata: Metadata = {
  title: "Next.js Home | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Home page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const Home = () => {
  return (
    <DefaultLayout>
      <CrudInterface />
      <DocumentsDashboard />
    </DefaultLayout>
  );
};

export default Home;
