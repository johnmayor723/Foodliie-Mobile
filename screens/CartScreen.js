import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, Button, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios"
// Importing images from the assets folder
const images = {
  a1: require('../assets/a1.jpeg'),
  a2: require('../assets/a2.jpeg'),
  a3: require('../assets/a3.jpeg'),
  a4: require('../assets/a4.jpeg'),
  a5: require('../assets/a5.jpeg'),
  a6: require('../assets/a6.jpeg'),
  a7: require('../assets/a7.jpeg'),
  a8: require('../assets/a8.jpg'),
  a9: require('../assets/a9.jpg'),
  a10: require('../assets/a10.jpg'),
};

const CartScreen = ({ navigation }) => {
const [cart, setCart] = useState([]);
const [total, setTotal] = useState(null);
const [cartTotal, setCartTotal] = useState(0);
const [products, setProducts] = useState([]);
//const [products2, setProducts2] = useState([]);
const [loading, setLoading] = useState(true);


useEffect(() => {
  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://pantry-hub-server.onrender.com/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  fetchProducts();
}, []); // Dependency array is left empty to run the effect once when the component mounts.

if (loading) {
  return (
    <View style={styles.loader}>
      <ActivityIndicator size="large" color="#00ff00" />
    </View>
  );
}

useEffect(() => {
  const unsubscribe = navigation.addListener('focus', () => {
    getDataFromDB();
  });

  // Cleanup function
  return () => {
    unsubscribe();
  };
}, [navigation]);
  // Suggested products with images
const [suggestedProducts] = useState([
    { id: 3, name: 'Oranges', price: 3.99, image: images.a3 },
    { id: 4, name: 'Grapes', price: 4.99, image: images.a4 },
    { id: 5, name: 'Mangoes', price: 5.99, image: images.a5 },
    { id: 6, name: 'Pineapples', price: 3.49, image: images.a6 },
    { id: 7, name: 'Strawberries', price: 4.99, image: images.a7 },
    { id: 8, name: 'Blueberries', price: 6.99, image: images.a8 },
    { id: 9, name: 'Watermelons', price: 7.99, image: images.a9 },
    { id: 10, name: 'Peaches', price: 5.49, image: images.a10 }
  ]);

  


   //get data from local DB by ID
  const getDataFromDB = async () => {
    let items = await AsyncStorage.getItem('cartItem');
    items = JSON.parse(items);
    let productData = [];
    if (items) {
      products.forEach(data => {
        if (items.includes(data.id)) {
          productData.push(data);
          return;
        }
      });
      setCart(productData);
      getTotal(productData);
    } else {
      setCart(false);
      getTotal(false);
    }
  };

       //get total price of all items in the cart
  const getTotal = productData => {
    let total = 0;
    for (let index = 0; index < productData.length; index++) {
      let productPrice = productData[index].productPrice;
      total = total + productPrice;
    }
    setTotal(total);
  };


  /*const fetchCartFromStorage = async () => {
    try {
      const savedCart = await AsyncStorage.getItem('id');
      if (savedCart !== null) {
        setCart(JSON.parse(savedCart));
      }
    } catch (error) {
      console.log('Error fetching cart from storage:', error);
    }
  };*/

  const saveCartToStorage = async (updatedCart) => {
    try {
      await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
    } catch (error) {
      console.log('Error saving cart to storage:', error);
    }
  };

  const removeItemFromCart = (itemId) => {
    const updatedCart = cart.filter((cartItem) => cartItem.id !== itemId);
    setCart(updatedCart);
    saveCartToStorage(updatedCart);
  };

  const updateQuantity = (itemId, quantity) => {
    const updatedCart = cart.map((cartItem) =>
      cartItem.id === itemId ? { ...cartItem, quantity } : cartItem
    );
    setCart(updatedCart);
    saveCartToStorage(updatedCart);
  };

  const calculateTotal = () => {
    const total = cart.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
    setCartTotal(total);
  };

  const handleCheckout = () => {
    navigation.navigate('Payment');
  };

  return (
    <View style={styles.container}>
      {/* Fixed Top Bar */}
      <View style={styles.heroSection}>
        <Text style={styles.heroText}>Your Cart</Text>
      </View>

      {/* Cart Items Section */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.cartItemsSection}>
          {cart.length > 0 ? (
            cart.map(item => (
              <View key={item.id} style={styles.cartItem}>
                <Image source={{uri:item.imageUrl}} style={styles.productImage} />
                <Text style={styles.itemText}>{item.name} x{item.quantity}</Text>
                <Text style={styles.itemPrice}>${(item.unitPrice * item.quantity).toFixed(2)}</Text>
                <View style={styles.actions}>
                  <Button title="+" onPress={() => updateQuantity(item.id, item.quantity + 1)} />
                  <Button title="-" onPress={() => item.quantity > 1 ? updateQuantity(item.id, item.quantity - 1) : removeItemFromCart(item.id)} />
                  <Button title="Remove" onPress={() => removeItemFromCart(item.id)} />
                </View>
              </View>
            ))
          ) : (
            <Text>No items in your cart</Text>
          )}
        </View>

        {/* Products You May Like */}
        <View style={styles.suggestedProductsSection}>
          <Text style={styles.sectionTitle}>Products You May Like</Text>
          <View style={styles.suggestedProductsGrid}>
            {suggestedProducts.map(product => (
              <TouchableOpacity key={product.id} style={styles.suggestedProduct}>
                <Image source={product.image} style={styles.suggestedProductImage} />
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Fixed Bottom Tab */}
      <View style={styles.bottomTab}>
        <Text style={styles.totalText}>Total: ${cartTotal.toFixed(2)}</Text>
        <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
          <Text style={styles.checkoutText}>Proceed to Payment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  heroSection: {
    height: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    marginBottom: 10,
  },
  heroText: {
    fontSize: 24,
    color: 'green',
    fontWeight: 'bold',
  },
  scrollContainer: {
    padding: 20,
    flexGrow: 1,
  },
  cartItemsSection: {
    marginBottom: 20,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  productImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  itemText: {
    flex: 1,
    fontSize: 16,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
  },
  suggestedProductsSection: {
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  suggestedProductsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  suggestedProduct: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  suggestedProductImage: {
    width: '100%',
    height: 100,
    borderRadius: 8,
  },
  productName: {
    fontWeight: 'bold',
    marginVertical: 5,
  },
  productPrice: {
    color: '#555',
  },
  bottomTab: {
    padding: 20,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: '#FF7E00',
    borderRadius: 5,
    padding: 10,
    width: '50%',
    alignItems: 'center',
  },
  checkoutText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CartScreen;
