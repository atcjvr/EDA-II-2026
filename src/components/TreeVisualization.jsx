import { useEffect, useRef, useState } from "react";
import Tree from "react-d3-tree";

// Convertir nuestro árbol binario al formato de react-d3-tree
function convertTree(node) {
  if (!node) return null;

  const children = [];

  if (node.left) {
    children.push(convertTree(node.left));
  }

  if (node.right) {
    children.push(convertTree(node.right));
  }

  return {
    name: String(node.value),
    children,
  };
}

function TreeVisualization({ root }) {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({
    width: 800,
    height: 450,
  });

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;

      setDimensions({ width, height });
    });

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  const treeData = convertTree(root);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "450px",
        backgroundColor: "#0f172a",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      {treeData ? (
        <Tree
          data={treeData}
          orientation="vertical"
          pathFunc="step"
          translate={{
            x: dimensions.width / 2,
            y: 70,
          }}
          nodeSize={{ x: 160, y: 100 }}
          separation={{ siblings: 1.5, nonSiblings: 2 }}
          collapsible={false}
          zoomable={true}
          draggable={true}
          renderCustomNodeElement={({ nodeDatum }) => (
            <g>
              <circle
                r="25"
                fill="#0284c7"
                stroke="#38bdf8"
                strokeWidth="3"
              />

              <text
                textAnchor="middle"
                dominantBaseline="central"
                fill="white"
                stroke="none"
                fontSize="16"
                fontWeight="bold"
              >
                {nodeDatum.name}
              </text>
            </g>
          )}
        />
      ) : (
        <p
          style={{
            textAlign: "center",
            color: "#94a3b8",
            paddingTop: "180px",
          }}
        >
          El árbol está vacío. Agrega un número para comenzar.
        </p>
      )}
    </div>
  );
}

export default TreeVisualization;