import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { loadGLTFModel } from '../lib/model';
import Loader from './Loader';

const Shoe: React.FC = () => {
    const refBody = useRef<HTMLDivElement>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [renderer, setRenderer] = useState<any>();
    const [_camera, setCamera] = useState<any>();
    const [target] = useState(new THREE.Vector3(-0.5, 1.2, 0));
    const [initialCameraPosition] = useState(
        new THREE.Vector3(
            20 * Math.sin(0.2 * Math.PI),
            10,
            20 * Math.cos(0.2 * Math.PI)
        )
    );
    const [scene] = useState(new THREE.Scene());
    const [_controls, setControls] = useState<any>();

    const handleWindowResize = useCallback(() => {
        const { current: container } = refBody;
        if (container && renderer) {
            const scW = container.clientWidth;
            const scH = container.clientHeight;

            renderer.setSize(scW, scH);
        }
    }, [renderer]);

    const easeOutCirc = (x: number) => {
        return Math.sqrt(1 - Math.pow(x - 0.5, 4));
    };

    useEffect(() => {
        const { current: container } = refBody;

        if (container && !renderer) {
            const scW = container.clientWidth;
            const scH = container.clientHeight;

            const renderer = new THREE.WebGLRenderer({
                antialias: true,
                alpha: true,
            });
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(scW, scH);
            renderer.outputEncoding = THREE.sRGBEncoding;
            container.appendChild(renderer.domElement);
            setRenderer(renderer);

            const scale = scH * 0.00000000000000000000000008 + 0.3;
            const view = scH * 0.002;
            const camera = new THREE.OrthographicCamera(
                -scale - view,
                scale + view + 0.4,
                scale,
                -scale / 0.12,
                0.01,
                50
            );
            camera.position.copy(initialCameraPosition);
            camera.lookAt(target);
            setCamera(camera);

            const ambientLight = new THREE.AmbientLight(0xdddddd, 0.5);
            scene.add(ambientLight);

            const controls = new OrbitControls(camera, renderer.domElement);
            controls.autoRotate = true;
            controls.target = target;
            setControls(controls);

            loadGLTFModel(scene, '/shoe/scene.gltf', {
                receiveShadow: false,
                castShadow: false,
            }).then(() => {
                animate();
                setLoading(false);
            });

            let req: any = null;
            let frame = 0;
            const animate = () => {
                req = requestAnimationFrame(animate);

                frame = frame <= 100 ? frame + 0.5 : frame;

                if (frame <= 100) {
                    const p = initialCameraPosition;
                    const rotSpeed = -easeOutCirc(frame / 150) * Math.PI * 10;

                    camera.position.y = 5;
                    camera.position.x =
                        p.x * Math.cos(rotSpeed) + p.z * Math.sin(rotSpeed);
                    camera.position.z =
                        p.z * Math.cos(rotSpeed) - p.x * Math.sin(rotSpeed);
                    camera.lookAt(target);
                } else {
                    controls.update();
                }

                renderer.render(scene, camera);
            };

            return () => {
                cancelAnimationFrame(req);
                renderer.dispose();
            };
        }
    }, []);

    useEffect(() => {
        window.addEventListener('resize', handleWindowResize, false);
        return () => {
            window.removeEventListener('resize', handleWindowResize, false);
        };
    }, [renderer, handleWindowResize]);

    return (
        <div
            className='absolute inset-0 h-full w-full mr-44 overflow-hidden'
            ref={refBody}
        >
            {loading && <Loader />}
        </div>
    );
};

export default Shoe;
