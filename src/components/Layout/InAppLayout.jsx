import { AppSidebar } from '@/components/Sidebar/app-sidebar';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from '@/components/ui/sidebar';
import Footer from '../Footer/Footer';

export default function InAppLayout({ children }) {
    return (
        <div
            className="flex flex-col min-h-svh mx-auto bg-background text-foreground"
            id="layout"
        >
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator
                            orientation="vertical"
                            className="mr-2 h-4"
                        />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className="hidden md:block">
                                    <BreadcrumbLink href="/dashboard">
                                        Aftermath Archive
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                {/* <BreadcrumbSeparator className="hidden md:block" />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                            </BreadcrumbItem> */}
                            </BreadcrumbList>
                        </Breadcrumb>
                    </header>
                    <main
                        className="flex-grow p-4 max-w-80ch"
                        id="main-content"
                    >
                        {children}
                    </main>
                    <Footer />
                </SidebarInset>
            </SidebarProvider>
        </div>
    );
}
