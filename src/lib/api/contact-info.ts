import { cache } from 'react';
import { createClient } from '../supabase/server';

export type IContactInfo = {
  id: string;
  email: string;
  phone?: string;
  address?: string;
  resume_url?: string;
};

export const getContactInfo = cache(async (): Promise<IContactInfo | null> => {
  const supabase = await createClient();
  try {
    // Fetch all contact entries
    const { data, error } = await supabase
      .from('contacts')
      .select('*');

    if (error) {
      console.error('Error fetching contact info:', error);
      return null;
    }

    if (!data || data.length === 0) {
      return null;
    }

    // Aggregate contacts into a single IContactInfo object
    const contactInfo: IContactInfo = {
      id: data[0].id,
      email: '',
      phone: undefined,
      address: undefined,
      resume_url: undefined
    };

    data.forEach(contact => {
      const label = contact.label.toLowerCase();
      if (label === 'email') {
        contactInfo.email = contact.value;
      } else if (label === 'phone') {
        contactInfo.phone = contact.value;
      } else if (label === 'location' || label === 'address') {
        contactInfo.address = contact.value;
      } else if (label === 'resume' || label === 'cv') {
        contactInfo.resume_url = contact.href || contact.value;
      }
    });

    return contactInfo;
  } catch (error) {
    console.error('Failed to fetch contact info:', error);
    return null;
  }
});
