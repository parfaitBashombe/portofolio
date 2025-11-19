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
      console.error('Error fetching social links:', error);
      return [];
    }

    // Map database fields to ISocialLink format
    return (data || []).map(link => ({
      id: link.id,
      platform: link.label, // Map 'label' to 'platform'
      url: link.href,       // Map 'href' to 'url'
      icon: link.icon
    })) as ISocialLink[];
  } catch (error) {
    console.error('Failed to fetch social links:', error);
    return [];
  }
});
