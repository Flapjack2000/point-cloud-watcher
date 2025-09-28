import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  SidebarTrigger
} from "@/components/ui/sidebar";


export default function ControlSidebar() {

  return (
    <>
      <Sidebar>
        <SidebarRail title="Toggle Sidebar (CTRL+B)" />
      </Sidebar>

    </>
  )

}