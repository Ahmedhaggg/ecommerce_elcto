import {  Alert, Grid } from "@mui/material"
import ProductItem from "../components/user/Home/ProductItem";
import 'react-alice-carousel/lib/alice-carousel.css';
import { Box } from "@mui/system";
import SectionHeader from "../components/SectionHeader";
import { capitalizeFirstLetter } from "../helpers";
import OurMarkets from "../components/user/Home/OurMarkets";
import { fetchData } from "../helpers/fetch";

export default function Home({ categories }) {
  
  return ( 
    <>
      <Box width="100%">
        <Box>
          {
            categories.map((category, i) => (
              <Box key={i}>
                <SectionHeader text={capitalizeFirstLetter(category.title)} fontSize="30px" color="primary.main" paddingBottom={3}/>
                  <Grid container>
                    {
                      category.products.length ? 
                      category.products.map((product, index) => <Grid item xs={12} md={6} lg={4} marginBottom={4} paddingX={2} key={index}>
                          <ProductItem product={product}/>
                        </Grid>
                      ) : <Alert severity="info" sx={{ width: "100%" }}>category not match products, currently</Alert>
                    }
                  </Grid>
              </Box>
            ))
          }
        </Box>
        <Box>
        <SectionHeader text={capitalizeFirstLetter("our brands")} fontSize="30px" color="primary.main" paddingBottom={3}/>
          <OurMarkets />
        </Box>
      </Box>
    </>
  )
}

 
export const getStaticProps = async (_context) => {
    let selectedCategoriesSlugs = ["laptops", "phones", "playstations"];
    let [laptops, phones, playstations] = await Promise.all(
        selectedCategoriesSlugs.map(categorySlug => 
          fetchData("v1/categories/" + categorySlug)
        ));

    if (laptops.isError || phones.isError || playstations.isError)
          return {
            notFound: true, revalidate: 1
          }
 
    let categories = [
      {
        title: "laptops",
        products: laptops.data.category.products
      },
      {
        title: "phones",
        products: phones.data.category.products
      },
      {
        title: "playstations",
        products: playstations.data.category.products
      }
    ]
    
    return {
      props: {
        categories
      },
      revalidate: 60 * 60 
    }
}

// const responsive = {
//   0: { items: 1 },
//   568: { items: 2 },
//   1024: { items: 3 },
// };
// <AliceCarousel
//     key="carousel"
//     mouseTracking
//     items={category.products.map((product) => <ProductItem product={product} />)}
//     responsive={responsive}
// />