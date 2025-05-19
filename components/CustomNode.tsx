
// import React from 'react';
// import { Handle, Position } from '@xyflow/react';

// export default function CustomNode({ data }) {
//   const { label, description = '' } = data;

//   return (
//     <div
//       style={{
//         padding: 10,
//         borderRadius: 8,
//         background: 'black',
//         border: '2px solid #4f46e5',
//         color: 'white',
//         fontWeight: 500,
//         boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
//         minWidth: 150,
//         textAlign: 'center',
//         position: 'relative',
//       }}
//     >
//       <div>{label}</div>
//       <div style={{ fontSize: '12px', color: 'white' }}>{description}</div>

//       {/* Allow multiple connections to target and source handles via unique ids */}
//       <Handle
//         type="target"
//         id="a"
//         position={Position.Left}
//         style={{ top: '40%', background: 'black' }}
//         isConnectable={true}
//       />

//       <Handle
//         type="source"
//         id="b"
//         position={Position.Right}
//         style={{ top: '40%', background: '#10b981' }}
//         isConnectable={true}
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
        borderRadius: 12,
        background: 'black',
        border: '2px solid #4f46e5',
        color: 'white',
        fontWeight: 500,
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        maxWidth: 200,
        minWidth: 150,
        wordWrap: 'break-word',
        overflowWrap: 'break-word',
        textAlign: 'left',
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
      }}
    >
      <div style={{ fontSize: '14px', fontWeight: 'bold' }}>
        {label}
      </div>
      {description && (
        <div style={{ fontSize: '12px', color: '#d1d5db' }}>{description}</div>
      )}

      <Handle
        type="target"
        id="a"
        position={Position.Left}
        style={{ top: '50%', background: 'black', border: '2px solid #4f46e5' }}
        isConnectable={true}
      />

      <Handle
        type="source"
        id="b"
        position={Position.Right}
        style={{ top: '50%', background: '#10b981', border: '2px solid #059669' }}
        isConnectable={true}
      />
    </div>
  );
}
