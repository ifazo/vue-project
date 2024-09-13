import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
    const user = ref('')

    function setUser(name: string) {
        user.value = name
    }

    return { user, setUser }
})