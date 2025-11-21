import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  TextInput
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const CartScreen = ({ navigation }) => {
  const { cart, updateQuantity, removeFromCart, clearCart, getTotalPrice } = useCart();
  const { user } = useAuth();
  const [deliveryDetails, setDeliveryDetails] = useState({
    name: '',
    address: '',
    phone: '',
    instructions: ''
  });

  const handleQuantityChange = (itemId, portion, change) => {
    const item = cart.find(item => item.id === itemId && item.portion === portion);
    if (item) {
      const newQuantity = item.quantity + change;
      updateQuantity(itemId, portion, newQuantity);
    }
  };

  const handleRemoveItem = (itemId, portion) => {
    Alert.alert(
      'Remove Item',
      'Are you sure you want to remove this item from cart?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Remove', 
          style: 'destructive',
          onPress: () => removeFromCart(itemId, portion)
        }
      ]
    );
  };

  const handleCheckout = () => {
    if (!deliveryDetails.name || !deliveryDetails.address || !deliveryDetails.phone) {
      Alert.alert('Incomplete Details', 'Please fill in all required delivery details');
      return;
    }

    if (cart.length === 0) {
      Alert.alert('Empty Cart', 'Please add items to your cart before checkout');
      return;
    }

    Alert.alert(
      'Confirm Order',
      `Total Amount: ₹${getTotalPrice()}\n\nProceed with checkout?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Confirm Order', 
          onPress: () => {
            Alert.alert(
              'Order Placed!',
              `Your order has been placed successfully!\nOrder Total: ₹${getTotalPrice()}\nEstimated delivery time: 35-45 minutes`,
              [
                {
                  text: 'OK',
                  onPress: () => {
                    clearCart();
                    navigation.navigate('Home');
                  }
                }
              ]
            );
          }
        }
      ]
    );
  };

  if (cart.length === 0) {
    return (
      <LinearGradient
        colors={['#1a1a1a', '#2d1b0e']}
        style={styles.container}
      >
        <View style={styles.emptyCart}>
          <Ionicons name="cart-outline" size={80} color="#8b7355" />
          <Text style={styles.emptyCartText}>Your cart is empty</Text>
          <Text style={styles.emptyCartSubtext}>
            Browse our menu and add some delicious items
          </Text>
          <TouchableOpacity
            style={styles.browseButton}
            onPress={() => navigation.navigate('Menu')}
          >
            <LinearGradient
              colors={['#d4af37', '#b8941f']}
              style={styles.browseButtonGradient}
            >
              <Text style={styles.browseButtonText}>Browse Menu</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={['#1a1a1a', '#2d1b0e']}
      style={styles.container}
    >
      <ScrollView style={styles.scrollView}>
        {/* Cart Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Items</Text>
          {cart.map((item) => (
            <View key={`${item.id}-${item.portion}`} style={styles.cartItem}>
              <Image source={{ uri: item.image }} style={styles.cartItemImage} />
              <View style={styles.cartItemInfo}>
                <View style={styles.cartItemHeader}>
                  <Text style={styles.cartItemName}>{item.name}</Text>
                  <TouchableOpacity
                    onPress={() => handleRemoveItem(item.id, item.portion)}
                  >
                    <Ionicons name="trash-outline" size={20} color="#8b7355" />
                  </TouchableOpacity>
                </View>
                <Text style={styles.cartItemPortion}>
                  {item.portion === 'half' ? 'Half Portion' : 'Full Portion'}
                </Text>
                <View style={styles.cartItemFooter}>
                  <Text style={styles.cartItemPrice}>
                    ₹{item.portion === 'half' && item.halfPrice ? item.halfPrice : item.price}
                  </Text>
                  <View style={styles.quantityContainer}>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() => handleQuantityChange(item.id, item.portion, -1)}
                    >
                      <Ionicons name="remove" size={16} color="#ffffff" />
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{item.quantity}</Text>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() => handleQuantityChange(item.id, item.portion, 1)}
                    >
                      <Ionicons name="add" size={16} color="#ffffff" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Delivery Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery Details</Text>
          <TextInput
            style={styles.input}
            placeholder="Full Name *"
            placeholderTextColor="#8b7355"
            value={deliveryDetails.name}
            onChangeText={(text) => setDeliveryDetails(prev => ({ ...prev, name: text }))}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone Number *"
            placeholderTextColor="#8b7355"
            value={deliveryDetails.phone}
            onChangeText={(text) => setDeliveryDetails(prev => ({ ...prev, phone: text }))}
            keyboardType="phone-pad"
          />
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Delivery Address *"
            placeholderTextColor="#8b7355"
            value={deliveryDetails.address}
            onChangeText={(text) => setDeliveryDetails(prev => ({ ...prev, address: text }))}
            multiline
            numberOfLines={3}
          />
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Special Instructions (optional)"
            placeholderTextColor="#8b7355"
            value={deliveryDetails.instructions}
            onChangeText={(text) => setDeliveryDetails(prev => ({ ...prev, instructions: text }))}
            multiline
            numberOfLines={2}
          />
        </View>

        {/* Order Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>₹{getTotalPrice()}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Delivery Fee</Text>
            <Text style={styles.summaryValue}>₹30</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Tax (5%)</Text>
            <Text style={styles.summaryValue}>₹{(getTotalPrice() * 0.05).toFixed(2)}</Text>
          </View>
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>
              ₹{(getTotalPrice() + 30 + (getTotalPrice() * 0.05)).toFixed(2)}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Checkout Button */}
      <View style={styles.checkoutContainer}>
        <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
          <LinearGradient
            colors={['#d4af37', '#b8941f']}
            style={styles.checkoutGradient}
          >
            <Text style={styles.checkoutText}>
              Place Order • ₹{(getTotalPrice() + 30 + (getTotalPrice() * 0.05)).toFixed(2)}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyCartText: {
    fontSize: 24,
    color: '#d4af37',
    marginTop: 20,
    marginBottom: 10,
  },
  emptyCartSubtext: {
    fontSize: 16,
    color: '#8b7355',
    textAlign: 'center',
    marginBottom: 30,
  },
  browseButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  browseButtonGradient: {
    paddingHorizontal: 30,
    paddingVertical: 15,
  },
  browseButtonText: {
    color: '#1a1a1a',
    fontSize: 16,
    fontWeight: 'bold',
  },
  section: {
    backgroundColor: '#2d1b0e',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#d4af37',
    marginBottom: 16,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  cartItemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  cartItemInfo: {
    flex: 1,
    marginLeft: 12,
  },
  cartItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  cartItemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    flex: 1,
  },
  cartItemPortion: {
    fontSize: 12,
    color: '#8b7355',
    marginBottom: 8,
  },
  cartItemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cartItemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#d4af37',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2d1b0e',
    borderRadius: 8,
    padding: 4,
  },
  quantityButton: {
    width: 24,
    height: 24,
    borderRadius: 4,
    backgroundColor: '#d4af37',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
    marginHorizontal: 12,
    minWidth: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#1a1a1a',
    borderColor: '#8b7355',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    color: '#ffffff',
    fontSize: 16,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a',
  },
  totalRow: {
    borderBottomWidth: 0,
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#1a1a1a',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#8b7355',
  },
  summaryValue: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '600',
  },
  totalLabel: {
    fontSize: 18,
    color: '#d4af37',
    fontWeight: 'bold',
  },
  totalValue: {
    fontSize: 18,
    color: '#d4af37',
    fontWeight: 'bold',
  },
  checkoutContainer: {
    padding: 16,
    backgroundColor: '#1a1a1a',
    borderTopWidth: 1,
    borderTopColor: '#2d1b0e',
  },
  checkoutButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  checkoutGradient: {
    padding: 16,
    alignItems: 'center',
  },
  checkoutText: {
    color: '#1a1a1a',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CartScreen;