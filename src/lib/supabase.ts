import { createClient } from '@supabase/supabase-js'
import type { PlayerRecord } from './types'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

// Create client only if keys are present to avoid runtime crashes
export const supabase = (supabaseUrl && supabaseKey)
    ? createClient(supabaseUrl, supabaseKey)
    : null

export async function saveGameResult(record: PlayerRecord) {
    if (!supabase) {
        console.warn("Supabase not configured. Using local storage only.")
        return null
    }

    const { data, error } = await supabase
        .from('games')
        .upsert([
            {
                player_name: record.name,
                reg_no: record.regNo,
                level: record.level, // Saved Level
                score: record.score,
                rolls_used: record.rollsUsed,
                result: record.result,
                created_at: record.date
            }
        ], { onConflict: 'reg_no,level' }) // Conflict on Compound Key (Name + Level)
        .select()

    if (error) {
        console.error('Error saving game to Supabase:', error)
    }
    return data
}

export async function fetchLeaderboard(level?: number) {
    if (!supabase) return null

    // Start building the query
    let query = supabase
        .from('games')
        .select('*')

    // Filter by level if provided
    if (level) {
        if (level === 1) {
            // For level 1, include nulls for backward compatibility
            query = query.or(`level.eq.${level},level.is.null`)
        } else {
            query = query.eq('level', level)
        }
    }

    // Sort by score (desc) then rolls_used (asc)
    const { data, error } = await query
        .order('score', { ascending: false })
        .order('rolls_used', { ascending: true })
        .limit(100)

    if (error) {
        console.error('Error fetching leaderboard:', error)
        return null
    }

    return data
}
