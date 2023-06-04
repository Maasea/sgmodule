import { Client, Surge, QuanX, Loon } from './client'

function createClient (name: string, options?: { debug?: boolean }): Client {
  if (typeof $task !== 'undefined') {
    return new QuanX(name, options)
  } else if (typeof $loon !== 'undefined') {
    return new Loon(name, options)
  } else {
    return new Surge(name, options)
  }
}

export const $ = createClient('YouTube', { debug: DEBUG })

