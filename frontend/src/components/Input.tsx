import React, { forwardRef } from 'react';

interface InputProps {
  placeholder: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ placeholder }, ref) => {
  return (
    <div>
      <input
        placeholder={placeholder}
        type="text"
        className="px-4 py-2 border rounded m-2"
        ref={ref} // Pass the ref here
      />
    </div>
  );
});

Input.displayName = 'Input'; // Optional but recommended for debugging

export default Input;
