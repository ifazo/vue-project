import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const user = ref(null)

  function setUser(userData) {
    user.value = userData
    localStorage.setItem('user', JSON.stringify(userData))
    console.log('User set in localStorage:', userData) // Debugging
  }

  function clearUser() {
    user.value = null
    localStorage.removeItem('user')
    console.log('User cleared from localStorage') // Debugging
  }

  function initializeUser() {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      user.value = JSON.parse(storedUser)
      console.log('User initialized from localStorage:', user.value) // Debugging
    } else {
      console.log('No user found in localStorage') // Debugging
    }
  }

  return { user, setUser, clearUser, initializeUser }
})
