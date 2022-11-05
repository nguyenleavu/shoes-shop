import { useCallback } from 'react';
import type { Container, Engine } from 'tsparticles-engine';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

interface Props {
    img?: string;
}

const Canvas = ({ img }: Props) => {
    const particlesInit = useCallback(async (engine: Engine) => {
        await loadFull(engine);
    }, []);

    return (
        <Particles
            id='tsparticles'
            init={particlesInit}
            options={{
                background: {
                    color: {
                        value: 'transparent',
                    },
                },
                fpsLimit: 10000,
                interactivity: {
                    events: {
                        onClick: {
                            enable: true,
                            mode: 'push',
                        },
                        onHover: {
                            enable: true,
                            mode: 'attract',
                        },
                        resize: true,
                    },
                    modes: {
                        push: {
                            quantity: 4,
                        },
                        attract: {
                            radius: 500,
                            duration: 0.1,
                            inRange: true,
                        },
                    },
                },
                particles: {
                    color: {
                        value: '#00eff3',
                    },
                    collisions: {
                        enable: true,
                    },
                    move: {
                        direction: 'none',
                        enable: true,
                        outModes: {
                            default: 'out',
                        },
                        random: true,
                        speed: 3,
                        straight: true,
                    },
                    number: {
                        density: {
                            enable: true,
                            area: 700,
                        },
                        value: 30,
                    },
                    opacity: {
                        value: 0.5,
                    },
                    shape: {
                        type: 'image',
                        image: {
                            src: img || 'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/779ed417939427.56afa0d923f67.png',
                            width: 4,
                            height: 2,
                            replaceColor: true,
                        },
                    },
                    size: {
                        value: { min: 20, max: 80 },
                    },
                },
                detectRetina: true,
            }}
        />
    );
};

export default Canvas;
