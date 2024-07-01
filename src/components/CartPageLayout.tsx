import React, { useEffect, useState, FC } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { removeProduct, getProduct, getTotalCost } from '../utils/storeForage';
import { Product } from '../Types/Types'
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

const CartPageLayout: FC = () => {
    const [cart, setCart] = useState<Product[]>([]);

    useEffect(() => {
        async function fetchCart() {
            const cartItems = await getProduct();
            setCart(cartItems);
        }
        fetchCart();
    }, []);

    const handleRemove = async (productId: number) => {
        await removeProduct(productId);
        const updatedCart = await getProduct();
        setCart(updatedCart);
    }

    const handleRemoveAll = async() =>{
        const products = await getProduct()
        for(const product of products) {
            await removeProduct(product.id)
        } setCart([])
    }

    return (
        <Box sx={{ padding: '32px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px', marginBottom: '32px' }}>
            {cart.map((item) => (
              <Card key={item.id} sx={{ minWidth: 300, mr: 2 }}>
                <CardMedia
                  component="img"
                  image={item.image}
                  alt={item.title}
                  sx={{ height: 200, objectFit: 'contain' }}
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
                  <Button size="small" onClick={() => handleRemove(item.id)}>Remove From Cart</Button>
                </CardActions>
              </Card>
            ))}
          </div>
          <Divider />
          {/* Footer Layout */}
          <Box sx={{ marginTop: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">Total Cost: ${getTotalCost(cart).toFixed(2)}</Typography>
        <Button variant="contained" color="secondary" onClick={handleRemoveAll}>Remove All Items</Button>
      </Box>
        </Box>
      );
};

export default CartPageLayout;
