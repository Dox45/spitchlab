// 'use client';

// import React, { useCallback, useState, useEffect } from 'react';
// import {
//   ReactFlow,
//   MiniMap,
//   Controls,
//   useNodesState,
//   useEdgesState,
//   addEdge,
//   Background,
// } from '@xyflow/react';
// import '@xyflow/react/dist/style.css';
// import Link from "next/link"
// import CustomNode from '@/components/CustomNode';
// import NodeModal from '@/components/NodeModal';
// import { useRouter } from 'next/navigation';
// import { useUser } from '@clerk/nextjs';
// import GoogleCalendarButton from "@/components/GCalendarButton";
// import IntegrationsButton from "@/components/Integration";
// import FileUploader from "@/components/Widget";
// import DocumentsModal from "@/components/Documents";
// import { FlaskConical, Bot, Plus, FileText ,  Save, Calendar, Upload, Sidebar } from "lucide-react";

// const nodeTypes = { custom: CustomNode };

// export default function App() {
//   const [nodes, setNodes, onNodesChange] = useNodesState([]);
//   const [edges, setEdges, onEdgesChange] = useEdgesState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
//     integrations: true,
//     documents: true,
//   });

//   const { user, isLoaded } = useUser();
//   const router = useRouter();

//   const [showIntegrations, setShowIntegrations] = useState(false);
//   const [showDocuments, setShowDocuments] = useState(false);


  // useEffect(() => {
  //   if (!isLoaded) return;
  //   if (!user) router.push('/sign-in');
  // }, [user, isLoaded, router]);

  // const fetchFlowData = async () => {
  //   if (!user?.id) return;

  //   try {
  //     const res = await fetch(`/api/load-flow?user_id=${user.id}`);
  //     if (!res.ok) throw new Error(await res.text());

  //     const data = await res.json();
  //     setNodes(data.nodes || []);
  //     setEdges(data.edges || []);
  //   } catch (err) {
  //     console.error('Error fetching flow data:', err);
  //   }
  // };

  // useEffect(() => {
  //   if (user?.id) fetchFlowData();
  // }, [user]);

  // const saveFlowData = async (nodesToSave, edgesToSave) => {
  //   try {
  //     await fetch('/api/save-flow', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ nodes: nodesToSave, edges: edgesToSave }),
  //     });
  //   } catch (err) {
  //     console.error('Failed to save flow data:', err);
  //   }
  // };

  // const onConnect = useCallback(
  //   (params) =>
  //     setEdges((eds) =>
  //       addEdge({ ...params, style: { stroke: '#4f46e5', strokeWidth: 2 } }, eds)
  //     ),
  //   [setEdges]
  // );

//   const handleNodeSubmit = ({ label, description }) => {
//     const id = `${+new Date()}`;
//     const newNode = {
//       id,
//       type: 'custom',
//       position: { x: Math.random() * 500, y: Math.random() * 300 },
//       data: { label, description },
//     };
//     setNodes((nds) => [...nds, newNode]);
//   };

//   return (
//     <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
//       {/* Sidebar */}
//       <div
//         style={{
//           width: sidebarOpen ? '250px' : '0px',
//           backgroundColor: '#111827',
//           color: 'white',
//           transition: 'width 0.3s',
//           overflowX: 'hidden',
//           padding: sidebarOpen ? '1rem' : '0',
//         }}
//       >
//         <h2 className="text-lg font-bold mb-4">SpitchLabs</h2>
//       <button
//             onClick={() => setShowIntegrations(true)} // directly opens Integrations modal
//             className="w-full flex items-center gap-2 text-gray-700 font-medium px-2 py-1 rounded-md hover:bg-gray-100 transition"
//           >
//             <Plus className="w-4 h-4 text-gray-600" />
//             <span>Integrations</span>
//           </button>
//           <IntegrationsButton open={showIntegrations} onOpenChange={setShowIntegrations} />


//           <button
//             onClick={() => setShowDocuments(true)} // directly opens Documents modal
//             className="w-full flex items-center gap-2 text-gray-700 font-medium px-2 py-1 rounded-md hover:bg-gray-100 transition"
//           >
//             <FileText className="w-4 h-4 text-gray-600" />
//             <span>Documents</span>
//           </button>
//           <DocumentsModal open={showDocuments} onOpenChange={setShowDocuments} />

