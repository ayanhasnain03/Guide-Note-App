import { convertToArticleList, getAllArticles } from 'utils/notion';
import { Layout } from 'layouts/Layout';
import HeroHeader from 'components/HeroHeader';
import Container from 'components/Container';
import { useState, useMemo, useCallback } from 'react';
import { filterArticles } from 'utils/filterArticles';
import Category from 'components/Category';
import ArticleCard from 'components/ArticleCard';
import Pagination from 'components/Pagination';
import debounce from 'lodash.debounce';

export default function Index({ articles, categories }) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6;

  // Debounced Search to limit rerenders
  const handleSearchChange = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, 300);

  // Memoize filtered articles to avoid recalculating on every render
  const filteredArticles = useMemo(() => {
    const tagFilteredArticles = filterArticles(articles, selectedTag);
    return tagFilteredArticles.filter(article =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [articles, selectedTag, searchTerm]);

  const paginatedArticles = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredArticles.slice(start, start + itemsPerPage);
  }, [filteredArticles, currentPage]);

  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);

  // Reset page to 1 when search or tag changes
  const handleTagChange = useCallback(tag => {
    setSelectedTag(tag);
    setCurrentPage(1);
  }, []);

  return (
    <Layout>
      <HeroHeader />
      <Container>
        <div className="flex flex-col items-center mt-8">
          <input
            type="text"
            placeholder="Search articles..."
            className="w-full max-w-md px-4 py-2 border rounded-lg mb-6"
            onChange={handleSearchChange}
          />
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            {categories.map(tag => (
              <Category
                tag={tag}
                key={tag}
                selectedTag={selectedTag}
                setSelectedTag={handleTagChange}
              />
            ))}
          </div>
          <div className="my-8 text-3xl font-bold text-gray-900">
            {selectedTag ? `Showing results for "${selectedTag}"` : 'All Guides'}
          </div>
          <div className="grid gap-10 lg:gap-12 sm:grid-cols-1 md:grid-cols-3">
            {paginatedArticles.length ? (
              paginatedArticles.map(article => (
                <ArticleCard article={article} key={article.id} />
              ))
            ) : (
              <p className="text-gray-600">No articles found.</p>
            )}
          </div>
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalItems={filteredArticles.length}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </Container>
    </Layout>
  );
}

export const getServerSideProps = async () => {
  const data = await getAllArticles(process.env.BLOG_DATABASE_ID);

  // Convert the articles to the desired structure
  const { articles, categories } = convertToArticleList(data);

  return {
    props: {
      articles,
      categories
    }
  };
};
