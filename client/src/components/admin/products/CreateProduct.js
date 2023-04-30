import { Alert, Grid } from "@mui/material";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import useSuccess from "../../../customHooks/useSuccess";
import { errorFormat } from "../../../helpers/errorFormat";
import { useCreateProductMutation } from "../../../store/admin/productSlice";
import CustomButton from "../CustomButton";
import FileUpload from "../FileUpload";
import Input from "../Input";
import SelectInput from "../SelectInput";
import SelectIsAvailable from "./SelectIsAvailable";

export default function CreateProduct({ categories }) {
    let { control, formState: { errors }, handleSubmit } = useForm();
    let productImageRef = useRef();
    let [createProduct, { isSuccess, error }] = useCreateProductMutation()

    let submitHandler = (values) => {
        createProduct({ 
            ...values,
            image: productImageRef.current.getImage()
        })
    }

    let { message, validationErrors} = error ? errorFormat(error.data) : {}

    let showSuccessMessage = useSuccess(isSuccess, "/admin/products?page=1")

    return (
            <form onSubmit={handleSubmit(submitHandler)}>
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
                <SelectInput
                    defaultValue={categories[0]._id}
                    name="categoryId"
                    control={control}
                    rules={{ required: true }}
                    error={errors.categoryId}
                    items={categories}
                />
                { 
                    validationErrors?.categoryId ? <Alert severity="error" sx={{ marginBottom: 2}}>{validationErrors.categoryId}</Alert> : null
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
                <FileUpload ref={productImageRef} />
                { 
                    validationErrors?.image  && <Alert severity="error" sx={{ marginBottom: 2}}>{validationErrors.image}</Alert>
                }
                {
                    showSuccessMessage && <Alert severity="success" sx={{ marginBottom: 2 , marginTop: 2 }}>product is created successfully</Alert>
                }

                {
                    message ? <Alert severity="error" sx={{ marginBottom: 2}}>{message}</Alert> : null
                }
                <CustomButton text="create product" />
            </form>
    )
}