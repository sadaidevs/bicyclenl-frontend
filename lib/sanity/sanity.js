import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: 'hcnm45vz', 
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})