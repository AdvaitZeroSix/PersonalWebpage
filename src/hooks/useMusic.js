import { useSyncExternalStore } from 'react'
import { getSnapshot, subscribe } from '../lib/music'

export default function useMusic() {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
}
