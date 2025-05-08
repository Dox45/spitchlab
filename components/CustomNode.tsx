// import React from 'react';
// import { Handle, Position } from '@xyflow/react';

// export default function CustomNode({ data }) {
//   // const { label, inputs = 1, outputs = 1 } = data;
//   const { label, description = '', inputs = 1, outputs = 1 } = data;


//   return (
//     <div
//       style={{
//         position: 'relative',
//         padding: '12px',
//         borderRadius: '8px',
//         backgroundColor: 'black',
//         border: '2px solid #4f46e5',
//         color: 'white',
//         fontWeight: 500,
//         boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
//         minWidth: 160,
//         textAlign: 'center',
//       }}
//     >
//       {/* Label */}
//       <div>{label}</div>
//       <div style={{ fontSize: '12px', color: 'white' }}>{description}</div>


//       {/* Input handles (left side) */}
//       {[...Array(inputs)].map((_, i) => (
//         <Handle
//           key={`input-${i}`}
//           type="target"
//           position={Position.Left}
//           id={`input-${i}`}
//           style={{
//             top: `${(i + 1) * 20}px`,
//             background: '#000',
//             width: '10px',
//             height: '10px',
//             borderRadius: '50%',
//           }}
//         />
//       ))}

//       {/* Output handles (right side) */}
//       {[...Array(outputs)].map((_, i) => (
//         <Handle
//           key={`output-${i}`}
//           type="source"
//           position={Position.Right}
//           id={`output-${i}`}
//           style={{
//             top: `${(i + 1) * 20}px`,
//             background: '#555',
//             width: '10px',
//             height: '10px',
//             borderRadius: '50%',
//           }}
//         />
//       ))}
//     </div>
//   );
// }


// import React from 'react';
// import { Handle, Position } from '@xyflow/react';

// export default function CustomNode({ data }) {
//   const { label, description = '' } = data;

//   return (
//     <div
//       style={{
//         padding: 10,
//         borderRadius: 8,
//         background: '#f9f9f9',
//         border: '2px solid #4f46e5',
//         color: '#111',
//         fontWeight: 500,
//         boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
//         minWidth: 150,
//         textAlign: 'center',
//         position: 'relative',
//       }}
//     >
//       <div>{label}</div>
//       <div style={{ fontSize: '12px', color: '#555' }}>{description}</div>

//       {/* One input (left) */}
//       <Handle
//         type="target"
//         position={Position.Left}
//         id="input"
//         style={{ top: '50%', background: 'black' }}
//       />

//       {/* One output (right) */}
//       <Handle
//         type="source"
//         position={Position.Right}
//         id="output"
//         style={{ top: '50%', background: '#555' }}
//       />
//     </div>
//   );
// }

import React from 'react';
import { Handle, Position } from '@xyflow/react';

export default function CustomNode({ data }) {
  const { label, description = '' } = data;

  return (
    <div
      style={{
        padding: 10,
        borderRadius: 8,
        background: 'black',
        border: '2px solid #4f46e5',
        color: 'white',
        fontWeight: 500,
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        minWidth: 150,
        textAlign: 'center',
        position: 'relative',
      }}
    >
      <div>{label}</div>
      <div style={{ fontSize: '12px', color: 'white' }}>{description}</div>

      {/* Allow multiple connections to target and source handles via unique ids */}
      <Handle
        type="target"
        id="a"
        position={Position.Left}
        style={{ top: '40%', background: 'black' }}
        isConnectable={true}
      />

      <Handle
        type="source"
        id="b"
        position={Position.Right}
        style={{ top: '40%', background: '#10b981' }}
        isConnectable={true}
      />
    </div>
  );
}
