import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useGetServiceById } from '@/app/(api)/graphql/services/services.apiHooks'; 

// ServiceComponent which takes the serviceId as a prop
const ServiceComponent = ({ serviceId }: { serviceId: number }) => {
  const { data, loading, error } = useGetServiceById(serviceId);

  useEffect(() => {
    if (error) {
      console.log("Error:", error);
    }
  }, [error]);

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;

  if (error) {
    console.error('GraphQL Error:', error.message);
  }

  return (
    <View style={styles.container}>
      {data?.services ? (
        <View style={styles.item}>
          <Text style={styles.serviceName}>{data.services.service_name}</Text>
          <Text>{data.services.service_category}</Text>
          <Text>{data.services.duration}</Text>
          <Text>{data.services.price}</Text>
          <Text>{data.services.service_description ?? 'No description available'}</Text>
          <Text>Created at: {data.services.created_at}</Text>
          <Text>Updated at: {data.services.updated_at}</Text>
        </View>
      ) : (
        <Text>No service found</Text>
      )}
    </View>
  );
};

// Wrapper page component that passes a default serviceId
const ServicePage = () => {
  // Set default serviceId to 2
  const defaultServiceId = 2;

  return (
    <View style={styles.pageContainer}>
      <Text style={styles.pageTitle}>Service Details</Text>
      {/* Pass the default serviceId to the ServiceComponent */}
      <ServiceComponent serviceId={defaultServiceId} />
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  item: {
    padding: 16,
    marginBottom: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  serviceName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  error: {
    color: 'red',
    textAlign: 'center',
  },
});

export default ServicePage;
