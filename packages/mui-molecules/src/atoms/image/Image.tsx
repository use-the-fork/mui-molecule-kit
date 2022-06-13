import React, {useEffect, useState, useRef} from "react";
import useInView from "../../hooks/useInView";
import * as T from "./types/types";
import Box from "@mui/material/Box";
import {keyframes} from '@emotion/react';
import BEMHelper from 'react-bem-helper';

const bem = new BEMHelper({
    name: 'image',
    prefix: 'a-'
});

export const Image: React.FC<T.ImageProps> = (p) => {
    // What element should be visible to initiate the image load
    const ref = useRef<HTMLDivElement | null>(null)
    // Is the element in the viewport
    const entry = useInView(ref, {threshold: 0, rootMargin: "50%"})
    const isInView = !!entry?.isIntersecting
    const {sizes = "", className = ""} = p

    // Load high res images when they enter the viewport
    // Display low res image until the high resolution image has been loaded
    const [isLazyLoaded, setIsLazyLoaded] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)

    // The blurImageSrc is set on the blur <img> displaying a low resolution preload image.
    const [blurImageSrc, setBlurImageSrc] = useState("")

    // The fullImageSrcSet is a string of renditions that are set on srcSet of <img>.
    const [fullImageSrcSet, setFullImageSrcSet] = useState("")

    // The fallback image is set on the src attribute of the full image <img>.
    const [fallbackImageSrc, setFallbackImageSrc] = useState("")

    useEffect(() => {
        // Extract renditions into a srcSet string,
        // eg. the rendition "1200":"/some/url.jpg" will be "/some/url.jpg 1200w".
        const srcSet = Object.entries(p.image?.renditions || {})
            .map((rendition) => {
                const width = parseInt(rendition[0])
                const url = rendition[1]
                if (!Number.isInteger(width)) return null
                return `${url} ${width}w`
            })
            .join(",")

        // Create full image srcSet to be able to check if it's in cache.
        const fullImage = new window.Image()
        fullImage.sizes = sizes
        fullImage.srcset = srcSet
        const isFullImageCached = fullImage.complete

        // If full image is cached then blur-up image will not be shown.
        if (isFullImageCached) {
            setIsLazyLoaded(true)
            setIsLoaded(true)
        } else {
            const blurSrc =
                (p.image?.renditions && p.image?.renditions["blur-up"]) || ""
            // Set blur image src will set src attribute on the blur <img>.
            setBlurImageSrc(blurSrc)
        }

        // Sets the full image srcSet attribute on the actual <img> tag.
        setFullImageSrcSet(srcSet)

        // Sets the fallback image src attrbute on the actual <img> tag.
        if (!srcSet) setFallbackImageSrc(p.image.url)
    }, [p.image, p.image.url, p.image.renditions, sizes, isLazyLoaded])

    // When the user scrolls to the image, set lazyLoad to true
    // This will load the high resolution image
    useEffect(() => {
        isInView && setIsLazyLoaded(true)
    }, [isInView])


    const unblurAnimation = keyframes`
  0% { opacity: 1}
  100% { opacity: 0; z-index: -1; }`;


    const Img =
        fullImageSrcSet || fallbackImageSrc ? (
            <Box
                {...bem()}
                component="div"
                sx={{
                    position: 'relative',
                    overflow: 'hidden',
                    '> img': {
                        display: 'flex',
                        maxWidth: '100%;',
                        objectFit: 'cover',
                        width: '100%'
                    },
                }}
            >
                <Box
                    {...bem('fullImage')}
                    component="img"
                    sx={{
                        zIndex: 1
                    }}
                    onLoad={() => setIsLoaded(true)}
                    srcSet={isLazyLoaded && isLoaded ? fullImageSrcSet : ""}
                    sizes={sizes}
                    src={fallbackImageSrc ? fallbackImageSrc : blurImageSrc}
                    alt={p.image.alt || ""}
                />

                {blurImageSrc && (
                    <Box
                        {...bem('blurImage')}
                        component="img"
                        src={blurImageSrc}
                        sx={{
                            position: 'absolute',
                            zIndex: 10,
                            top: 0,
                            left: 0,
                            overflow: 'hidden',
                            filter: 'blur(7px)',
                            transform: 'scale(1.11)',
                            opacity: 1,
                            animationFillMode: 'forwards',
                            animation: (!isLazyLoaded && `${unblurAnimation} 1s infinite ease`)
                        }}
                        alt=""
                        role="presentation"
                    />
                )}
            </Box>
        ) : null

    const hasLabel =
        p.imageLabel && p.imageLabel.visible !== false

    const Label = (
        <div>
            {p.imageLabel?.title && <p {...bem('title')}>{p.imageLabel.title}</p>}
            {p.imageLabel?.text && <span {...bem('text')}>{p.imageLabel.text}</span>}
        </div>
    )

    return (
        <Box
            ref={ref}
            {...bem('wrapper')}
            sx={{
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {hasLabel && (
                <Box
                    {...bem('label','', p.imageLabel?.position)}
                    sx={{
                        position: 'absolute',
                        top: '1rem',
                        left: '1rem',
                        padding: '0.5rem 1rem',
                        fontSize: '16px',
                        lineHeight: '24px',
                        borderRadius: 'var(--border-radius)',
                        backgroundColor: 'rgba(26, 26, 26, 0.8)',
                        backdropFilter: 'blur(10px)',
                        color: '#fff',
                        zIndex: 1,
                        'p': {
                            fontWeight: 'var(--font-weight-semi-bold)',
                            margin: 0
                        },
                        'span': {
                            fontWeight: 'var(--font-weight-regular)',
                        },
                        '&.bottomRight': {
                            textAlign: 'right',
                            top: 'unset',
                            left: 'unset',
                            bottom: '1rem',
                            right: '1rem',
                        },
                        '&.bottomLeft': {
                            top: 'unset',
                            left: 'unset',
                            bottom: '1rem',
                            right: '1rem',
                        },
                        '&.topLeft': {
                            top: 'unset',
                            left: 'unset',
                            bottom: '1rem',
                            right: '1rem',
                        },
                        '&.topRight': {
                            left: 'unset',
                            right: '1rem',
                            textAlign: 'right'
                        },
                        'a': {
                            textDecoration: 'none',
                            color: '#fff',
                            textAlign: 'right'
                        }
                    }}
                >
                    {p.imageLabel?.url ? <a {...bem('link')} href={p.imageLabel.url}>{Label}</a> : Label}
                </Box>
            )}
            {p.link ? <a {...bem('link')} href={p.link}>{Img}</a> : Img}
        </Box>
    )
}

export default Image
