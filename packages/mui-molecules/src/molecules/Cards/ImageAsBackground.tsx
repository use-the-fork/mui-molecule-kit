import React, {ReactNode} from "react";

import resetTheme from '../../helpers/theme/resetTheme';

import {ThemeProvider, styled} from '@mui/material/styles';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Image from '../../atoms/image/Image';
import {Image as ImageProps} from '../../atoms/image/types/types';


export interface TypeImageAsBackground<P = {}> {
    title: string;
    text?: string;
    eyebrow?: string;
    size: string;
    image: ImageProps;
    button?: React.ReactNode;
}

const ImageAsBackground: React.FC<TypeImageAsBackground> = ({ title ,text, eyebrow, image, button}) => {

    const ImageCard = styled(Card)(({ theme }) => ({
        borderRadius: '1rem',
        boxShadow: 'none',
        position: 'relative',
        minHeight: 360,
        '&:after': {
            content: '""',
            display: 'block',
            position: 'absolute',
            width: '100%',
            height: '64%',
            bottom: 0,
            zIndex: 1,
            background: 'linear-gradient(to top, #000, rgba(0,0,0,0))',
        },
    }));

    const ImageBox = styled(Box)(({ theme }) => ({
        position: 'absolute',
        zIndex: 2,
        bottom: 0,
        width: '100%',
    }));

    const ImageBoxTypography = styled(Typography)(({ theme }) => ({
        color: "#fff"
    }));

    return (
        <>
            <ThemeProvider theme={resetTheme}>
                <ImageCard sx={{
                    display: 'inline-block',
                    mx: '2px',
                    transform: 'scale(0.8)',
                    width: '100%',
                    [resetTheme.breakpoints.up('md')]: {
                        width: '50%'
                    },
                    [resetTheme.breakpoints.up('lg')]: {
                        width: '25%'
                    },
                }}>
                    <Box
                        sx={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            top: 0,
                            left: 0,
                            zIndex: 0,
                            backgroundColor:'rgba(0, 0, 0, 0.08)',
                            backgroundPosition: 'center',
                        }}
                    >
                        <Image image={image} />
                    </Box>
                    <ImageBox py={3} px={2}>
                            <ImageBoxTypography variant="subtitle1" gutterBottom>Galaxy</ImageBoxTypography>
                            <ImageBoxTypography variant="h6" gutterBottom>Perfect for everyone</ImageBoxTypography>
                            <ImageBoxTypography variant="caption" gutterBottom>Buds 2019</ImageBoxTypography>
                    </ImageBox>
                </ImageCard>
                {button}
            </ThemeProvider>
        </>
    );
}

export default ImageAsBackground;
