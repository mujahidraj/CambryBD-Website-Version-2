import { redirect } from "next/navigation";
import AdminLayout from "@/components/admin/AdminLayout";
import { Toaster } from "react-hot-toast";

export const dynamic = "force-dynamic";

export const metadata = {
    title: "Admin Panel | Cambry",
};

export default async function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Toaster position="top-right" />
            <AdminLayout>{children}</AdminLayout>
        </>
    );
}
