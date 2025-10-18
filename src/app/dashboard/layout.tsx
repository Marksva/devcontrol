import { DashBoardHeader } from "./components/header";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <DashBoardHeader />
            {children}
        </>
    )
}