//         <Link href="/dashboard/test_query" className="flex items-center gap-2 p-2 text-gray-700 hover:bg-indigo-100 rounded-md transition">
//           <FlaskConical className="w-4 h-4 text-indigo-600" />
//           <span>Test RAG Query</span>
//         </Link>

//         <Link href="/dashboard/test_agent" className="flex items-center gap-2 p-2 text-gray-700 hover:bg-indigo-100 rounded-md transition">
//             <Bot className="w-4 h-4 text-indigo-600" />
//             <span>Test Agent</span>
//           </Link>

//       </div>

//       {/* Main content */}
//       <div style={{ flexGrow: 1, position: 'relative' }}>
//         {/* Top navbar */}
//         <div
//           style={{
//             position: 'absolute',
//             top: 0,
//             left: 0,
//             right: 0,
//             zIndex: 1000,
//             backgroundColor: '#1f2937',
//             padding: '10px 20px',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'space-between',
//             boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
//           }}
//         >
//        <div className="flex items-center gap-2">
//           <button
//             onClick={() => setShowModal(true)}
//             aria-label="Add Node"
//             title="Add Node"
//             className="flex items-center justify-center w-10 h-10 bg-slate-700 text-slate-300 rounded hover:bg-slate-600 transition"
//           >
//             <Plus className="w-5 h-5" />
//           </button>

//           <button
//             onClick={() => saveFlowData(nodes, edges)}
//             aria-label="Save Flow"
//             title="Save Flow"
//             className="flex items-center justify-center w-10 h-10 bg-slate-700 text-slate-300 rounded hover:bg-slate-600 transition"
//           >
//             <Save className="w-5 h-5" />
//           </button>
//         </div>

//         <div className="flex items-center gap-2">
//           <GoogleCalendarButton
//             className="w-10 h-10 bg-slate-700 text-slate-300 rounded hover:bg-slate-600 transition flex items-center justify-center"
//             aria-label="Google Calendar"
//             title="Google Calendar"
//           />
//           <FileUploader
//             className="w-10 h-10 bg-slate-700 text-slate-300 rounded hover:bg-slate-600 transition flex items-center justify-center"
//             aria-label="Upload File"
//             title="Upload File"
//           />

//           <button
//             onClick={() => setSidebarOpen(!sidebarOpen)}
//             aria-label={sidebarOpen ? "Hide Sidebar" : "Show Sidebar"}
//             title={sidebarOpen ? "Hide Sidebar" : "Show Sidebar"}
//             className="flex items-center justify-center w-10 h-10 bg-slate-700 text-slate-300 rounded hover:bg-slate-600 transition"
//           >
//             <Sidebar className="w-5 h-5" />
//           </button>
//         </div>


//         </div>

//         {/* React Flow canvas */}
//         <div style={{ width: '100%', height: '100%', paddingTop: '60px' }}>
          // <ReactFlow
          //   nodes={nodes}
          //   edges={edges}
          //   onNodesChange={onNodesChange}
          //   onEdgesChange={onEdgesChange}
          //   onConnect={onConnect}
          //   nodeTypes={nodeTypes}
          //   fitView
          // >
//             <MiniMap
//               nodeColor={() => '#4f46e5'}
//               nodeStrokeWidth={3}
//               maskColor="rgba(10,19,48,0.6)"
//               bgColor="white"
//             />
         
//             <Controls style={{ backgroundColor: 'black', color: 'black', borderRadius: 6 }} />
//             <Background color="#aaa" gap={16} />
//           </ReactFlow>
//         </div>

//         <NodeModal
//           isOpen={showModal}
//           onClose={() => setShowModal(false)}
//           onSubmit={handleNodeSubmit}
//         />
//       </div>
//     </div>
//   );
// }


"use client"

import React, { useCallback, useState, useEffect } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
  Background,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import Link from "next/link"
import CustomNode from '@/components/CustomNode';
import NodeModal from '@/components/NodeModal';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import GoogleCalendarButton from "@/components/GCalendarButton";
import IntegrationsButton from "@/components/Integration";
import FileUploader from "@/components/Widget";
import DocumentsModal from "@/components/Documents";
import { FlaskConical, Bot, Plus, FileText ,  Save, Calendar, Upload, Sidebar } from "lucide-react";

const nodeTypes = {
  custom: CustomNode,
}

