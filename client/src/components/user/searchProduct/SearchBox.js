import { Button, Container, InputAdornment, TextField, styled } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useForm } from "react-hook-form";

const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
      color: '#999',
    },
    '& .MuiInputLabel-root': {
      color: '#333',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        border: '3px solid #999',
      },
      '&:hover fieldset': {
        border: '3px solid #999',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#999',
      }
    },
  });

export default function SearchBar({ onSubmit }) {
    let { register, handleSubmit } = useForm();
    return (
        <Container maxWidth="md">
            <form onSubmit={handleSubmit(onSubmit)}>
                <CssTextField
                    {...register("title")}
                    type="search"
                    label="product title"
                    sx={{ width: "100%" }}
                    variant="outlined"
                    required
                    InputProps={{
                        endAdornment: (
                          <InputAdornment position="end" >
                              <SearchIcon />
                          </InputAdornment>
                        ),
                        style: { fontSize: "21px"},
                    }}
                />
            </form>
        </Container>
    );
}