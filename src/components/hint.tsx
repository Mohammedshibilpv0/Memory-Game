// import React from 'react';
// import { Button } from 'antd';

// interface HintProps {
//   hintsRemaining: number;
//   isHintActive: boolean;
//   isChecking: boolean;
//   onHint: () => void;
// }

// export const Hint: React.FC<HintProps> = ({ 
//   hintsRemaining, 
//   isHintActive, 
//   isChecking, 
//   onHint 
// }) => {
//   return (
//     <Button
//       onClick={onHint}
//       disabled={hintsRemaining <= 0 || isHintActive || isChecking}
//       className="ml-4"
//     >
//       Hint ({hintsRemaining})
//     </Button>
//   );
// };

import React from 'react';

interface HintProps {
  hintsRemaining: number;
  isHintActive: boolean;
  isChecking: boolean;
  onHint: () => void;
}

export const Hint: React.FC<HintProps> = ({
  hintsRemaining,
  isHintActive,
  isChecking,
  onHint,
}) => {
  return (
    <button
      onClick={onHint}
      disabled={hintsRemaining === 0 || isHintActive || isChecking}
      className={`px-4 py-2 rounded-lg shadow font-bold text-white transition-colors
        ${
          hintsRemaining === 0
            ? 'bg-gray-400 cursor-not-allowed'
            : isHintActive
            ? 'bg-yellow-500'
            : 'bg-blue-500 hover:bg-blue-600'
        }`}
    >
      Hint ({hintsRemaining})
    </button>
  );
};
