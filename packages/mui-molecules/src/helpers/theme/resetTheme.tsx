import * as React from 'react';
import { createTheme, ThemeOptions, ThemeProvider } from '@mui/material/styles';

import { Button as MuiButton, ButtonProps } from '@mui/material';
import GlassPaper from "../../molecules/GlassPaper/GlassPaper";

declare module '@mui/material/Button' {
    interface ButtonPropsVariantOverrides {
        dashed: true;
    }
}

declare module '@mui/material/styles' {

    interface PaletteOptions {
        light: PaletteOptions['primary'];
    }

    interface PaletteOptions {
        dark: PaletteOptions['primary'];
    }

}

const resetTheme = createTheme({
    typography:{
        fontFamily : [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    },
    palette: {
        primary: {
            main: '#0d6efd',
            light: '#3d8bfd',
            dark: '#0256d3',
        },
        secondary: {
            main: '#6c757d',
            light: '#889198',
            dark: '#565e64',
        },
        error: {
            main: '#dc3545',
            light: '#e35d6a',
            dark: '#ba202f',
        },
        warning: {
            main: '#ffc107',
            light: '#ffcd39',
            dark: '#d29d00',
        },
        info: {
            main: '#0dcaf0',
            light: '#3cd6f4',
            dark: '#0aa2c0',
        },
        success: {
            main: '#198754',
            light: '#24c279',
            dark: '#146c43',
        },
        light: {
            main: '#f8f9fa',
            light: '#f9fafb',
            dark: '#bec7d0',
        },
        dark: {
            main: '#212529',
            light: '#485159',
            dark: '#1a1e21',
        },
    },
    components: {
        MuiButton: {
            variants: [
                {
                    props: { variant: 'dashed' },
                    style: {
                        boxShadow: 'none',
                        textTransform: 'none',
                        fontSize: 16,
                        padding: '6px 12px',
                        border: '1px solid',
                        lineHeight: 1.5,
                        backgroundColor: '#0063cc',
                        borderColor: '#0063cc',
                        fontFamily: [
                            '-apple-system',
                            'BlinkMacSystemFont',
                            '"Segoe UI"',
                            'Roboto',
                            '"Helvetica Neue"',
                            'Arial',
                            'sans-serif',
                            '"Apple Color Emoji"',
                            '"Segoe UI Emoji"',
                            '"Segoe UI Symbol"',
                        ].join(','),
                        '&:hover': {
                            backgroundColor: '#0069d9',
                            borderColor: '#0062cc',
                            boxShadow: 'none',
                        },
                        '&:active': {
                            boxShadow: 'none',
                            backgroundColor: '#0062cc',
                            borderColor: '#005cbf',
                        },
                        '&:focus': {
                            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
                        }
                    },
                },
            ],
        },
    },
});

export default resetTheme;
