import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";

export interface UiSubMenuItem {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  divider?: boolean;
  subMenu?: UiSubMenuItem[];
}

export interface UiMenuItem {
  type: "text" | "avatar" | "icon";
  label?: string;
  icon?: React.ReactNode;
  tooltip?: string;
  subMenuItems?: UiSubMenuItem[];
}

interface UiMenuProps {
  items: UiMenuItem[];
}

export function UiMenu({ items }: UiMenuProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [activeMenuItems, setActiveMenuItems] = React.useState<UiSubMenuItem[]>([]);
  const [subAnchorEl, setSubAnchorEl] = React.useState<null | HTMLElement>(null);
  const [activeSubMenu, setActiveSubMenu] = React.useState<UiSubMenuItem[] | null>(null);

  const open = Boolean(anchorEl);
  const subOpen = Boolean(subAnchorEl);

  const handleTriggerClick = (event: React.MouseEvent<HTMLElement>, items?: UiSubMenuItem[]) => {
    if (!items) return;
    setAnchorEl(event.currentTarget);
    setActiveMenuItems(items);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSubAnchorEl(null);
    setActiveSubMenu(null);
  };

  const handleSubMenuOpen = (event: React.MouseEvent<HTMLElement>, subMenu: UiSubMenuItem[]) => {
    setSubAnchorEl(event.currentTarget);
    setActiveSubMenu(subMenu);
  };

  const renderMenuItems = (items: UiSubMenuItem[]) =>
    items.map((item, idx) =>
      item.divider ? (
        <Divider key={`divider-${idx}`} />
      ) : (
        <MenuItem
          key={item.label}
          onClick={() => {
            if (item.subMenu) return;
            item.onClick?.();
            handleClose();
          }}
          onMouseEnter={(e) => {
            if (item.subMenu) {
              handleSubMenuOpen(e, item.subMenu);
            }
          }}
        >
          {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
          {item.label}
        </MenuItem>
      )
    );

  const renderTrigger = (item: UiMenuItem, index: number) => {
    if (item.type === "text") {
      return (
        <Typography
          key={index}
          sx={{ minWidth: 100, cursor: item.subMenuItems ? "pointer" : "default" }}
          onClick={(e) => item.subMenuItems && handleTriggerClick(e, item.subMenuItems)}
        >
          {item.label}
        </Typography>
      );
    }

    if (item.type === "avatar") {
      return (
        <Tooltip key={index} title={item.tooltip || ""}>
          <IconButton
            onClick={(e) => item.subMenuItems && handleTriggerClick(e, item.subMenuItems)}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>
              {item.label?.charAt(0)}
            </Avatar>
          </IconButton>
        </Tooltip>
      );
    }

    if (item.type === "icon") {
      return (
        <Tooltip key={index} title={item.tooltip || ""}>
          <IconButton
            onClick={(e) => item.subMenuItems && handleTriggerClick(e, item.subMenuItems)}
            size="small"
            sx={{ ml: 2 }}
          >
            {item.icon}
          </IconButton>
        </Tooltip>
      );
    }

    return null;
  };

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        {items.map((item, idx) => renderTrigger(item, idx))}
      </Box>

      {/* Main submenu for selected trigger */}
      <Menu
        anchorEl={anchorEl}
        id="submenu"
        open={open}
        onClose={handleClose}
        // PaperProps={{
        //   elevation: 0,
        //   sx: {
        //     overflow: "visible",
        //     filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
        //     mt: 1.5,
        //     "& .MuiAvatar-root": {
        //       width: 32,
        //       height: 32,
        //       ml: -0.5,
        //       mr: 1,
        //     },
        //     "&::before": {
        //       content: '""',
        //       display: "block",
        //       position: "absolute",
        //       top: 0,
        //       right: 14,
        //       width: 10,
        //       height: 10,
        //       bgcolor: "background.paper",
        //       transform: "translateY(-50%) rotate(45deg)",
        //       zIndex: 0,
        //     },
        //   },
        // }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {renderMenuItems(activeMenuItems)}
      </Menu>

      {/* Nested sub menu */}
      <Menu
        anchorEl={subAnchorEl}
        open={subOpen}
        onClose={() => setSubAnchorEl(null)}
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
        transformOrigin={{ horizontal: "left", vertical: "top" }}
      >
        {activeSubMenu && renderMenuItems(activeSubMenu)}
      </Menu>
    </React.Fragment>
  );
}

export default UiMenu;

// USAGE
// <UiMenu
//   triggers={[
//     {
//       type: "text",
//       label: "Contact",
//       menuItems: [
//         { label: "Email", onClick: () => alert("Email Contact") },
//         { label: "Phone", onClick: () => alert("Phone Contact") },
//       ],
//     },
//     {
//       type: "text",
//       label: "Profile",
//       menuItems: [
//         { label: "View Profile", onClick: () => alert("View Profile") },
//         { label: "Edit Profile" },
//       ],
//     },
//     {
//       type: "avatar",
//       label: "M",
//       tooltip: "Account settings",
//       menuItems: [
//         { label: "My account" },
//         {
//           label: "Settings",
//           subMenu: [
//             { label: "Privacy", onClick: () => alert("Privacy settings") },
//             { label: "Notifications" },
//           ],
//         },
//         { divider: true, label: "" },
//         { label: "Logout", onClick: () => alert("Logging out") },
//       ],
//     },
//   ]}
// />

