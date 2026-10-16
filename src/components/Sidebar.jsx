import { useState } from "react";
import { menuTree } from "../data/menuData.js";

function Sidebar({ onSelect, selectedLink }) {

  const [expandedMenus, setExpandedMenus] = useState({});

  // Expandir o contraer un menú
  const toggleMenu = (title) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  // Dibujar los nodos del árbol
  const renderMenu = (nodes, level = 0) => {

    return nodes.map((node) => {

      const hasChildren = node.children.length > 0;
      const isExpanded = expandedMenus[node.link] || false;
      const isSelected = selectedLink === node.link;

      return (
        <div key={node.link}>

          <div
            className={`menu-item ${isSelected ? "active" : ""}`}
            style={{ paddingLeft: `${20 + level * 20}px` }}
            onClick={() => {

              onSelect(node);

              if (hasChildren) {
                toggleMenu(node.link);
              }

            }}
          >

            <span>{node.title}</span>

            {hasChildren && (
              <span className="menu-arrow">
                {isExpanded ? "▼" : "▶"}
              </span>
            )}

          </div>

          {hasChildren && isExpanded && (
            <div className="submenu">
              {renderMenu(node.children, level + 1)}
            </div>
          )}

        </div>
      );
    });
  };

  return (
    <aside className="sidebar">

      <h2 className="sidebar-title">
        Challenge 09
      </h2>

      <p className="sidebar-subtitle">
        Menú N-ario
      </p>

      <nav>
        {renderMenu(menuTree.root.children)}
      </nav>

    </aside>
  );
}

export default Sidebar;