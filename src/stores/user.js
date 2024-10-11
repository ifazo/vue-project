import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const user = ref(null)

  function setUser(userData) {
    user.value = userData
    localStorage.setItem('user', JSON.stringify(userData))
  }

  function clearUser() {
    user.value = null
    localStorage.removeItem('user')
  }

  function initializeUser() {
    const storedUser = localStorage.getItem('user')
    user.value = JSON.parse(storedUser)
  }

  return { user, setUser, clearUser, initializeUser }
})
