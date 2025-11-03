import { defineStore } from 'pinia'
import { ref } from 'vue'

interface QueueProps {
  text: string
  color: 'success' | 'error' | 'warning' | 'info'
  timeout?: number
}
export const useMessages = defineStore('messages', () => {
  const queue = ref<QueueProps[]>([])
  function addMessage(message: QueueProps) {
    queue.value.push(message)
  }

  return { queue, addMessage }
})
