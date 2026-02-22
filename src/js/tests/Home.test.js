/* Tests for Home.js - View template */
import { describe, it, expect, beforeEach } from "@jest/globals";
import Home from "../views/Home.js";

describe("Home.js - Feed View", () => {
  let home;

  beforeEach(() => {
    home = new Home({});
  });

  describe("constructor()", () => {
    beforeEach(() => {
      // Clear document title before each test
      document.title = "";
    });

    it("should set correct page title", () => {
      new Home({});
      expect(document.title).toBe("Feed - Social media application");
    });

    it("should accept params object", () => {
      const homeWithParams = new Home({ testParam: "value" });
      expect(homeWithParams).toBeDefined();
    });

    it("should work with empty params", () => {
      new Home({});
      expect(document.title).toBe("Feed - Social media application");
    });
  });
  // getHtml() Tests

  describe("getHtml()", () => {
    it("should return HTML string", async () => {
      const html = await home.getHtml();

      expect(typeof html).toBe("string");
      expect(html.length).toBeGreaterThan(0);
    });

    it("should contain main feed container", async () => {
      const html = await home.getHtml();

      expect(html).toContain('<section class="feed-container">');
      expect(html).toContain("</section>");
    });

    // Search Form Tests

    it("should include search form with correct ID", async () => {
      const html = await home.getHtml();

      expect(html).toContain('id="search-form"');
      expect(html).toContain('class="feed-search-form"');
    });

    it("should include search input with correct attributes", async () => {
      const html = await home.getHtml();

      expect(html).toContain('type="search"');
      expect(html).toContain('name="search"');
      expect(html).toContain('placeholder="Search posts..."');
      expect(html).toContain('class="input-field"');
    });

    it("should include search submit button", async () => {
      const html = await home.getHtml();

      expect(html).toContain('<button type="submit"');
      expect(html).toContain('class="btn-accent"');
      expect(html).toContain("Search</button>");
    });

    // Search Info Tests

    it("should include search info container", async () => {
      const html = await home.getHtml();

      expect(html).toContain('id="search-info"');
      expect(html).toContain('class="search-info"');
    });

    it("should hide search info by default", async () => {
      const html = await home.getHtml();

      expect(html).toContain('id="search-info"');
      expect(html).toContain('style="display: none;"');
    });

    // Loading Spinner Tests

    it("should include loading spinner container", async () => {
      const html = await home.getHtml();

      expect(html).toContain('id="feed-loading"');
      expect(html).toContain('class="loading-spinner"');
    });

    it("should hide loading spinner by default", async () => {
      const html = await home.getHtml();

      expect(html).toContain('id="feed-loading"');
      expect(html).toContain('style="display: none;"');
    });

    it("should include spinner element inside loading container", async () => {
      const html = await home.getHtml();

      expect(html).toContain('<div class="spinner"></div>');
      expect(html).toContain("<p>Loading posts...</p>");
    });

    // Feed Section Tests

    it("should include feed section with correct ID", async () => {
      const html = await home.getHtml();

      expect(html).toContain('id="feed"');
      expect(html).toContain('class="feed-section"');
    });

    it("should have empty feed section by default", async () => {
      const html = await home.getHtml();

      // Feed section should be self-closing or empty
      expect(html).toContain(
        '<section id="feed" class="feed-section"></section>',
      );
    });

    // Pagination Tests

    it("should include pagination container", async () => {
      const html = await home.getHtml();

      expect(html).toContain('<div class="feed-pagination">');
    });

    it("should include previous page button", async () => {
      const html = await home.getHtml();

      expect(html).toContain('id="prev-page-btn"');
      expect(html).toContain('class="btn-secondary"');
      expect(html).toContain("Previous</button>");
    });

    it("should include next page button", async () => {
      const html = await home.getHtml();

      expect(html).toContain('id="next-page-btn"');
      expect(html).toContain('class="btn-secondary"');
      expect(html).toContain("Next</button>");
    });

    it("should include page info display", async () => {
      const html = await home.getHtml();

      expect(html).toContain('id="page-info"');
      expect(html).toContain('class="feed-page-info"');
      expect(html).toContain("Page 1");
    });

    it("should have pagination buttons with correct order", async () => {
      const html = await home.getHtml();

      const prevIndex = html.indexOf('id="prev-page-btn"');
      const pageInfoIndex = html.indexOf('id="page-info"');
      const nextIndex = html.indexOf('id="next-page-btn"');

      expect(prevIndex).toBeLessThan(pageInfoIndex);
      expect(pageInfoIndex).toBeLessThan(nextIndex);
    });

    // Structure Tests

    it("should have correct HTML structure order", async () => {
      const html = await home.getHtml();

      const searchIndex = html.indexOf('id="search-form"');
      const searchInfoIndex = html.indexOf('id="search-info"');
      const loadingIndex = html.indexOf('id="feed-loading"');
      const feedIndex = html.indexOf('id="feed"');
      const paginationIndex = html.indexOf('class="feed-pagination"');

      expect(searchIndex).toBeLessThan(searchInfoIndex);
      expect(searchInfoIndex).toBeLessThan(loadingIndex);
      expect(loadingIndex).toBeLessThan(feedIndex);
      expect(feedIndex).toBeLessThan(paginationIndex);
    });

    it("should not contain any script tags", async () => {
      const html = await home.getHtml();

      expect(html).not.toContain("<script");
      expect(html).not.toContain("</script>");
    });

    it("should be valid HTML (no unclosed tags)", async () => {
      const html = await home.getHtml();

      // Count opening and closing section tags
      const openingSections = (html.match(/<section/g) || []).length;
      const closingSections = (html.match(/<\/section>/g) || []).length;

      expect(openingSections).toBe(closingSections);

      // Count div tags
      const openingDivs = (html.match(/<div/g) || []).length;
      const closingDivs = (html.match(/<\/div>/g) || []).length;

      expect(openingDivs).toBe(closingDivs);
    });

    // Accessibility Tests

    it("should have semantic HTML elements", async () => {
      const html = await home.getHtml();

      expect(html).toContain("<section");
      expect(html).toContain("<form");
      expect(html).toContain("<button");
      expect(html).toContain("<input");
    });

    it("should have button types specified", async () => {
      const html = await home.getHtml();

      // Search button should have type="submit"
      expect(html).toContain('type="submit"');
    });

    it("should have input placeholder for accessibility", async () => {
      const html = await home.getHtml();

      expect(html).toContain('placeholder="Search posts..."');
    });

    // Content Tests

    it("should contain all expected text content", async () => {
      const html = await home.getHtml();

      expect(html).toContain("Search");
      expect(html).toContain("Search posts...");
      expect(html).toContain("Loading posts...");
      expect(html).toContain("Previous");
      expect(html).toContain("Next");
      expect(html).toContain("Page 1");
    });

    // Edge Cases

    it("should return same HTML on multiple calls", async () => {
      const html1 = await home.getHtml();
      const html2 = await home.getHtml();

      expect(html1).toBe(html2);
    });

    it("should handle async properly", async () => {
      const htmlPromise = home.getHtml();

      expect(htmlPromise).toBeInstanceOf(Promise);

      const html = await htmlPromise;
      expect(typeof html).toBe("string");
    });
  });

  // ============ Integration with AbstractView ============

  describe("AbstractView integration", () => {
    it("should inherit from AbstractView", () => {
      expect(home.constructor.name).toBe("Home");
      expect(home.getHtml).toBeDefined();
      expect(home.setTitle).toBeDefined();
    });

    it("should have params property from AbstractView", () => {
      const homeWithParams = new Home({ id: "123" });
      expect(homeWithParams.params).toBeDefined();
      expect(homeWithParams.params.id).toBe("123");
    });
  });
});
