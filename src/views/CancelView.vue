<template>
    <div class="cancel-page">
      <div class="cancel-message">
        <h1>Payment Cancelled</h1>
        <p>It seems like you canceled your payment. You can return to the cart or try again.</p>
        <button @click="goToCart" class="btn">
          Go to Cart
        </button>
        <button @click="retryPayment" class="btn">
          Retry Payment
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  
  const goToCart = () => {
    router.push('/cart');
  };
  
  const retryPayment = () => {
    router.push('/checkout');
  };
  </script>
  
  <style scoped>
  .cancel-page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    text-align: center;
  }
  
  .cancel-message {
    max-width: 400px;
    padding: 20px;
    background-color: #f8d7da;
    border-radius: 8px;
  }
  
  h1 {
    color: #721c24;
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
  