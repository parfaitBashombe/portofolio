import { cache } from 'react';
import { createClient } from '../supabase/server';

export type ISocialLink = {
  id: string;
  platform: string; // Mapped from 'label' in database
  url: string;      // Mapped from 'href' in database
  icon?: string;
};

export const getSocialLinks = cache(async (): Promise<ISocialLink[]> => {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase
      .from('social_links')
      .select('*')
      .order('label', { ascending: true });

    if (error) {
      console.error('❌ Error fetching social links:', error);
      return [];
    }

    if (!data || data.length === 0) {
      console.warn('⚠️ No social links found in database');
      return [];
    }


    // Map database fields to ISocialLink format
    // Normalize platform names to match icon mapping (capitalize first letter)
    return (data || []).map(link => {
      const platform = link.label;
      // Capitalize first letter for better matching: 'github' -> 'GitHub'
      const normalizedPlatform = platform.charAt(0).toUpperCase() + platform.slice(1);
      
      return {
        id: link.id,
        platform: normalizedPlatform, // Map 'label' to 'platform' with normalization
        url: link.href,       // Map 'href' to 'url'
        icon: link.icon
      };
    }) as ISocialLink[];
  } catch (error) {
    console.error('❌ Failed to fetch social links:', error);
    return [];
  }
});
