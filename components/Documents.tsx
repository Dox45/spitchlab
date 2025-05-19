// "use client";

// import { useState, useEffect, useRef } from "react";
// import { useClerk } from "@clerk/nextjs";

// interface Document {
//   document_id: number;
//   title: string;
// }

// export default function DocumentsModal() {
//   const [documents, setDocuments] = useState<Document[]>([]);
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [isOpen, setIsOpen] = useState<boolean>(false);
//   const { session } = useClerk();
//   const modalRef = useRef<HTMLDivElement>(null);

//   const fetchDocuments = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       if (!session) throw new Error("No active session");
//       const token = await session.getToken();
//       const response = await fetch("http://localhost:8000/list-documents", {
//         method: "GET",
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (!response.ok) throw new Error(await response.text());
//       const data = await response.json();
//       setDocuments(data.documents || []);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Failed to fetch documents");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (documentId: number) => {
//     setError(null);
//     try {
//       if (!session) throw new Error("No active session");
//       const token = await session.getToken();
//       const response = await fetch("http://localhost:8000/delete-document", {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ document_id: documentId }),
//       });
//       if (!response.ok) throw new Error(await response.text());
//       await fetchDocuments();
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Failed to delete document");
//     }
//   };

//   const openModal = () => {
//     setIsOpen(true);
//     fetchDocuments();
//   };

//   const closeModal = () => {
//     setIsOpen(false);
//     setError(null);
//   };

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
//         closeModal();
//       }
//     };
//     if (isOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isOpen]);

//   useEffect(() => {
//     const handleKeyDown = (event: KeyboardEvent) => {
//       if (event.key === "Escape") closeModal();
//     };
//     if (isOpen) {
//       document.addEventListener("keydown", handleKeyDown);
//     }
//     return () => {
//       document.removeEventListener("keydown", handleKeyDown);
//     };
//   }, [isOpen]);

//   return (
//     <div>
//       <button
//         onClick={openModal}
//         className="bg-green-600 hover:bg-green-700 transition text-white px-4 py-2 rounded-lg font-semibold shadow-md"
//       >
//         View Documents
//       </button>

//       {isOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
//           <div
//             ref={modalRef}
//             className="bg-neutral-900 text-white rounded-2xl p-6 w-full max-w-lg max-h-[80vh] overflow-y-auto shadow-2xl border border-neutral-700"
//           >
//             <h2 className="text-2xl font-bold mb-4 text-green-400">Uploaded Documents</h2>
//             {loading && <p className="text-neutral-400">Loading...</p>}
//             {error && <p className="text-red-400 mb-4">{error}</p>}
//             {documents.length === 0 && !loading && !error && (
//               <p className="text-neutral-400">No documents uploaded.</p>
//             )}

//             <ul className="space-y-3 mb-6">
//               {documents.map((doc) => (
//                 <li
//                   key={doc.document_id}
//                   className="flex justify-between items-center bg-neutral-800 rounded-lg p-3 border border-neutral-700"
//                 >
//                   <span className="text-white">{doc.title}</span>
//                   <button
//                     onClick={() => handleDelete(doc.document_id)}
//                     className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md transition disabled:opacity-50"
//                     disabled={loading}
//                   >
//                     Delete
//                   </button>
//                 </li>
//               ))}
//             </ul>

//             <button
//               onClick={closeModal}
//               className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg w-full font-semibold transition"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import { useEffect, useRef, useState } from "react";
import { useClerk } from "@clerk/nextjs";

interface Document {
  document_id: number;
  title: string;
}

export default function DocumentsModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { session } = useClerk();
  const modalRef = useRef<HTMLDivElement>(null);

  const fetchDocuments = async () => {
    setLoading(true);
    setError(null);
    try {
      if (!session) throw new Error("No active session");
      const token = await session.getToken();
      const response = await fetch("http://localhost:8000/list-documents", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error(await response.text());
      const data = await response.json();
      setDocuments(data.documents || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch documents");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (documentId: number) => {
    setError(null);
    try {
      if (!session) throw new Error("No active session");
      const token = await session.getToken();
      const response = await fetch("http://localhost:8000/delete-document", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ document_id: documentId }),
      });
      if (!response.ok) throw new Error(await response.text());
      await fetchDocuments();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete document");
    }
  };

  const closeModal = () => {
    onOpenChange(false);
    setError(null);
  };

  useEffect(() => {
    if (open) fetchDocuments();
  }, [open]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        closeModal();
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeModal();
    };
    if (open) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className="bg-neutral-900 text-white rounded-2xl p-6 w-full max-w-lg max-h-[80vh] overflow-y-auto shadow-2xl border border-neutral-700"
      >
        <h2 className="text-2xl font-bold mb-4 text-green-400">Uploaded Documents</h2>
        {loading && <p className="text-neutral-400">Loading...</p>}
        {error && <p className="text-red-400 mb-4">{error}</p>}
        {documents.length === 0 && !loading && !error && (
          <p className="text-neutral-400">No documents uploaded.</p>
        )}

        <ul className="space-y-3 mb-6">
          {documents.map((doc) => (
            <li
              key={doc.document_id}
              className="flex justify-between items-center bg-neutral-800 rounded-lg p-3 border border-neutral-700"
            >
              <span className="text-white">{doc.title}</span>
              <button
                onClick={() => handleDelete(doc.document_id)}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md transition disabled:opacity-50"
                disabled={loading}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>

        <button
          onClick={closeModal}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg w-full font-semibold transition"
        >
          Close
        </button>
      </div>
    </div>
  );
}
