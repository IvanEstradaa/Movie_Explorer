import React from "react";

interface LazyImageProps {
    src: string;
    alt: string;
    clasName: string;
}

const LazyImage: React.FC<LazyImageProps> = ({ src, alt, clasName }) => {
    return <img src={src} alt={alt} loading="lazy" className={clasName} />;
};

export default LazyImage;