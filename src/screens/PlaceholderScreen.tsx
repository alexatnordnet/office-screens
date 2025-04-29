import React from "react";

const PlaceholderScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 flex flex-col items-center justify-center">
      <div className="text-6xl font-bold text-white mb-8">Placeholder Screen</div>
      <div className="text-2xl text-gray-200">This is a placeholder for a new screen type</div>
      <div className="mt-12 grid grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <div 
            key={i} 
            className="bg-white/20 rounded-lg p-8 backdrop-blur-sm transition-all hover:scale-105"
          >
            <div className="text-white text-xl font-bold mb-2">Content Block {i}</div>
            <div className="text-gray-200">
              This is placeholder content that will be replaced with actual data
              in the future implementation.
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlaceholderScreen;
