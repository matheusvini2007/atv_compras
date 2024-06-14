import { createClient } from "@supabase/supabase-js";

const link = 'https://zwjaqifrjusxehguaxpu.supabase.co'
const chave = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp3amFxaWZyanVzeGVoZ3VheHB1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTgxNDM3NTIsImV4cCI6MjAzMzcxOTc1Mn0.13bbZoGQWhBkOIRBcmF9gAuLS8CsJyAz8dvqxvRG48w'

export const supabase = createClient(link, chave)