import { Alert, Grid } from "@mui/material";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import useSuccess from "../../../../customHooks/useSuccess";
import { errorFormat } from "../../../../helpers/errorFormat";
import { useUpdateProductMutation } from "../../../../store/admin/productSlice";
import CustomButton from "../../CustomButton";
import Input from "../../Input";
import SelectIsAvailable from "../SelectIsAvailable";


export default function Product({ product }) {
    let router = useRouter();
    let { control, formState: { errors }, handleSubmit } = useForm({
        defaultValues: product        
    });
    
    let [updateProductInfo, { isSuccess, error }] = useUpdateProductMutation()
    
    let saveNewProductData = (newData) => updateProductInfo({ slug: router.query.slug, newData })
    
    let { message, validationErrors} = error ? errorFormat(error.data) : {}

    let showSuccessMessage = useSuccess(isSuccess)

    return (
        <form onSubmit={handleSubmit(saveNewProductData)}>
            <Input
                control={control}
                type="text"
                name="title"
                error={errors.title}
                rules={{ required: true }}
            />
            { 
                validationErrors?.title ? <Alert severity="error" sx={{ marginBottom: 2}}>{validationErrors.title}</Alert> : null
            }
            <Input
                control={control}
                type="text"
                name="price"
                error={errors.price}
                rules={{ required: true }}
            />
            { 
                validationErrors?.price ? <Alert severity="error" sx={{ marginBottom: 2}}>{validationErrors.price}</Alert> : null
            }
            <Input
                control={control}
                type="text"
                name="description"
                error={errors.description}
                rules={{ required: true }}
                rows={2}
                multiline
            />
            { 
                validationErrors?.description ? <Alert severity="error" sx={{ marginBottom: 2}}>{validationErrors.description}</Alert> : null
            }
            <SelectIsAvailable control={control} error={errors.isAvailable} />
            { 
                validationErrors?.isAvailable ? <Alert severity="error" sx={{ marginBottom: 2}}>{validationErrors.isAvailable}</Alert> : null
            }
            
            {
                showSuccessMessage && <Alert severity="success" sx={{ marginBottom: 2}}>product is updated successfully</Alert>
            }

            {
                message ? <Alert severity="error" sx={{ marginBottom: 2}}>{message}</Alert> : null
            }
            <CustomButton text="save" />
        </form>
    )
}