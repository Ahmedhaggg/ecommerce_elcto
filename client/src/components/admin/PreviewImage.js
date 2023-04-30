import { Box } from "@mui/material";
import { BUFFER_IMAGE, SRC_IMAGE } from "../../constants";
import { env } from "../../next.config";

export default function PreviewImage({ src, format }) {
    let imageSrc = format == BUFFER_IMAGE ? URL.createObjectURL(src) : `${env.IMAGE_URL}/${src}?w=164&h=164&fit=crop&auto=format`
    return (
        <Box border="4px solid" borderColor="whitesmoke" padding={2} width="250px">
            <img
                src={imageSrc}
                alt="image"
                loading="lazy"
                width="200px"
                height="200px"
            />
        </Box>
    )
}