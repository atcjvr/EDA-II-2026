import { useMemo, useState } from "react";

import {
  ReactFlow,
  Background,
  Controls,
  Handle,
  Position,
  BaseEdge,
  EdgeLabelRenderer,
  useReactFlow,
  ReactFlowProvider,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

// ==========================================
// NODO PERSONALIZADO
// ==========================================

function CustomNode({ data }) {
  const isCity = data.type === "city";

  return (
    <div
      style={{
        background: isCity ? "#0284c7" : "#16a34a",
        color: "white",
        border: "2px solid #38bdf8",
        borderRadius: "12px",
        padding: "15px",
        width: 220,
        textAlign: "center",
        fontWeight: "bold",
        position: "relative",
      }}
    >
      {/* Conexión de residencia */}

      <Handle
        type="target"
        position={Position.Left}
        id="residence-target"
        style={{
          background: "#38bdf8",
          top: "50%",
        }}
      />

      <Handle
        type="source"
        position={Position.Right}
        id="residence-source"
        style={{
          background: "#38bdf8",
          top: "50%",
        }}
      />

      {/* Conexiones de amistad */}

      {!isCity && (
        <>
          <Handle
            type="source"
            position={Position.Right}
            id="friend-source"
            style={{
              background: "#facc15",
              top: "30%",
            }}
          />

          <Handle
            type="target"
            position={Position.Right}
            id="friend-target"
            style={{
              background: "#facc15",
              top: "70%",
            }}
          />
        </>
      )}

      <div style={{ fontSize: "17px" }}>
        {isCity ? "🏙️" : "👤"} {data.name}
      </div>

      {!isCity && (
        <div
          style={{
            marginTop: "8px",
            fontSize: "13px",
          }}
        >
          {data.age} años
        </div>
      )}
    </div>
  );
}

// ==========================================
// CONEXIÓN CURVA DE AMISTAD
// ==========================================

function FriendshipEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  data,
  selected,
}) {
  const [showLabel, setShowLabel] = useState(false);

  const { getZoom } = useReactFlow();

  const offset = data?.offset ?? 120;

  // La curva sale hacia la derecha,
  // rodea los nodos y regresa al destino.

  const controlX = Math.max(sourceX, targetX) + offset;

  const edgePath = `
    M ${sourceX},${sourceY}
    C ${controlX},${sourceY}
      ${controlX},${targetY}
      ${targetX},${targetY}
  `;

  const labelX = controlX;
  const labelY = (sourceY + targetY) / 2;

  const visible = selected || showLabel;

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        style={{
          stroke: "#facc15",
          strokeWidth: selected ? 4 : 3,
          strokeLinecap: "round",
        }}
        interactionWidth={25}
      />

      {/* Zona invisible para detectar el mouse */}

      <path
        d={edgePath}
        fill="none"
        stroke="transparent"
        strokeWidth={20 / getZoom()}
        style={{
          cursor: "pointer",
          pointerEvents: "stroke",
        }}
        onMouseEnter={() => setShowLabel(true)}
        onMouseLeave={() => setShowLabel(false)}
      />

      {/* Etiqueta de amistad */}

      {visible && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: "absolute",
              transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
              background: "#facc15",
              color: "#0f172a",
              padding: "7px 12px",
              borderRadius: "8px",
              fontSize: "12px",
              fontWeight: "bold",
              pointerEvents: "none",
              whiteSpace: "nowrap",
              zIndex: 1000,
            }}
          >
            {data?.label || "Amistad"}
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
}

// ==========================================
// TIPOS PERSONALIZADOS
// ==========================================

const nodeTypes = {
  custom: CustomNode,
};

const edgeTypes = {
  friendship: FriendshipEdge,
};

// ==========================================
// COMPONENTE PRINCIPAL
// ==========================================

