import * as React from 'react';

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from '@/components/ui/sidebar';
import LogoutButton from '../Auth/LogOut/LogOut';

const data = {
    navMain: [
        {
            title: 'Navigation',
            url: '#',
            items: [
                {
                    title: 'Dashboard',
                    url: '/dashboard',
                },
            ],
        },
        {
            title: 'Incident Management',
            url: '#',
            items: [
                {
                    title: 'Create New Incident',
                    url: '/incidents',
                },
                {
                    title: 'Search Incidents',
                    url: '/incidents/search',
                },
            ],
        },
        // Future Features to implement

        // Post Mortems
        // {
        //     title: 'Post Mortems',
        //     url: '#',
        //     items: [
        //         {
        //             title: 'Components',
        //             url: '#',
        //         },
        //         {
        //             title: 'File Conventions',
        //             url: '#',
        //         },
        //         {
        //             title: 'Functions',
        //             url: '#',
        //         },
        //         {
        //             title: 'next.config.js Options',
        //             url: '#',
        //         },
        //         {
        //             title: 'CLI',
        //             url: '#',
        //         },
        //         {
        //             title: 'Edge Runtime',
        //             url: '#',
        //         },
        //     ],
        // },
        // User Management
        // {
        //     title: 'User Management',
        //     url: '#',
        //     items: [
        //         {
        //             title: 'Accessibility',
        //             url: '#',
        //         },
        //     ],
        // },
    ],
};

export function AppSidebar({ ...props }) {
    return (
        <Sidebar {...props}>
            <SidebarContent>
                {/* We create a SidebarGroup for each parent. */}
                {data.navMain.map((item) => (
                    <SidebarGroup key={item.title}>
                        <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {item.items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={item.isActive}
                                        >
                                            <a href={item.url}>{item.title}</a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>
            <SidebarRail />
            <LogoutButton />
        </Sidebar>
    );
}
