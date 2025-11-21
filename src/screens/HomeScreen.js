import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useMenu } from '../context/MenuContext';
import { useCart } from '../context/CartContext';

const HomeScreen = ({ navigation }) => {
  const { menu } = useMenu();
  const { cart } = useCart();

  const featuredItems = menu.flatMap(category => 
    category.items.filter(item => item.available).slice(0, 2)
  );

  return (
    <LinearGradient
      colors={['#1a1a1a', '#2d1b0e']}
      style={styles.container}
    >
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Aahaar Tandoori</Text>
          <Text style={styles.subtitle}>Premium Restaurant Experience</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Items</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {featuredItems.map(item => (
              <TouchableOpacity
                key={item.id}
                style={styles.featuredItem}
                onPress={() => navigation.navigate('Menu')}
              >
                <Image source={{ uri: item.image }} style={styles.featuredImage} />
                <View style={styles.featuredInfo}>
                  <Text style={styles.featuredName}>{item.name}</Text>
                  <Text style={styles.featuredPrice}>₹{item.price}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <View style={styles.categoriesGrid}>
            {menu.map(category => (
              <TouchableOpacity
                key={category.id}
                style={styles.categoryCard}
                onPress={() => navigation.navigate('Menu')}
              >
                <LinearGradient
                  colors={['#2d1b0e', '#1a1a1a']}
                  style={styles.categoryGradient}
                >
                  <Text style={styles.categoryName}>{category.name}</Text>
                  <Text style={styles.categoryCount}>
                    {category.items.filter(item => item.available).length} items
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{cart.length}</Text>
            <Text style={styles.statLabel}>Items in Cart</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>25-35</Text>
            <Text style={styles.statLabel}>Avg. Prep Time</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>4.8</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#d4af37',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#8b7355',
    marginTop: 5,
    textAlign: 'center',
  },
  section: {
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#d4af37',
    marginBottom: 15,
  },
  featuredItem: {
    marginRight: 15,
    backgroundColor: '#2d1b0e',
    borderRadius: 15,
    overflow: 'hidden',
    width: 200,
  },
  featuredImage: {
    width: '100%',
    height: 120,
  },
  featuredInfo: {
    padding: 15,
  },
  featuredName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  featuredPrice: {
    fontSize: 14,
    color: '#d4af37',
    fontWeight: 'bold',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '48%',
    marginBottom: 15,
    borderRadius: 15,
    overflow: 'hidden',
  },
  categoryGradient: {
    padding: 20,
    alignItems: 'center',
  },
  categoryName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#d4af37',
    textAlign: 'center',
  },
  categoryCount: {
    fontSize: 12,
    color: '#8b7355',
    marginTop: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: '#2d1b0e',
    margin: 20,
    borderRadius: 15,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#d4af37',
  },
  statLabel: {
    fontSize: 12,
    color: '#8b7355',
    marginTop: 5,
  },
});

export default HomeScreen;