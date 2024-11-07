<template>
    <div v-if="loading" class="loading">Loading payment details...</div>
    <div v-else class="success-page">
      <h1>Payment Successful!</h1>
      <p>Thank you for your purchase, {{ session.customer_details.name }}.</p>
      <p>We've sent the receipt to {{ session.customer_details.email }}.</p>
      
      <h2>Order Summary</h2>
      <ul>
        <li v-for="item in session.line_items.data" :key="item.id">
          {{ item.quantity }} x {{ item.description }} - {{ formatPrice(item.amount_total) }}
        </li>
      </ul>
  
      <h3>Total: {{ formatPrice(session.amount_total) }}</h3>
      
      <button @click="goToHome" class="btn">Return to Home</button>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  
  const session = ref(null);
  const loading = ref(true);
  const router = useRouter();
  const route = useRoute();
  
  const fetchPaymentDetails = async (id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/payment?id=${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch payment details');
      }
      session.value = await response.json();
    } catch (error) {
      console.error(error);
      router.push('/error');  // Redirect to an error page if necessary
    } finally {
      loading.value = false;
    }
  };
  
  onMounted(() => {
    const id = route.query.id;
    if (id) {
      fetchPaymentDetails(id);
    } else {
      router.push('/error');  // Redirect if no session ID is found
    }
  });
  
  const formatPrice = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount / 100);
  };
  
  const goToHome = () => {
    router.push('/');
  };
  </script>
  
  <style scoped>
  .success-page {
    padding: 20px;
    text-align: center;
  }
  
  h1 {
    color: green;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  .btn {
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .btn:hover {
    background-color: #0056b3;
  }
  </style>
  