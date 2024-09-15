import { convertToArticleList, getAllArticles, notion } from 'utils/notion';
import { Layout } from 'layouts/Layout';
import HeroHeader from 'components/HeroHeader';
import Container from 'components/Container';
import { useState } from 'react';
import { filterArticles } from 'utils/filterArticles';
import Category from 'components/Category';
import ArticleCard from 'components/ArticleCard';
import Pagination from 'components/Pagination';

export default function Index(props) {
  const { articles, categories } = props;

  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6;

  // Filter by tag first, then filter by search term
  const tagFilteredArticles = filterArticles(articles, selectedTag);
  const filteredArticles = tagFilteredArticles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate total pages and current page articles
  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Layout>
      <HeroHeader />
      <Container>
        <div className="flex flex-col items-center mt-8">
          <input
            type="text"
            placeholder="Search articles..."
            className="w-full max-w-md px-4 py-2 border rounded-lg mb-6"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            {categories.map(tag => (
              <Category
                tag={tag}
                key={tag}
                selectedTag={selectedTag}
                setSelectedTag={setSelectedTag}
              />
            ))}
          </div>
          <div className="my-8 text-3xl font-bold text-gray-900">
            {selectedTag ? `Showing results for "${selectedTag}"` : 'All Guides'}
          </div>
          <div className="grid gap-10 lg:gap-12 sm:grid-cols-1 md:grid-cols-2">
            {paginatedArticles.length ? (
              paginatedArticles.map(article => (
                <ArticleCard article={article} key={article.id} />
              ))
            ) : (
              <p className="text-gray-600">No articles found.</p>
            )}
          </div>
          {/* Conditional Rendering of Pagination */}
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

const fetchPageBlocks = async (pageId: string) => {
  return notion.blocks.children.list({ block_id: pageId }).then(res => res.results);
};

export const getStaticProps = async () => {
  const data = await getAllArticles(process.env.BLOG_DATABASE_ID);

  const blocks = await fetchPageBlocks(data[0].id);

  const { articles, categories } = convertToArticleList(data);

  return {
    props: {
      data,
      blocks,
      articles,
      categories
    },
    revalidate: 60 * 60
  };
};
