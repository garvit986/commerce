import { useEffect, useState, FC } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { saveProduct, removeProduct, getProduct } from "../utils/storeForage";
import { Product } from "../Types/Types";

const CartLayout: FC = () => {
  const [data, setData] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchStore() {
      try {
        const response = await axios.get<Product[]>(
          "https://fakestoreapi.com/products"
        );
        const data = response.data;
        setData(data);
        const storedCart = await getProduct();
        setCart(storedCart);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchStore();
  }, []);

  const handleAdd = async (data: Product) => {
    await saveProduct(data);
    const updatedCart = await getProduct();
    setCart(updatedCart);
  };

  const removeAdd = async (id: number) => {
    await removeProduct(id);
    const updatedCart = await getProduct();
    setCart(updatedCart);
  };
  const isProductInCart = (productId: number) => {
    return cart.some((product) => product.id === productId);
  };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "32px",
        padding: "100px",
      }}
    >
      {data.map((item) => (
        <Card key={item.id} sx={{ minWidth: 300, mr: 2, ml: 2 }}>
          <CardMedia
            component="img"
            image={item.image}
            alt={item.title}
            sx={{ height: 200, objectFit: "contain" }}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {item.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item.description}
            </Typography>
            <Typography gutterBottom variant="h5" component="div">
              ${item.price}
            </Typography>
          </CardContent>
          <CardActions>
            {/* Functionality to handle add and remove triggers */}
            {isProductInCart(item.id) ? (
              <Button size="small" onClick={() => removeAdd(item.id)}>
                Remove From Cart
              </Button>
            ) : (
              <Button size="small" onClick={() => handleAdd(item)}>
                Add To Cart
              </Button>
            )}
          </CardActions>
        </Card>
      ))}
    </div>
  );
};

export default CartLayout;
