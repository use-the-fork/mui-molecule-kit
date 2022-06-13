import React, {useEffect, useState, useRef} from "react";
import useInView from "../../hooks/useInView";
import * as T from "./types/types";
import {Button as MuiButton} from '@mui/material';
import BEMHelper from 'react-bem-helper';

const bem = new BEMHelper({
    name: 'image',
    prefix: 'a-'
});

export const Button: React.FC<T.ImageProps> = (p) => {


    return (
        <>
            <MuiButton variant="outlined">Outlined</MuiButton>
        </>
    )

}

export default Button
