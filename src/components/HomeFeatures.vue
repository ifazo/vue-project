<template>
    <section class="py-16 bg-gray-100">
      <div class="container mx-auto px-4">
        <h2 class="text-4xl font-bold text-center mb-12">Our Features</h2>
        <TransitionGroup
          tag="div"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          name="staggered-fade"
          appear
        >
          <div
            v-for="(feature, index) in features"
            :key="feature.id"
            :style="{ transitionDelay: `${index * 100}ms` }"
            class="bg-white rounded-lg shadow-lg p-6 transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-xl"
          >
            <component
              :is="feature.icon"
              class="w-12 h-12 text-blue-600 mb-4"
            />
            <h3 class="text-xl font-semibold mb-2">{{ feature.title }}</h3>
            <p class="text-gray-600">{{ feature.description }}</p>
          </div>
        </TransitionGroup>
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { Zap, Shield, Smartphone, Globe, Cloud, Cpu } from 'lucide-vue-next'
  
  const features = ref([
    {
      id: 1,
      title: 'Lightning Fast',
      description: 'Lightning fast speeds for your content.',
      icon: Zap
    },
    {
      id: 2,
      title: 'Secure',
      description: 'Secured with the latest encryption technology.',
      icon: Shield
    },
    {
      id: 3,
      title: 'Mobile Responsive',
      description: 'Optimized for mobile devices and tablets.',
      icon: Smartphone
    },
    {
      id: 4,
      title: 'Deploy Globally',
      description: 'Explore our services worldwide.',
      icon: Globe
    },
    {
      id: 5,
      title: 'Database Integration',
      description: 'Integrate with secured database system.',
      icon: Cloud
    },
    {
      id: 6,
      title: 'API Integration',
      description: 'Secured app with protected API system.',
      icon: Cpu
    }
  ])
  </script>
  
  <style scoped>
  .staggered-fade-enter-active,
  .staggered-fade-leave-active {
    transition: all 0.5s ease;
  }
  .staggered-fade-enter-from,
  .staggered-fade-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }
  </style>