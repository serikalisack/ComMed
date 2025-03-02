import React, { useEffect } from 'react';
import Particles from 'react-particles-js';

const ParticlesBackground = () => {
  useEffect(() => {
    const particlesConfig = {
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            value_area: 800,
          },
        },
        color: {
          value: "#FFD700",
        },
        shape: {
          type: "circle",
        },
        size: {
          value: 3,
        },
      },
    };
    return <Particles params={particlesConfig} />;
  }, []);

  return <Particles params={{ particles: { number: { value: 80 } } }} />;
};

export default ParticlesBackground;