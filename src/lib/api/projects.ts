import { cache } from 'react';
import { createClient } from '../supabase/server';
import { IProject } from '../types';

/**
 * Fetch all projects from Supabase with React cache
 * This automatically caches the results during a render pass
 */
export const getProjects = cache(async (): Promise<IProject[]> => {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('published', true)
      .order('date', { ascending: false });

    if (error) {
      console.error('Error fetching projects:', error);
      return [];
    }

    // Map database fields to IProject format
    return (data || []).map(project => ({
      id: project.id,
      title: project.title,
      description: project.description,
      longDescription: project.longdescription,
      longdescription: project.longdescription,
      image: project.main_image || '', // Legacy support
      main_image: project.main_image || '',
      additional_images: project.images || [],
      technologies: project.technologies,
      github: project.github || '',
      live: project.live || '',
      date: project.date || '',
      category: project.category || '',
      user_id: project.user_id
    })) as IProject[];
  } catch (error) {
    console.error('Failed to fetch projects:', error);
    return [];
  }
});

/**
 * Fetch a single project by ID with React cache
 */
export const getProjectById = cache(async (id: string): Promise<IProject | null> => {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .eq('published', true)
      .single();

    if (error) {
      console.error('Error fetching project:', error);
      return null;
    }

    // Map database fields to IProject format
    return {
      id: data.id,
      title: data.title,
      description: data.description,
      longDescription: data.longdescription,
      longdescription: data.longdescription,
      image: data.main_image || '',
      main_image: data.main_image || '',
      additional_images: data.images || [],
      technologies: data.technologies,
      github: data.github || '',
      live: data.live || '',
      date: data.date || '',
      category: data.category || '',
      user_id: data.user_id
    } as IProject;
  } catch (error) {
    console.error('Failed to fetch project:', error);
    return null;
  }
});

/**
 * Get unique project categories with React cache
 */
export const getProjectCategories = cache(async (): Promise<string[]> => {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('category')
      .eq('published', true)
      .order('category');

    if (error) {
      console.error('Error fetching categories:', error);
      return [];
    }

    // Get unique categories
    const categories = [...new Set(data.map(item => item.category).filter(Boolean))];
    return categories;
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    return [];
  }
});