function GraphViewContent({ graph }) {
  const { nodes, edges } = useMemo(() => {
    if (!graph) {
      return {
        nodes: [],
        edges: [],
      };
    }

    const cities = graph.nodes.filter(
      (node) => node.type === "city"
    );

    const people = graph.nodes.filter(
      (node) => node.type === "person"
    );

    // ======================================
    // CREAR NODOS
    // ======================================

    const nodes = [];

    cities.forEach((city, index) => {
      nodes.push({
        id: city.id,
        type: "custom",

        position: {
          x: 100,
          y: index * 200,
        },

        data: {
          ...city,
        },
      });
    });

    people.forEach((person, index) => {
      nodes.push({
        id: person.id,
        type: "custom",

        position: {
          x: 650,
          y: index * 200,
        },

        data: {
          ...person,
        },
      });
    });

    // ======================================
    // CREAR CONEXIONES
    // ======================================

    const edges = [];

    const connections = new Set();

    const friendships = [];

    Object.entries(graph.adjList).forEach(
      ([source, targets]) => {
        targets.forEach((target) => {
          const sourceNode = graph.nodes.find(
            (node) => node.id === source
          );

          const targetNode = graph.nodes.find(
            (node) => node.id === target
          );

          if (!sourceNode || !targetNode) {
            return;
          }

          // Evitar conexiones duplicadas

          const connectionId = [source, target]
            .sort()
            .join("-");

          if (connections.has(connectionId)) {
            return;
          }

          connections.add(connectionId);

          // ==================================
          // RELACIÓN CIUDAD - PERSONA
          // ==================================

          if (
            sourceNode.type !== targetNode.type
          ) {
            const city =
              sourceNode.type === "city"
                ? sourceNode
                : targetNode;

            const person =
              sourceNode.type === "person"
                ? sourceNode
                : targetNode;

            edges.push({
              id: connectionId,

              source: city.id,
              target: person.id,

              sourceHandle: "residence-source",
              targetHandle: "residence-target",

              type: "smoothstep",

              style: {
                stroke: "#38bdf8",
                strokeWidth: 2,
              },
            });
          }

          // ==================================
          // RELACIÓN PERSONA - PERSONA
          // ==================================

          if (
            sourceNode.type === "person" &&
            targetNode.type === "person"
          ) {
            friendships.push({
              id: connectionId,
              sourceNode,
              targetNode,
            });
          }
        });
      }
    );

    // ======================================
    // ORGANIZAR AMISTADES
    // ======================================

    friendships.forEach((friendship, index) => {
      const sourceIndex = people.findIndex(
        (person) =>
          person.id === friendship.sourceNode.id
      );

      const targetIndex = people.findIndex(
        (person) =>
          person.id === friendship.targetNode.id
      );

      // Mantener la conexión desde el nodo
      // superior hacia el inferior.

      const source =
        sourceIndex <= targetIndex
          ? friendship.sourceNode
          : friendship.targetNode;

      const target =
        sourceIndex <= targetIndex
          ? friendship.targetNode
          : friendship.sourceNode;

      edges.push({
        id: friendship.id,

        source: source.id,
        target: target.id,

        sourceHandle: "friend-source",
        targetHandle: "friend-target",

        type: "friendship",

        data: {
          offset: 120 + index * 90,

          label: `${source.name} ↔ ${target.name}`,
        },

        style: {
          stroke: "#facc15",
          strokeWidth: 3,
        },
      });
    });

    return {
      nodes,
      edges,
    };
  }, [graph]);

  return (
    <div
      style={{
        width: "100%",
        height: "750px",
        background: "#0f172a",
        borderRadius: "15px",
        overflow: "hidden",
        border: "1px solid #334155",
      }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        fitViewOptions={{
          padding: 0.2,
        }}
        nodesDraggable={true}
        nodesConnectable={false}
        elementsSelectable={true}
      >
        <Background
          color="#334155"
          gap={20}
        />

        <Controls />
      </ReactFlow>
    </div>
  );
}

// ==========================================
// EXPORTAR COMPONENTE
// ==========================================

function GraphView({ graph }) {
  return (
    <ReactFlowProvider>
      <GraphViewContent graph={graph} />
    </ReactFlowProvider>
  );
}

export default GraphView;