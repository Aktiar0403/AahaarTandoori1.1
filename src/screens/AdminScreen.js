import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Switch,
  TextInput,
  Alert
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useMenu } from '../context/MenuContext';
import { useAuth } from '../context/AuthContext';

const AdminScreen = () => {
  const { menu, updateItem, addItem, removeItem } = useMenu();
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState('menu');
  const [editingItem, setEditingItem] = useState(null);

  const handleToggleAvailability = (categoryId, itemId, currentStatus) => {
    updateItem(categoryId, itemId, { available: !currentStatus });
  };

  const handleEditPrice = (categoryId, item) => {
    Alert.prompt(
      'Edit Price',
      `Enter new price for ${item.name}:`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Update',
          onPress: (newPrice) => {
            const price = parseFloat(newPrice);
            if (!isNaN(price) && price > 0) {
              updateItem(categoryId, item.id, { price });
            } else {
              Alert.alert('Error', 'Please enter a valid price');
            }
          }
        }
      ],
      'plain-text',
      item.price.toString()
    );
  };

  const handleEditHalfPrice = (categoryId, item) => {
    Alert.prompt(
      'Edit Half Price',
      `Enter new half price for ${item.name}:`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Update',
          onPress: (newPrice) => {
            const halfPrice = parseFloat(newPrice);
            if (!isNaN(halfPrice) && halfPrice > 0) {
              updateItem(categoryId, item.id, { halfPrice });
            } else {
              Alert.alert('Error', 'Please enter a valid price');
            }
          }
        }
      ],
      'plain-text',
      item.halfPrice ? item.halfPrice.toString() : ''
    );
  };

  const handleDeleteItem = (categoryId, itemId, itemName) => {
    Alert.alert(
      'Delete Item',
      `Are you sure you want to delete "${itemName}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => removeItem(categoryId, itemId)
        }
      ]
    );
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', onPress: logout }
      ]
    );
  };

  const renderMenuManagement = () => (
    <ScrollView style={styles.tabContent}>
      {menu.map(category => (
        <View key={category.id} style={styles.categorySection}>
          <Text style={styles.categoryTitle}>{category.name}</Text>
          {category.items.map(item => (
            <View key={item.id} style={styles.adminMenuItem}>
              <Image source={{ uri: item.image }} style={styles.adminItemImage} />
              <View style={styles.adminItemInfo}>
                <View style={styles.adminItemHeader}>
                  <Text style={styles.adminItemName}>{item.name}</Text>
                  <View style={styles.availabilityContainer}>
                    <Text style={styles.availabilityText}>
                      {item.available ? 'Available' : 'Unavailable'}
                    </Text>
                    <Switch
                      value={item.available}
                      onValueChange={() => 
                        handleToggleAvailability(category.id, item.id, item.available)
                      }
                      trackColor={{ false: '#767577', true: '#d4af37' }}
                      thumbColor={item.available ? '#ffffff' : '#f4f3f4'}
                    />
                  </View>
                </View>
                <Text style={styles.adminItemDescription}>{item.description}</Text>
                <View style={styles.priceContainer}>
                  <TouchableOpacity
                    style={styles.priceButton}
                    onPress={() => handleEditPrice(category.id, item)}
                  >
                    <Text style={styles.priceText}>Full: ₹{item.price}</Text>
                  </TouchableOpacity>
                  {item.halfPrice && (
                    <TouchableOpacity
                      style={styles.priceButton}
                      onPress={() => handleEditHalfPrice(category.id, item)}
                    >
                      <Text style={styles.priceText}>Half: ₹{item.halfPrice}</Text>
                    </TouchableOpacity>
                  )}
                </View>
                <View style={styles.adminItemActions}>
                  <TouchableOpacity
                    style={[styles.actionButton, styles.deleteButton]}
                    onPress={() => handleDeleteItem(category.id, item.id, item.name)}
                  >
                    <Ionicons name="trash-outline" size={16} color="#ffffff" />
                    <Text style={styles.actionButtonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );

  const renderAnalytics = () => (
    <View style={styles.tabContent}>
      <View style={styles.analyticsContainer}>
        <View style={styles.statCard}>
          <LinearGradient
            colors={['#d4af37', '#b8941f']}
            style={styles.statGradient}
          >
            <Text style={styles.statNumber}>42</Text>
            <Text style={styles.statLabel}>Today's Orders</Text>
          </LinearGradient>
        </View>
        <View style={styles.statCard}>
          <LinearGradient
            colors={['#d4af37', '#b8941f']}
            style={styles.statGradient}
          >
            <Text style={styles.statNumber}>₹12,480</Text>
            <Text style={styles.statLabel}>Today's Revenue</Text>
          </LinearGradient>
        </View>
        <View style={styles.statCard}>
          <LinearGradient
            colors={['#d4af37', '#b8941f']}
            style={styles.statGradient}
          >
            <Text style={styles.statNumber}>86%</Text>
            <Text style={styles.statLabel}>Availability Rate</Text>
          </LinearGradient>
        </View>
        <View style={styles.statCard}>
          <LinearGradient
            colors={['#d4af37', '#b8941f']}
            style={styles.statGradient}
          >
            <Text style={styles.statNumber}>4.8★</Text>
            <Text style={styles.statLabel}>Customer Rating</Text>
          </LinearGradient>
        </View>
      </View>

      <View style={styles.popularItems}>
        <Text style={styles.sectionTitle}>Popular Items</Text>
        {menu.flatMap(category => category.items).slice(0, 5).map((item, index) => (
          <View key={item.id} style={styles.popularItem}>
            <Text style={styles.rank}>#{index + 1}</Text>
            <Image source={{ uri: item.image }} style={styles.popularItemImage} />
            <View style={styles.popularItemInfo}>
              <Text style={styles.popularItemName}>{item.name}</Text>
              <Text style={styles.popularItemPrice}>₹{item.price}</Text>
            </View>
            <Text style={styles.orderCount}>28 orders</Text>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <LinearGradient
      colors={['#1a1a1a', '#2d1b0e']}
      style={styles.container}
    >
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Admin Panel</Text>
          <Text style={styles.headerSubtitle}>Manage your restaurant</Text>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={24} color="#d4af37" />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'menu' && styles.activeTab]}
          onPress={() => setActiveTab('menu')}
        >
          <Text style={[styles.tabText, activeTab === 'menu' && styles.activeTabText]}>
            Menu Management
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'analytics' && styles.activeTab]}
          onPress={() => setActiveTab('analytics')}
        >
          <Text style={[styles.tabText, activeTab === 'analytics' && styles.activeTabText]}>
            Analytics
          </Text>
        </TouchableOpacity>
      </View>

      {/* Tab Content */}
      {activeTab === 'menu' ? renderMenuManagement() : renderAnalytics()}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#d4af37',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#8b7355',
    marginTop: 4,
  },
  logoutButton: {
    padding: 8,
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#d4af37',
  },
  tabText: {
    color: '#8b7355',
    fontWeight: '600',
  },
  activeTabText: {
    color: '#d4af37',
  },
  tabContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  categorySection: {
    marginBottom: 24,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#d4af37',
    marginBottom: 16,
  },
  adminMenuItem: {
    flexDirection: 'row',
    backgroundColor: '#2d1b0e',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  adminItemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  adminItemInfo: {
    flex: 1,
    marginLeft: 12,
  },
  adminItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  adminItemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    flex: 1,
  },
  availabilityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  availabilityText: {
    fontSize: 12,
    color: '#8b7355',
    marginRight: 8,
  },
  adminItemDescription: {
    fontSize: 12,
    color: '#8b7355',
    marginBottom: 8,
    lineHeight: 16,
  },
  priceContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  priceButton: {
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginRight: 8,
  },
  priceText: {
    color: '#d4af37',
    fontSize: 12,
    fontWeight: '600',
  },
  adminItemActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginLeft: 8,
  },
  deleteButton: {
    backgroundColor: '#dc2626',
  },
  actionButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  analyticsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    width: '48%',
    marginBottom: 12,
    borderRadius: 12,
    overflow: 'hidden',
  },
  statGradient: {
    padding: 16,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#1a1a1a',
    fontWeight: '600',
    textAlign: 'center',
  },
  popularItems: {
    backgroundColor: '#2d1b0e',
    borderRadius: 12,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#d4af37',
    marginBottom: 16,
  },
  popularItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  rank: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#d4af37',
    width: 30,
  },
  popularItemImage: {
    width: 40,
    height: 40,
    borderRadius: 6,
    marginRight: 12,
  },
  popularItemInfo: {
    flex: 1,
  },
  popularItemName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 2,
  },
  popularItemPrice: {
    fontSize: 12,
    color: '#d4af37',
  },
  orderCount: {
    fontSize: 12,
    color: '#8b7355',
  },
});

export default AdminScreen;