export default function FlowCanvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [showModal, setShowModal] = useState(false)
  const [showDocuments, setShowDocuments] = useState(false)
  const [showIntegrations, setShowIntegrations] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
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
      if (!res.ok) throw new Error(await res.text());

      const data = await res.json();
      setNodes(data.nodes || []);
      setEdges(data.edges || []);
    } catch (err) {
      console.error('Error fetching flow data:', err);
    }
  };

  useEffect(() => {
    if (user?.id) fetchFlowData();
  }, [user]);

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

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge({ ...params, style: { stroke: '#4f46e5', strokeWidth: 2 } }, eds)
      ),
    [setEdges]
  );


  // const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges])

  const handleNodeSubmit = (label: string, data: any) => {
    const newNode = {
      id: `${+new Date()}`,
      type: "custom",
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: { label, ...data },
    }
    setNodes((nds) => [...nds, newNode])
    setShowModal(false)
  }

 

  return (
    <div className="flex h-screen bg-white text-gray-800 font-sans overflow-hidden">
      {/* Sidebar */}
      <div className={`transition-all duration-300 ease-in-out ${sidebarOpen ? 'w-64' : 'w-0'} bg-gray-50 border-r border-gray-200 overflow-hidden`}>
        {sidebarOpen && (
          <div className="h-full p-4 space-y-4">
            <h2 className="text-xl font-bold text-indigo-600">SpitchLabs</h2>

            <button onClick={() => setShowIntegrations(true)} className="flex items-center gap-2 text-sm text-gray-700 hover:bg-indigo-50 px-3 py-2 rounded-md transition">
              <Plus className="w-4 h-4" />
              <span>Integrations</span>
            </button>
            <IntegrationsButton open={showIntegrations} onOpenChange={setShowIntegrations} />

            <button onClick={() => setShowDocuments(true)} className="flex items-center gap-2 text-sm text-gray-700 hover:bg-indigo-50 px-3 py-2 rounded-md transition">
              <FileText className="w-4 h-4" />
              <span>Documents</span>
            </button>
            <DocumentsModal open={showDocuments} onOpenChange={setShowDocuments} />

            <Link href="/dashboard/test_query" className="flex items-center gap-2 text-sm text-gray-700 hover:bg-indigo-100 px-3 py-2 rounded-md transition">
              <FlaskConical className="w-4 h-4 text-indigo-500" />
              <span>Test RAG Query</span>
            </Link>

            <Link href="/dashboard/test_agent" className="flex items-center gap-2 text-sm text-gray-700 hover:bg-indigo-100 px-3 py-2 rounded-md transition">
              <Bot className="w-4 h-4 text-indigo-500" />
              <span>Test Agent</span>
            </Link>
          </div>
        )}
      </div>

      {/* Main content */}
      <div className="flex-1 relative">
        {/* Topbar */}
        <div className="absolute top-0 left-0 right-0 z-10 bg-gray-100 shadow-sm border-b border-gray-200 px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button onClick={() => setShowModal(true)} className="p-2 rounded hover:bg-indigo-100 transition" title="Add Node">
              <Plus className="w-5 h-5 text-indigo-600" />
            </button>
            <button onClick={saveFlowData} className="p-2 rounded hover:bg-indigo-100 transition" title="Save Flow">
              <Save className="w-5 h-5 text-indigo-600" />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <GoogleCalendarButton className="p-2 bg-white hover:bg-indigo-100 rounded transition" />
            <FileUploader className="p-2 bg-white hover:bg-indigo-100 rounded transition" />
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded hover:bg-indigo-100 transition" title="Toggle Sidebar">
              <Sidebar className="w-5 h-5 text-indigo-600" />
            </button>
          </div>
        </div>

        {/* Canvas */}
        {/* <div className="absolute inset-0 pt-12"> */}
        <div style={{ width: '100%', height: '100%', paddingTop: '60px' }}>
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
              nodeColor={() => '#6366f1'}
              nodeStrokeWidth={2}
              maskColor="rgba(100,116,139,0.2)"
              bgColor="white"
            />
            <Controls style={{ backgroundColor: 'white', borderRadius: '6px' }} />
            {/* <Background color="#e5e7eb" gap={16} /> */}
            <Background color="black" gap={16} />
          </ReactFlow>
        </div>

        {/* Node creation modal */}
        <NodeModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSubmit={handleNodeSubmit}
        />
      </div>
    </div>
  )
}
