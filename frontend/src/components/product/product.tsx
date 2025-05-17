import { useEffect, useState } from "react"
import { Product } from "../interfaces/Interface"
import { Column, Grid, Tag } from "@carbon/react"

const Products = ()=>{
    const url = "http://localhost:4000/api/product"
    const [products,setProducts] = useState<Product[]>([])
    const fetchData = async ()=>{
        const response = await fetch(url,{
            "method":"GET",
            "headers":{
                "Content-type":"Application/json"
            }
        })
        const data =await  response.json();
        setProducts(data)
    }
    useEffect(()=>{
        fetchData()
    })
    return(
        <>
        <h2>Products Page</h2>
        <hr />
        <Grid>
            <Column lg={10} sm={4} md={8}>
            {products.map((product)=>(
                <Column lg={4} sm={4} md={4} key={product.id} className="item">
                    <h3>{product.name}</h3>
                    <div>
                    <u><p>{product.category}</p></u>
                        <p>{product.description}</p>
                        <Tag>${product.price}</Tag>
                    </div>
                </Column>
            ))}
            </Column>

        </Grid>
        </>

    )
}
export default Products