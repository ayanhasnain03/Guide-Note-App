import { Article } from 'utils/types';
import Image from 'next/image';
import slugify from 'slugify';
import getLocalizedDate from 'utils/getLocalizedDate';
import Link from 'next/link';

type Props = {
  article: Article;
};

export default function ArticleCard({ article }: Props) {
  const slug = slugify(article.title).toLowerCase();
  const formattedTime = getLocalizedDate(article.publishedDate);

  return (
    <Link href={`/blog/${slug}`}>
      <a className="group relative flex flex-col overflow-hidden bg-white rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-500 cursor-pointer">
        {/* Image Section */}
        <div className="relative w-full h-60">
          <Image
            className="object-cover w-full h-full rounded-t-xl group-hover:scale-105 transition-transform duration-500 ease-in-out"
            src={article.thumbnail}
            blurDataURL={article.thumbnail}
            objectFit="cover"
            placeholder="blur"
            layout="fill"
            alt="article cover"
          />
          {/* Overlay with Category Tags */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
            {article?.categories?.map(category => (
              <span
                key={category}
                className="inline-flex items-center px-4 py-1.5 text-xs font-medium text-white bg-blue-500 rounded-full shadow-md"
              >
                {category}
              </span>
            ))}
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-col p-6">
          {/* Title */}
          <h3 className="text-2xl font-extrabold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
            {article.title}
          </h3>
          {/* Summary */}
          <p className="mt-2 text-base text-gray-700 line-clamp-3">{article.summary}</p>

          {/* Footer with Date and Categories */}
          <div className="mt-auto flex items-center space-x-2 text-sm text-gray-500">
            <time dateTime={formattedTime} className="font-semibold text-gray-600">
              {formattedTime}
            </time>
            <span className="text-gray-400">&middot;</span>
            {article.categories.map(category => (
              <span key={category} className="font-semibold text-gray-600">
                {category}
              </span>
            ))}
          </div>
        </div>
      </a>
    </Link>
  );
}
