'use client';

import React, { useCallback, useState, useEffect } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import CustomNode from '@/components/CustomNode';
import NodeModal from '@/components/NodeModal';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import GoogleCalendarButton from "@/components/GCalendarButton";
import IntegrationsButton from "@/components/Integration";
import FileUploader from "@/components/Widget";


const nodeTypes = { custom: CustomNode };

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [showModal, setShowModal] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const { user, isLoaded } = useUser();
  const router = useRouter();
  
  useEffect(() => {
    if (!isLoaded) return;
    if (!user) router.push('/sign-in');
  }, [user, isLoaded, router]);

  const fetchFlowData = async () => {
    if (!user?.id) return;

    try {
      const res = await fetch(`/api/load-flow?user_id=${user.id}`);

      if (!res.ok) {
        const errorText = await res.text();
        console.error('Failed to fetch:', res.status, errorText);
        return;
      }

      const data = await res.json();
      setNodes(data.nodes || []);
      setEdges(data.edges || []);
      setIsDataLoaded(true);
    } catch (err) {
      console.error('Error during fetchFlowData:', err);
    }
  };

  const saveFlowData = async (nodesToSave, edgesToSave) => {
  try {
    await fetch('/api/save-flow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nodes: nodesToSave, edges: edgesToSave }),
    });
  } catch (err) {
    console.error('Failed to save flow data:', err);
  }
};


  useEffect(() => {
    if (user?.id) fetchFlowData();
  }, [user]);

  useEffect(() => {
    if (isDataLoaded) {
      saveFlowData(nodes, edges); // autosave
    }
  }, [nodes.length, edges.length, isDataLoaded]);

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge({ ...params, style: { stroke: '#4f46e5', strokeWidth: 2 } }, eds)
      ),
    [setEdges]
  );

  const handleNodeSubmit = ({ label, description }) => {
    const id = `${+new Date()}`;
    const newNode = {
      id,
      type: 'custom',
      position: { x: Math.random() * 500, y: Math.random() * 300 },
      data: { label, description },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  return (
    <div style={{ width: '100vw', height: '100vh', background: 'white', position: 'relative' }}>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          padding: '10px 20px',
          backgroundColor: '#1f2937',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
        }}
      >
        <button
          onClick={() => setShowModal(true)}
          style={{
            padding: '8px 16px',
            backgroundColor: '#4f46e5',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          ➕ Add Node
        </button>

        <button
          onClick={() => saveFlowData(nodes, edges)}
          style={{
            padding: '8px 16px',
            backgroundColor: '#10b981',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          💾 Save Flow
        </button>

        <GoogleCalendarButton />
        <IntegrationsButton />
        <FileUploader />
      </div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <MiniMap
          nodeColor={() => '#4f46e5'}
          nodeStrokeWidth={3}
          maskColor="rgba(10,19,48,0.6)"
          bgColor="white"
        />
        <Controls style={{ backgroundColor: 'black', color: 'black', borderRadius: 6 }} />
      </ReactFlow>

      <NodeModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleNodeSubmit}
      />
    </div>
  );
}
