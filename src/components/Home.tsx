import { useState } from 'react';
import {message} from 'antd'
import CardGrid from './cardGrid';

const HomePage = () => {
  const [level, setLevel] = useState<string>('easy');
  const [columns, setColumns] = useState<number>(4);
  const [enableTimer, setEnableTimer] = useState<boolean>(false);
  const [showHints, setShowHints] = useState<boolean>(false);
  const [startGame,setStartGame]=useState<boolean>(false)

  const handleStartGame = () => {
    try{
      
      setStartGame(true)
    }catch(err:any){
      message.error(err)
    }
  };

  const getColumnDisplay = (value:any) => {
    return `${value}x${value}`;
  };

  const cancelModal=()=>{
    setStartGame(false)
  }

  const setTimeLimit = (level:string, rows:number) => {
    let baseTime;
  
    switch(level) {
      case 'easy':
        baseTime = 180; 
        break;
      case 'medium':
        baseTime = 120; 
        break;
      case 'hard':
        baseTime = 90;
        break;
      default:
        baseTime = 120; 
    }
  
    const maxRows = 10;
    const gridFactor = rows / maxRows;  
  
    const timeLimit = Math.max(baseTime * gridFactor, baseTime * 0.3);
  
    return Math.round(timeLimit);  
  };
  
   const time= setTimeLimit(level,columns)
  
  return (
    <>
    {!startGame?(
      <div className="h-full bg-gradient-to-b from-blue-50 to-purple-50 p-3 sm:p-6 flex items-center justify-center">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-4 sm:p-8 mt-9">
       
        <div className="text-center space-y-2 sm:space-y-4 mb-4 sm:mb-8 ">
          <div className="mx-auto bg-blue-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313-12.454z"/>
            </svg>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Memory Match
          </h1>
          <p className="text-sm sm:text-base text-gray-500">
            Challenge your memory with this fun matching game
          </p>
        </div>

        <div className="space-y-4 sm:space-y-6">
          
          <div className="space-y-1 sm:space-y-2">
            <label className="text-sm font-medium text-gray-700">Difficulty Level</label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          
          <div className="space-y-1 sm:space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Grid Size: {getColumnDisplay(columns)}
            </label>
            <div className="space-y-1">
              <input
                type="range"
                min="2"
                max="10"
                step="2"
                value={columns}
                onChange={(e) => setColumns(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>2x2</span>
                <span>4x4</span>
                <span>6x6</span>
                <span>8x8</span>
                <span>10x10</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-3 bg-gray-50 p-3 sm:p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
                <span className="text-xs sm:text-sm text-gray-700">Enable Timer</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={enableTimer}
                  onChange={(e) => setEnableTimer(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 sm:w-11 h-5 sm:h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 sm:after:h-5 after:w-4 sm:after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                </svg>
                <span className="text-xs sm:text-sm text-gray-700">Show Hints</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={showHints}
                  onChange={(e) => setShowHints(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 sm:w-11 h-5 sm:h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 sm:after:h-5 after:w-4 sm:after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>

          
          <button 
            onClick={handleStartGame}
            className="w-full py-2 sm:py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg text-sm sm:text-base"
          >
            Start Game
          </button>
        </div>
      </div>
    </div>
    ):(
      <CardGrid gridSize={columns} timer={enableTimer?true:false} timeLimit={time} cancelModal={cancelModal} showHint={showHints} />
    )}
    </>
  );
};

export default HomePage;