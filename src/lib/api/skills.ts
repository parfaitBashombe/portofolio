import { cache } from 'react';
import { createClient } from '../supabase/server';

export type ISkill = {
  id: string;
  name: string;
  proficiency: number; // Mapped from 'level' in database
  icon?: string;
};

export const getSkills = cache(async (): Promise<ISkill[]> => {
  const supabase = await createClient();
  try {
    console.log('🔍 Fetching skills from database...');
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .order('position', { ascending: true });

    if (error) {
      console.error('❌ Error fetching skills:', error);
      return [];
    }

    if (!data || data.length === 0) {
      console.warn('⚠️ No skills found in database');
      return [];
    }

    console.log(`✅ Fetched ${data.length} skills:`, data.map(s => s.name).join(', '));

    // Map database fields to ISkill format
    return (data || []).map(skill => ({
      id: skill.id,
      name: skill.name,
      proficiency: skill.level, // Map 'level' to 'proficiency'
      icon: skill.icon
    })) as ISkill[];
  } catch (error) {
    console.error('❌ Failed to fetch skills:', error);
    return [];
  }
});
