import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useMenu } from '../context/MenuContext';
import { useCart } from '../context/CartContext';

const MenuScreen = ({ navigation }) => {
  const { menu } = useMenu();
  const { addToCart } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [vegFilter, setVegFilter] = useState('all');

  const filteredMenu = useMemo(() => {
    let filtered = menu;

    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(category => category.id === selectedCategory);
    }

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.map(category => ({
        ...category,
        items: category.items.filter(item =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(category => category.items.length > 0);
    }

    // Apply veg filter
    if (vegFilter !== 'all') {
      filtered = filtered.map(category => ({
        ...category,
        items: category.items.filter(item => 
          vegFilter === 'veg' ? item.isVeg : !item.isVeg
        )
      })).filter(category => category.items.length > 0);
    }

    return filtered;
  }, [menu, searchQuery, selectedCategory, vegFilter]);

  const renderCategoryButton = (category) => (
    <TouchableOpacity
      key={category.id}
      style={[
        styles.categoryButton,
        selectedCategory === category.id && styles.categoryButtonActive
      ]}
      onPress={() => setSelectedCategory(
        selectedCategory === category.id ? 'all' : category.id
      )}
    >
      <Text style={[
        styles.categoryButtonText,
        selectedCategory === category.id && styles.categoryButtonTextActive
      ]}>
        {category.name}
      </Text>
    </TouchableOpacity>
  );

  const renderMenuItem = ({ item }) => (
    <View style={styles.menuItem}>
      <Image source={{ uri: item.image }} style={styles.menuItemImage} />
      <View style={styles.menuItemInfo}>
        <View style={styles.menuItemHeader}>
          <Text style={styles.menuItemName}>{item.name}</Text>
          <View style={styles.vegIndicator}>
            <View style={[
              styles.vegDot,
              { backgroundColor: item.isVeg ? '#4CAF50' : '#F44336' }
            ]} />
          </View>
        </View>
        <Text style={styles.menuItemDescription}>{item.description}</Text>
        <View style={styles.menuItemMeta}>
          <Text style={styles.cookingTime}>⏱ {item.cookingTime}</Text>
          <Text style={styles.spicyLevel}>
            {Array.from({ length: 3 }, (_, i) => (
              <Text key={i} style={i < item.spicyLevel ? styles.spiceActive : styles.spiceInactive}>
                🌶
              </Text>
            ))}
          </Text>
        </View>
        <View style={styles.menuItemFooter}>
          <View style={styles.priceContainer}>
            {item.halfPrice ? (
              <>
                <Text style={styles.halfPrice}>Half: ₹{item.halfPrice}</Text>
                <Text style={styles.fullPrice}>Full: ₹{item.price}</Text>
              </>
            ) : (
              <Text style={styles.fullPrice}>₹{item.price}</Text>
            )}
          </View>
          <View style={styles.addButtonContainer}>
            {item.halfPrice && (
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => addToCart(item, 'half')}
              >
                <Text style={styles.addButtonText}>Half</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={[styles.addButton, styles.addButtonPrimary]}
              onPress={() => addToCart(item, 'full')}
            >
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  const renderCategorySection = ({ item: category }) => (
    <View key={category.id} style={styles.categorySection}>
      <Text style={styles.categoryTitle}>{category.name}</Text>
      {category.items.map(item => (
        <View key={item.id}>
          {renderMenuItem({ item })}
        </View>
      ))}
    </View>
  );

  return (
    <LinearGradient
      colors={['#1a1a1a', '#2d1b0e']}
      style={styles.container}
    >
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#8b7355" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search menu items..."
          placeholderTextColor="#8b7355"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery ? (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={20} color="#8b7355" />
          </TouchableOpacity>
        ) : null}
      </View>

      {/* Filter Buttons */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterContainer}
      >
        <TouchableOpacity
          style={[
            styles.filterButton,
            vegFilter === 'all' && styles.filterButtonActive
          ]}
          onPress={() => setVegFilter('all')}
        >
          <Text style={[
            styles.filterButtonText,
            vegFilter === 'all' && styles.filterButtonTextActive
          ]}>
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            vegFilter === 'veg' && styles.filterButtonActive
          ]}
          onPress={() => setVegFilter('veg')}
        >
          <Text style={[
            styles.filterButtonText,
            vegFilter === 'veg' && styles.filterButtonTextActive
          ]}>
            Veg
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            vegFilter === 'nonveg' && styles.filterButtonActive
          ]}
          onPress={() => setVegFilter('nonveg')}
        >
          <Text style={[
            styles.filterButtonText,
            vegFilter === 'nonveg' && styles.filterButtonTextActive
          ]}>
            Non-Veg
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Category Buttons */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
      >
        {menu.map(renderCategoryButton)}
      </ScrollView>

      {/* Menu Items */}
      <FlatList
        data={filteredMenu}
        renderItem={renderCategorySection}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.menuList}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="restaurant-outline" size={64} color="#8b7355" />
            <Text style={styles.emptyStateText}>No items found</Text>
            <Text style={styles.emptyStateSubtext}>
              Try adjusting your search or filters
            </Text>
          </View>
        }
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2d1b0e',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    color: '#ffffff',
    fontSize: 16,
  },
  filterContainer: {
    marginBottom: 16,
  },
  filterButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: '#2d1b0e',
    borderRadius: 20,
    marginRight: 8,
  },
  filterButtonActive: {
    backgroundColor: '#d4af37',
  },
  filterButtonText: {
    color: '#8b7355',
    fontWeight: '600',
  },
  filterButtonTextActive: {
    color: '#1a1a1a',
  },
  categoriesContainer: {
    marginBottom: 16,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#2d1b0e',
    borderRadius: 12,
    marginRight: 8,
  },
  categoryButtonActive: {
    backgroundColor: '#d4af37',
  },
  categoryButtonText: {
    color: '#8b7355',
    fontWeight: '600',
  },
  categoryButtonTextActive: {
    color: '#1a1a1a',
  },
  menuList: {
    paddingBottom: 20,
  },
  categorySection: {
    marginBottom: 24,
  },
  categoryTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#d4af37',
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: 'row',
    backgroundColor: '#2d1b0e',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
  },
  menuItemImage: {
    width: 100,
    height: 100,
  },
  menuItemInfo: {
    flex: 1,
    padding: 12,
  },
  menuItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  menuItemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    flex: 1,
  },
  vegIndicator: {
    padding: 4,
    borderWidth: 1,
    borderColor: '#8b7355',
    borderRadius: 4,
    marginLeft: 8,
  },
  vegDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  menuItemDescription: {
    fontSize: 12,
    color: '#8b7355',
    marginBottom: 8,
    lineHeight: 16,
  },
  menuItemMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  cookingTime: {
    fontSize: 12,
    color: '#8b7355',
  },
  spicyLevel: {
    fontSize: 10,
  },
  spiceActive: {
    opacity: 1,
  },
  spiceInactive: {
    opacity: 0.3,
  },
  menuItemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceContainer: {
    flex: 1,
  },
  halfPrice: {
    fontSize: 14,
    color: '#d4af37',
    fontWeight: '600',
  },
  fullPrice: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  addButtonContainer: {
    flexDirection: 'row',
  },
  addButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    marginLeft: 8,
  },
  addButtonPrimary: {
    backgroundColor: '#d4af37',
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 18,
    color: '#d4af37',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#8b7355',
    textAlign: 'center',
  },
});

export default MenuScreen;