import React, { useMemo } from "react";
import ContextMenu, { Position } from "devextreme-react/context-menu";
import List from "devextreme-react/list";
import { useAuth } from "../../contexts/auth";
import "./user-panel.scss";

const top_info_style = {
  height: "30px",
};

export default function UserPanel({ menuMode }) {
  const { user, signOut } = useAuth();

  const menuItems = useMemo(
    () => [
      {
        text: "Logout",
        icon: "runner",
        onClick: signOut,
      },
    ],
    [signOut]
  );

  return (
    <div className={"user-panel"}>
      <div className={"user-info"} style={top_info_style}>
        <div className={"user-name"}>{user.username}</div>
      </div>

      {menuMode === "context" && (
        <ContextMenu
          items={menuItems}
          target={".user-button"}
          showEvent={"dxclick"}
          width={210}
          cssClass={"user-menu"}
        >
          <Position my={"top center"} at={"bottom center"} />
        </ContextMenu>
      )}
      {menuMode === "list" && (
        <List className={"dx-toolbar-menu-action"} items={menuItems} />
      )}
    </div>
  );
}
