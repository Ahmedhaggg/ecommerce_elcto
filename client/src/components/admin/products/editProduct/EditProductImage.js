import { Alert, Box, Button } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BUFFER_IMAGE, SRC_IMAGE } from "../../../../constants";
import useSuccess from "../../../../customHooks/useSuccess";
import { errorFormat } from "../../../../helpers/errorFormat";
import { useGetProductQuery, useUpdateProductImageMutation } from "../../../../store/admin/productSlice";
import CustomButton from "../../CustomButton";
import PreviewImage from "../../PreviewImage";

export default function ProductImage({ productImage }) {
    let router = useRouter();
    let [currentImage, setCurrentImage] = useState({
        src: productImage,
        format: SRC_IMAGE
    })

    let [updateProductImage, { isSuccess, error }] = useUpdateProductImageMutation()
    
    let saveNewImage = (e) => {
        e.preventDefault()
        updateProductImage({ slug: router.query.slug, newImage: currentImage.src })
    };
    
    let updateCurrentImage = (newImage, newImageFormat) => {
        setCurrentImage(_ => ({
            src: newImage,
            format: newImageFormat
        }));
    }

    useEffect(() => updateCurrentImage(productImage, SRC_IMAGE), [productImage]);

    let { message } = error ? errorFormat(error.data) : {};
    let showSuccessMessage = useSuccess(isSuccess);

    return (
        <>
            <Box marginBottom={3}>
                <PreviewImage src={currentImage.src}  format={currentImage.format} />
            </Box>
            { 
                showSuccessMessage && 
                <Alert severity="success" sx={{ marginBottom: 2, marginTop: 2 }}>success update product image</Alert>
            }
            {
                currentImage.format !== SRC_IMAGE  ? 
                    <Button variant="contained" color="error" onClick={() => updateCurrentImage(productImage, SRC_IMAGE)}>remove new image</Button>
                :   <Button
                        variant="contained"
                        component="label"
                        sx={{ marginBottom: 2 }}
                    >
                        Upload image
                        <input
                            type="file"
                            onChange={(e) => updateCurrentImage(e.target.files[0], BUFFER_IMAGE)}
                            hidden
                        />
                    </Button>
            }
            {   
                currentImage.format !== SRC_IMAGE  ? 
                    <form onSubmit={saveNewImage}>
                        {
                            message &&
                            <Alert severity="error" sx={{ marginBottom: 2, marginTop: 2 }}>{message}</Alert>
                        }
                        <CustomButton text="save new image" />
                    </form>

                :  null 
            }
            
        </>
    )
}