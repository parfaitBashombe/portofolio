import { cache } from 'react';
import { createClient } from '../supabase/server';
import { IPost } from '../types';

export const getPosts = cache(async (): Promise<IPost[]> => {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('published', true)
      .order('date', { ascending: false });

    if (error) {
      console.error('Error fetching posts:', error);
      return [];
    }

    // Map database fields to IPost format
    return (data || []).map(post => ({
      id: post.id,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      date: post.date,
      readTime: post.read_time,
      category: post.category,
      slug: post.slug,
      tags: post.tags || []
    })) as IPost[];
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    return [];
  }
});

export const getPostBySlug = cache(async (slug: string): Promise<IPost | null> => {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single();

    if (error) {
      console.error('Error fetching post:', error);
      return null;
    }

    // Map database fields to IPost format
    return {
      id: data.id,
      title: data.title,
      excerpt: data.excerpt,
      content: data.content,
      date: data.date,
      readTime: data.read_time,
      category: data.category,
      slug: data.slug,
      tags: data.tags || []
    } as IPost;
  } catch (error) {
    console.error('Failed to fetch post:', error);
    return null;
  }
});

export const getRecentPosts = cache(async (limit: number = 3): Promise<IPost[]> => {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('published', true)
      .order('date', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching recent posts:', error);
      return [];
    }

    // Map database fields to IPost format
    return (data || []).map(post => ({
      id: post.id,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      date: post.date,
      readTime: post.read_time,
      category: post.category,
      slug: post.slug,
      tags: post.tags || []
    })) as IPost[];
  } catch (error) {
    console.error('Failed to fetch recent posts:', error);
    return [];
  }
});
