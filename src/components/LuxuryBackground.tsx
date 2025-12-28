import React from 'react';

function Container20() {
  return <div className="absolute h-[843.771px] left-[-16.89px] opacity-[0.666] top-[-9.09px] w-[1568.172px]" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 1568.2 843.77\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(0 -83.529 -155.24 0 470.45 253.13)\\'><stop stop-color=\\'rgba(8,12,22,1)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(3,5,8,1)\\' offset=\\'1\\'/></radialGradient></defs></svg>')" }} />;
}

function Container222() {
  return <div className="absolute h-[825.6px] left-0 top-0 w-[1534.4px]" style={{ backgroundImage: "linear-gradient(90deg, rgba(255, 255, 255, 0.02) 0%, rgba(0, 0, 0, 0) 0%), linear-gradient(rgba(255, 255, 255, 0.02) 0.12112%, rgba(0, 0, 0, 0) 0.12112%)" }} />;
}

function Container223() {
  return <div className="absolute h-[825.6px] left-0 top-0 w-[1534.4px]" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 1534.4 825.6\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(0 -71.021 -131.99 0 1074.1 412.8)\\'><stop stop-color=\\'rgba(0,0,0,0)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(3,5,8,0.5)\\' offset=\\'0.5\\'/><stop stop-color=\\'rgba(3,5,8,1)\\' offset=\\'1\\'/></radialGradient></defs></svg>')" }} />;
}

export function LuxuryBackground() {
  return (
    <div className="absolute inset-0 bg-[#030508] overflow-hidden">
      <Container20 />
      <Container222 />
      <Container223 />
      <div className="absolute inset-0 bg-white opacity-[0.02]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40" />
    </div>
  );
}
