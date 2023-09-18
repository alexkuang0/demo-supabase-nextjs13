export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      todos: {
        Row: {
          content: string
          created_at: string
          id: string
          is_completed: boolean
          owner: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          is_completed?: boolean
          owner: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          is_completed?: boolean
          owner?: string
        }
        Relationships: [
          {
            foreignKeyName: "todos_owner_fkey"
            columns: ["owner"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
