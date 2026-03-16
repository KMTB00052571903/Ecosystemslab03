import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config()

const supabaseUrl = process.env.SUPABASE_URL as string
const supabaseKey = process.env.SUPABASE_KEY as string

if (!supabaseUrl || !supabaseKey) {
  throw new Error('SUPABASE_URL y SUPABASE_KEY son requeridos')
}

export const supabase = createClient(supabaseUrl, supabaseKey)