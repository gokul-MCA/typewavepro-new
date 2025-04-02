import { Theme } from "@emotion/react";
import { Box, SxProps, Typography } from "@mui/material";
import { Gauge, gaugeClasses } from "@mui/x-charts";
import React from "react";

interface CustomGaugeProps {
  value: number;
  sx?: SxProps<Theme>;
}

const CustomGauge: React.FC<CustomGaugeProps> = ({ value, sx }) => {
  return (
    <>
      <Box position="relative" display="inline-block">
        <CustomGauge value={value} />
        <Gauge
          cornerRadius="50%"
          width={150}
          height={150}
          value={Math.round(value)}
          sx={{
            [`& .${gaugeClasses.valueArc}`]: { fill: "#52b202" },
            [`& .${gaugeClasses.referenceArc}`]: { fill: "gray" },
            ...sx,
          }}
        />
        {/* Overlay the text */}
        <Typography
          variant="h4"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)", // Center the text
            fontWeight: "bold",
          }}
        >
          {Math.round(value)}
        </Typography>
      </Box>
    </>
  );
};

export default CustomGauge;
