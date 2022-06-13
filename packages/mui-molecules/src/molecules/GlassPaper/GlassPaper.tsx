import React from "react";

import {ThemeProvider, styled} from '@mui/material/styles';
import resetTheme from '../../helpers/theme/resetTheme';
import Box from '@mui/material/Box';
import rgba from "../../helpers/functions/rgba"


export interface TypeGlassPaper {
    backgroundColor: string
    borderRadius: number
    opacity: number
}

const GlassPaper: React.FC<TypeGlassPaper> = ({ backgroundColor = '#212529' ,borderRadius = 16, opacity = 0.8 }) => {

    const Widget = styled('div')(({ theme }) => ({
        padding: 16,
        borderRadius: borderRadius,
        width: "100%",
        maxWidth: '100%',
        margin: 'auto',
        position: 'relative',
        backgroundColor: rgba(backgroundColor, opacity),
        backdropFilter: 'blur(40px)',
    }));

    return (
        <>
            <ThemeProvider theme={resetTheme}>
                <Widget>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            XYZ
                    </Box>
                </Widget>
            </ThemeProvider>
        </>
    );
}

export default GlassPaper;
