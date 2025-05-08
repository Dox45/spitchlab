// 'use client';

// import React, { useState } from 'react';
// import Modal from 'react-modal';

// Modal.setAppElement('body'); // Important for accessibility

// export default function NodeModal({ isOpen, onClose, onSubmit }) {
//   const [label, setLabel] = useState('');
//   const [description, setDescription] = useState('');
//   const [inputs, setInputs] = useState(1);
//   const [outputs, setOutputs] = useState(1);

//   const handleSubmit = () => {
//     onSubmit({ label, description, inputs, outputs });
//     setLabel('');
//     setDescription('');
//     setInputs(1);
//     setOutputs(1);
//     onClose();
//   };

//   return (
//     <Modal
//       isOpen={isOpen}
//       onRequestClose={onClose}
//       contentLabel="Add Node"
//       style={{
//         content: {
//           background: '#091b54',
//           color: "white",
//           borderRadius: '12px',
//           padding: '20px',
//           maxWidth: '400px',
//           margin: 'auto',
//           top: '30%',
//         },
//       }}
//     >
//       <h2 style={{ marginBottom: 10 }}>Add Node</h2>
//       <input placeholder="Label" value={label} onChange={(e) => setLabel(e.target.value)} />
//       <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
//       <input
//             type="number"
//             placeholder="Number of inputs"
//             value={inputs}
//             onChange={(e) => setInputs(Number(e.target.value))}
//             style={{
//               color: 'white',
//               backgroundColor: '#1f2937', // gray-800
//               border: '1px solid #4b5563', // gray-600
//               padding: '8px',
//               borderRadius: '6px',
//               marginBottom: '10px',
//               width: '100%',
//               outline: 'none',
//             }}
//           />

//       <input type="number" placeholder="number of outputs" value={outputs} onChange={(e) => setOutputs(Number(e.target.value))} 
//       style={{
//               color: 'white',
//               backgroundColor: '#1f2937', // gray-800
//               border: '1px solid #4b5563', // gray-600
//               padding: '8px',
//               borderRadius: '6px',
//               marginBottom: '10px',
//               width: '100%',
//               outline: 'none',
//             }}
//             />
//       <button
//         onClick={handleSubmit}
//         style={{
//           backgroundColor: '#22c55e', // Tailwind's green-500
//           color: '#fff',
//           padding: '8px 16px',
//           border: 'none',
//           borderRadius: '8px',
//           cursor: 'pointer',
//           fontWeight: 'bold',
//         }}
//       >
//         Add
//       </button>

//     </Modal>
//   );
// }


"use client";

import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('body');

export default function NodeModal({ isOpen, onClose, onSubmit }) {
  const [label, setLabel] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    if (label.trim()) {
      onSubmit({ label, description });
      setLabel('');
      setDescription('');
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Add Node"
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
        },
        content: {
          position: 'static',
          backgroundColor: '#1e293b',
          color: 'white',
          borderRadius: '10px',
          maxWidth: '400px',
          width: '90%',
          padding: '24px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
        },
      }}
    >
      <h2 style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>Add a new Pathway</h2>

      <input
        type="text"
        placeholder="Node Label"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        style={{
          width: '100%',
          padding: '10px',
          marginBottom: '12px',
          borderRadius: '6px',
          border: '1px solid #475569',
          background: '#334155',
          color: 'white',
        }}
      />

      <textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={3}
        style={{
          width: '100%',
          padding: '10px',
          borderRadius: '6px',
          border: '1px solid #475569',
          background: '#334155',
          color: 'white',
        }}
      />

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
        <button
          onClick={handleSubmit}
          style={{
            backgroundColor: 'green',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '6px',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 'bold',
            transition: 'background 0.2s',
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#059669')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#10b981')}
        >
          Add Node
        </button>
      </div>
    </Modal>
  );
}
