import Image from "next/image";
import Link from "next/link";

const ListItem = ({ item }) => {
  const { _id, name, notes, path } = item;

  return (
    <Link href={`/product/${_id}`}>
      <article
        className={`bg-white rounded-2xl shamdow-sm flex flex-col h-full transition-shadow duration-300 hover:shadow-md w-full max-w-lg mx-auto border border-gray-100 cursor-pointer`}
      >
        {/* Image */}
        <div className="px-5 pt-5">
          <div className="relative h-48 w-full overflow-hidden rounded-2xl">
            <Image
              src={path}
              alt={name}
              fill
              className="object-contain hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-grow p-6">
          <h3 className="mt-2 text-lg font-semibold text-gray-900 leading-snug">
            {name}
          </h3>

          <p className="mt-3 text-gray-600 text-sm leading-relaxed line-clamp-3">
            {notes}
          </p>

          <div className="mt-auto pt-6">
            <span className="inline-block bg-brand-red text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-brand-red/90 transition-colors duration-200">
              Read More
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default ListItem;
