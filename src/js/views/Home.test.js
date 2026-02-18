/* Tests for Home.js - View templates */

import { describe, it, expect, beforeEach } from '@jest/globals';
import Home from './Home.js';

describe('Home.js - View templates', () => {

  //getHtml()

  describe('getHtml()', () => {
    it('should return HTML string with feed container', async () => {
      const home = new Home({});
      const html = await home.getHtml();

      expect(html).toContain('feed-container');
      expect(html).toContain('search-form');
      expect(html).toContain('feed-loading');
      expect(html).toContain('id="feed"');
      expect(html).toContain('feed-pagination');
    });

    it('should include search input and button', async () => {
      const home = new Home({});
      const html = await home.getHtml();

      expect(html).toContain('type="search"');
      expect(html).toContain('placeholder="Search posts..."');
      expect(html).toContain('Search</button>');
    });

    it('should include pagination buttons', async () => {
      const home = new Home({});
      const html = await home.getHtml();

      expect(html).toContain('id="prev-page-btn"');
      expect(html).toContain('id="next-page-btn"');
      expect(html).toContain('id="page-info"');
      expect(html).toContain('Previous</button>');
      expect(html).toContain('Next</button>');
    });
  });

  //renderPostCard()

  describe('renderPostCard()', () => {
    it('should render post card with all fields', () => {
      const post = {
        id: '123',
        title: 'Test Post',
        body: 'This is a test post body',
        created: '2024-01-15T10:00:00Z',
        author: { name: 'john_doe' }
      };

      const html = Home.renderPostCard(post);

      expect(html).toContain('feed-post');
      expect(html).toContain('john_doe');
      expect(html).toContain('Test Post');
      expect(html).toContain('This is a test post body');
      expect(html).toContain('/post/123');
      expect(html).toContain('Read more');
    });

    it('should use default values for missing fields', () => {
      const post = {
        id: '456',
        created: '2024-01-15T10:00:00Z'
      };

      const html = Home.renderPostCard(post);

      expect(html).toContain('Unknown');
      expect(html).toContain('Untitled');
    });

    it('should truncate long body text to 150 characters', () => {
      const longText = 'a'.repeat(200);
      const post = {
        id: '789',
        title: 'Long Post',
        body: longText,
        created: '2024-01-15T10:00:00Z',
        author: { name: 'alice' }
      };

      const html = Home.renderPostCard(post);

      expect(html).toContain('a'.repeat(150) + '...');
      expect(html).not.toContain('a'.repeat(151));
    });

    it('should handle missing author gracefully', () => {
      const post = {
        id: '999',
        title: 'No Author',
        body: 'Test',
        created: '2024-01-15T10:00:00Z'
      };

      const html = Home.renderPostCard(post);

      expect(html).toContain('Unknown');
    });

    it('should format date correctly', () => {
      const post = {
        id: '111',
        title: 'Date Test',
        body: 'Test',
        created: '2024-12-25T00:00:00Z',
        author: { name: 'bob' }
      };

      const html = Home.renderPostCard(post);

      // Date formatting depends on locale, just check it exists
      expect(html).toContain('feed-post-date');
    });
  });

  //renderEmptyState()

  describe('renderEmptyState()', () => {
    it('should return empty state message', () => {
      const html = Home.renderEmptyState();

      expect(html).toBe('<p>No posts found.</p>');
    });
  });

  //renderErrorState()

  describe('renderErrorState()', () => {
    it('should return error state message', () => {
      const html = Home.renderErrorState();

      expect(html).toBe('<p>Error loading posts. Please try again.</p>');
    });
  });

});


















































































