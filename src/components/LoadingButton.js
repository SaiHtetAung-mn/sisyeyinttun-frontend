import { Button, CircularProgress, Typography } from "@mui/material";
import React from "react";

/**
 * @param {Object} props 
 * @param {Boolean} props.isLoading
 * @param {String} props.loadingLabel
 * @param {Boolean} props.fullWidth
 * @param {Event} props.onClick
 * @param {disabled} props.disabled
 * @returns 
 */
export default function LoadingButton(props) {
    const { isLoading=false, loadingLabel="Loading", fullWidth=false, disabled=false, children, onClick } = props;

    return (
        <Button variant="contained" sx={{ bgcolor: "primary", borderRadius: '30px' }} fullWidth={fullWidth} disabled={isLoading || disabled} onClick={onClick}>
            { isLoading && <CircularProgress size={20} color="secondary"/> }
            <Typography variant="button" sx={{ fontWeight: 600, ml: isLoading ? 2 : 0 }}>{isLoading ? loadingLabel : children}</Typography>
        </Button>
    )
}