import { useEffect, useState } from "react";

function ReadingProgress() {

    const [progress, setProgress] = useState(0);

    useEffect(() => {

        function handleScroll() {

            const total =
                document.documentElement.scrollHeight -
                window.innerHeight;

            const current = window.scrollY;

            setProgress((current / total) * 100);

        }

        window.addEventListener('scroll', handleScroll);

        return () =>
            window.removeEventListener('scroll', handleScroll);
    }, []);

    return (

        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: `${progress}%`,
                height: '4px',
                background: '#D97706',
                zIndex: 9999
            }}
        />

    );
}

export default ReadingProgress;