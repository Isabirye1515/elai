import { useState, ChangeEvent, FormEvent } from "react";
import { TextInput, NumberInput, Checkbox, Button, Grid, Column, Form } from "@carbon/react";
import { Product } from "../interfaces/Interface";

const AddProduct = () => {
  const [productForm, setProductForm] = useState<Product>({
    id: undefined,
    name: '',
    description: '',
    price: 0,
    category: '',
    image: '',
    stock: 0,
    rating: 0,
    reviews: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
    discount: 0,
    manufacturer: '',
    warranty: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;
    setProductForm((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : 
            ["price", "stock", "rating", "reviews", "discount"].includes(id)
              ? parseFloat(value)
              : value
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const now = new Date().toISOString().slice(0, 19).replace("T", " ");
    const data = {
      ...productForm,
      createdAt: now,
      updatedAt: now,
      isActive: productForm.isActive ? 1 : 0,
    };

    try {
      const res = await fetch("http://localhost:4000/api/product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to add product");
      const json = await res.json();
      console.log("Success:", json);
    } catch (err) {
      console.error("Error:", err);
    }
    setProductForm({
        id: undefined,
    name: '',
    description: '',
    price: 0,
    category: '',
    image: '',
    stock: 0,
    rating: 0,
    reviews: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
    discount: 0,
    manufacturer: '',
    warranty: ''
    })
  };

  return (
    <>
    <h2>Add A Product</h2>
    <hr />
    <Grid>
      <Column sm={4} md={8} lg={12}>
        <Form onSubmit={handleSubmit}>
          <TextInput id="name" labelText="Name" value={productForm.name} onChange={handleChange} required />
          <TextInput id="description" labelText="Description" value={productForm.description} onChange={handleChange} />
          <NumberInput id="price" label="Price" value={productForm.price} onChange={(e) => handleChange(e as any)} />
          <TextInput id="category" labelText="Category" value={productForm.category} onChange={handleChange} />
          <TextInput id="image" labelText="Image URL" value={productForm.image} onChange={handleChange} />
          <NumberInput id="stock" label="Stock" value={productForm.stock} onChange={(e) => handleChange(e as any)} />
          <NumberInput id="rating" label="Rating" value={productForm.rating} step={0.1} onChange={(e) => handleChange(e as any)} />
          <NumberInput id="reviews" label="Reviews" value={productForm.reviews} onChange={(e) => handleChange(e as any)} />
          <NumberInput id="discount" label="Discount (%)" value={productForm.discount} onChange={(e) => handleChange(e as any)} />
          <TextInput id="manufacturer" labelText="Manufacturer" value={productForm.manufacturer} onChange={handleChange} />
          <TextInput id="warranty" labelText="Warranty" value={productForm.warranty} onChange={handleChange} />
          <Checkbox id="isActive" labelText="Active" checked={productForm.isActive} onChange={(evt, data) => {
            setProductForm((prev) => ({ ...prev, isActive: data.checked }));
          }} />
          <Button type="submit" kind="primary">Add Product</Button>
        </Form>
      </Column>
    </Grid>
    </>
  );
};

export default AddProduct;
