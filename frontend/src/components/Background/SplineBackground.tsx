import React from 'react';

const SplineBackground: React.FC = () => {
  return (
    <>
      {/* Spline Animation Background */}
      <iframe 
        src='https://my.spline.design/particles-GHWJyRm9agtDIGczNa7aP1b1/' 
        frameBorder='0' 
        width='100%' 
        height='100%'
        className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
        title="Particle Animation Background"
        style={{
          border: 'none',
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -10,
          pointerEvents: 'none'
        }}
      />
      
      {/* Very light overlay for minimal text readability - much more transparent */}
      <div className="fixed top-0 left-0 w-full h-full bg-black/5 -z-5 pointer-events-none"></div>
    </>
  );
};

export default SplineBackground;