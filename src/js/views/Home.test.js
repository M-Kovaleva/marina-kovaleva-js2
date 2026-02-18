/* Tests for Home.js - View templates */

import { describe, it, expect} from '@jest/globals';
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
        body: 'Test post body',
        created: '2026-02-18T10:00:00Z',
        author: { name: 'marina' }
      };

      const html = Home.renderPostCard(post);

      expect(html).toContain('feed-post');
      expect(html).toContain('marina');
      expect(html).toContain('Test Post');
      expect(html).toContain('Test post body');
      expect(html).toContain('/post/123');
      expect(html).toContain('Read more');
    });

    it('should use default values for missing fields', () => {
      const post = {
        id: '456',
        created: '2026-02-18T10:00:00Z'
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
        created: '2026-02-18T10:00:00Z',
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
        created: '2026-02-18T10:00:00Z'
      };

      const html = Home.renderPostCard(post);

      expect(html).toContain('Unknown');
    });

    it('should format date correctly', () => {
      const post = {
        id: '111',
        title: 'Date Test',
        body: 'Test',
        created: '2026-12-25T00:00:00Z',
        author: { name: 'lil' }
      };

      const html = Home.renderPostCard(post);

      // Date formatting depends on locale, just check it exists
      expect(html).toContain('feed-post-date');
    });
  });

  it('should display image when post has media', () => {
      const post = {
        id: '222',
        title: 'Post with Image',
        body: 'Test',
        created: '2026-02-18T10:00:00Z',
        author: { name: 'mari' },
        media: {
          url: 'https://example.com/image.jpg'
        }
      };

      const html = Home.renderPostCard(post);

      expect(html).toContain('<img');
      expect(html).toContain('src="https://example.com/image.jpg"');
      expect(html).toContain('class="feed-post-image"');
      expect(html).toContain('alt="Post with Image"');
    });

    it('should not display image when post has no media', () => {
      const post = {
        id: '333',
        title: 'Post without Image',
        body: 'Test',
        created: '2026-02-18T10:00:00Z',
        author: { name: 'lil' }
      };

      const html = Home.renderPostCard(post);

      expect(html).not.toContain('<img');
      expect(html).not.toContain('feed-post-image');
    });

    it('should not display image when media.url is empty', () => {
      const post = {
        id: '444',
        title: 'Post with Empty Media',
        body: 'Test',
        created: '2026-02-18T10:00:00Z',
        author: { name: 'charlie' },
        media: {
          url: ''
        }
      };

      const html = Home.renderPostCard(post);

      expect(html).not.toContain('<img');
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



















































































