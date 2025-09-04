import React, { memo, useState, useEffect, useRef } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';

interface CustomNodeProps extends NodeProps {
  onLabelChange: (id: string, label: string) => void;
}

const CustomNode: React.FC<CustomNodeProps> = ({ id, data, isConnectable, onLabelChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [label, setLabel] = useState(data.label);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setLabel(data.label);
  }, [data.label]);
  
  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing]);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    if (label.trim() !== data.label) {
        onLabelChange(id, label.trim());
    }
    setIsEditing(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (label.trim() !== data.label) {
        onLabelChange(id, label.trim());
      }
      setIsEditing(false);
    } else if (event.key === 'Escape') {
      setLabel(data.label); // Revert changes
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <>
        <Handle type="target" position={Position.Left} isConnectable={isConnectable} className="!bg-teal-500 !opacity-0" />
        <div className="px-5 py-3 shadow-md rounded-xl bg-gray-800 border-2 border-indigo-500 text-white min-w-[150px] max-w-[200px] text-center">
          <input
            ref={inputRef}
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className="w-full bg-transparent text-center font-bold focus:outline-none"
            aria-label="Node label editor"
          />
        </div>
        <Handle type="source" position={Position.Right} isConnectable={isConnectable} className="!bg-teal-500 !opacity-0" />
      </>
    );
  }

  return (
    <>
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
        className="!bg-teal-500"
      />
      <div 
        onDoubleClick={handleDoubleClick}
        className="px-5 py-3 shadow-md rounded-xl bg-gray-800 border-2 border-gray-600 text-white min-w-[150px] max-w-[200px] text-center cursor-pointer hover:border-indigo-500 transition-colors"
        title="Double-click to edit"
      >
        <div className="font-bold">{data.label}</div>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        className="!bg-teal-500"
      />
    </>
  );
};

export default memo(CustomNode);