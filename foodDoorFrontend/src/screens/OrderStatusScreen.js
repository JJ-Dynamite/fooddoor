import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ProgressChart } from 'react-native-chart-kit';
import { Colors } from '../constants';

const OrderStatusScreen = () => {
  const data = {
    data: [0.6],
  };

  const chartConfig = {
    backgroundGradientFrom: '#FFFFFF',
    backgroundGradientTo: '#FFFFFF',
    color: (opacity = 1) => `rgba(255, 87, 51, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(51, 51, 51, ${opacity})`,
    strokeWidth: 8,
    decimalPlaces: 0,
    propsForDots: {
      r: '6',
      strokeWidth: '1',
      stroke: Colors.DEFAULT_GREEN,
    },
    propsForLabels: {
      fontSize: 18,
    },
    fillShadowGradient: '#f2f2f2',
    fillShadowGradientOpacity: 1,
    useShadowColorFromDataset: false,
    fillGradient: () => {
      return {
        colors: [Colors.DEFAULT_GREEN, Colors.DEFAULT_YELLOW],
      };
    },
  };

  return (
    <View style={styles.container}>
      <View style={styles.chartContainer}>
        <ProgressChart
          data={data}
          width={250}
          height={250}
          strokeWidth={8}
          radius={90}
          chartConfig={chartConfig}
        />
        <View style={styles.chartLabel}>
          <Text style={styles.chartLabelText}>Order Status</Text>
          <Text style={styles.chartPercentText}>60%</Text>
        </View>
      </View>
      <View style={styles.statusContainer}>
        <Text style={styles.statusTitle}>Your order is on the way!</Text>
        <Text style={styles.statusSubtitle}>
          Estimated delivery time: 2 hours
        </Text>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.statusBlock}>
          <Text style={styles.statusLabel}>Order Placed</Text>
          <Text style={styles.statusDate}>Feb 21, 2023 at 2:30 PM</Text>
        </View>
        <View style={styles.statusBlock}>
          <Text style={styles.statusLabel}>Preparing Your Order</Text>
          <Text style={styles.statusDate}>Feb 21, 2023 at 2:45 PM</Text>
        </View>
        <View style={styles.statusBlock}>
          <Text style={styles.statusLabel}>Out for Delivery</Text>
          <Text style={styles.statusDate}>Feb 21, 2023 at 3:15 PM</Text>
        </View>
        <View style={styles.statusBlock}>
          <Text style={styles.statusLabel}>Delivered</Text>
          <Text style={styles.statusDate}>Feb 21, 2023 at 4:00 PM</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    paddingHorizontal: 20,
    paddingVertical: 40,
    justifyContent: 'space-between',
  },
  chartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  chartLabel: {
    position: 'absolute',
    alignItems: 'center',
  },
  chartLabelText: {
    color: '#333333',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  chartPercentText: {
    color: Colors.DEFAULT_GREEN,
    fontSize: 23,
    fontWeight: 'bold',
  },
  statusContainer: {
    alignItems: 'center',
  },
  statusTitle: {
    color: '#333333',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  statusSubtitle: {
    color: '#333333',
    fontSize: 16,
    marginBottom: 30,
  },
  bottomContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
  },
  statusBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  statusLabel: {
    color: '#333333',
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  statusDate: {
    color: '#A5A5A5',
    fontSize: 14,
    textAlign: 'right',
    flex: 1,
  },
});

export default OrderStatusScreen;
